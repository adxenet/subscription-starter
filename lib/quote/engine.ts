import { Rule, RULES, FIELDS, STEPS, StepDef } from './config';

export type FormData = Record<string, string | boolean | number | undefined>;

interface EvalResult {
  visibleFields: Set<string>;
  hiddenFields: Set<string>;
  requiredFields: Set<string>;
  visibleSteps: Set<string>;
}

function evalCondition(
  cond: { field?: string; equals?: string | boolean; in?: string[]; notEmpty?: boolean; notEqualsField?: string },
  data: FormData
): boolean {
  if (!cond.field) return false;
  const val = data[cond.field];

  if (cond.equals !== undefined) {
    if (typeof cond.equals === 'boolean') {
      return val === cond.equals || val === String(cond.equals);
    }
    return val === cond.equals;
  }

  if (cond.in) {
    return cond.in.includes(val as string);
  }

  if (cond.notEmpty) {
    return val !== undefined && val !== '' && val !== null;
  }

  if (cond.notEqualsField) {
    const otherVal = data[cond.notEqualsField];
    return val !== otherVal && val !== undefined && val !== '' && otherVal !== undefined && otherVal !== '';
  }

  return false;
}

function evalRule(rule: Rule, data: FormData): boolean {
  const w = rule.when;

  if (w.all) {
    return w.all.every((c) => evalCondition(c, data));
  }
  if (w.any) {
    return w.any.some((c) => evalCondition(c, data));
  }
  if (w.field) {
    return evalCondition(w as { field: string; equals?: string | boolean; in?: string[] }, data);
  }
  return false;
}

export function evaluateRules(data: FormData): EvalResult {
  const visibleFields = new Set<string>();
  const hiddenFields = new Set<string>();
  const requiredFields = new Set<string>();
  const visibleSteps = new Set<string>();

  for (const rule of RULES) {
    if (evalRule(rule, data)) {
      rule.effects.show?.forEach((f) => visibleFields.add(f));
      rule.effects.hide?.forEach((f) => hiddenFields.add(f));
      rule.effects.require?.forEach((f) => requiredFields.add(f));
      rule.effects.showStep?.forEach((s) => visibleSteps.add(s));
    }
  }

  return { visibleFields, hiddenFields, requiredFields, visibleSteps };
}

const ALWAYS_VISIBLE_FIELDS = new Set([
  'shipping_mode', 'service_type', 'incoterm', 'shipment_ready_date', 'shipping_window',
  'cargo_type', 'stackable', 'forklift_accessible',
  'service_export_customs', 'service_import_customs', 'service_insurance',
  'service_warehousing', 'service_consolidation', 'service_palletization',
  'service_pickup', 'service_last_mile_delivery', 'service_duties_taxes_estimation',
  'frequency_type',
  'full_name', 'company_name', 'business_type', 'email', 'phone', 'preferred_contact_method',
  'packing_list_upload', 'commercial_invoice_upload', 'product_photos_upload', 'other_supporting_docs_upload'
]);

const ALWAYS_HIDDEN_STEPS = new Set<string>();

export function isFieldVisible(fieldId: string, eval_: EvalResult): boolean {
  if (ALWAYS_VISIBLE_FIELDS.has(fieldId)) return true;
  if (eval_.hiddenFields.has(fieldId)) return false;
  if (eval_.visibleFields.has(fieldId)) return true;
  return false;
}

export function isFieldRequired(fieldId: string, eval_: EvalResult): boolean {
  const def = FIELDS[fieldId];
  if (!def) return false;
  if (def.required) return true;
  return eval_.requiredFields.has(fieldId);
}

export function isStepVisible(step: StepDef, data: FormData, eval_: EvalResult): boolean {
  if (ALWAYS_HIDDEN_STEPS.has(step.id)) return false;

  if (step.id === 'customs_compliance') {
    const origin = data.origin_country as string | undefined;
    const dest = data.destination_country as string | undefined;
    const crossBorder = origin && dest && origin !== dest;
    const ddp = data.incoterm === 'ddp';
    const ruleShows = eval_.visibleSteps.has('customs_compliance');
    return !!(crossBorder || ddp || ruleShows);
  }

  if (step.fields.length === 0) return true;

  return step.fields.some((fId) => isFieldVisible(fId, eval_));
}

export function getVisibleSteps(data: FormData): StepDef[] {
  const eval_ = evaluateRules(data);
  return STEPS.filter((step) => isStepVisible(step, data, eval_));
}

export function validateStep(
  step: StepDef,
  data: FormData,
  eval_: EvalResult
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const fieldId of step.fields) {
    if (!isFieldVisible(fieldId, eval_)) continue;
    if (!isFieldRequired(fieldId, eval_)) continue;

    const val = data[fieldId];
    if (val === undefined || val === '' || val === null) {
      const def = FIELDS[fieldId];
      errors[fieldId] = `${def?.label ?? fieldId} is required`;
    }
  }

  return errors;
}
