'use client';

import { useState, useCallback, useMemo } from 'react';
import { FIELDS, STEPS, type FieldDef } from '@/lib/quote/config';
import {
  evaluateRules,
  isFieldVisible,
  isFieldRequired,
  isStepVisible,
  validateStep,
  type FormData
} from '@/lib/quote/engine';

function ProgressBar({
  steps,
  currentIndex
}: {
  steps: { id: string; title: string }[];
  currentIndex: number;
}) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center gap-1">
        {steps.map((step, i) => {
          const state =
            i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'pending';
          return (
            <li key={step.id} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-center">
                <div
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    state === 'done'
                      ? 'bg-brand-500'
                      : state === 'active'
                        ? 'bg-brand-500'
                        : 'bg-surface-200'
                  }`}
                />
              </div>
              <span
                className={`mt-2 text-[10px] font-medium text-center leading-tight hidden sm:block transition-colors ${
                  state === 'active'
                    ? 'text-brand-600'
                    : state === 'done'
                      ? 'text-surface-500'
                      : 'text-surface-300'
                }`}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-surface-400 text-center sm:hidden">
        Step {currentIndex + 1} of {steps.length} &mdash;{' '}
        <span className="font-medium text-brand-600">
          {steps[currentIndex]?.title}
        </span>
      </p>
    </nav>
  );
}

function FormField({
  def,
  value,
  error,
  required,
  onChange
}: {
  def: FieldDef;
  value: string | boolean | number | undefined;
  error?: string;
  required: boolean;
  onChange: (id: string, val: string | boolean) => void;
}) {
  const baseInput =
    'w-full px-4 py-2.5 text-sm bg-white border rounded-lg border-surface-300 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 transition';
  const errorInput = error ? 'border-red-400 focus:border-red-500 focus:ring-red-400/20' : '';

  if (def.type === 'checkbox') {
    return (
      <label className="flex items-start gap-3 py-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(def.id, e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-400/40"
        />
        <span className="text-sm text-surface-700 group-hover:text-surface-900 transition">
          {def.label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </span>
      </label>
    );
  }

  const label = (
    <label
      htmlFor={def.id}
      className="block mb-1.5 text-sm font-medium text-surface-700"
    >
      {def.label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );

  if (def.type === 'select') {
    return (
      <div>
        {label}
        <select
          id={def.id}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(def.id, e.target.value)}
          className={`${baseInput} ${errorInput}`}
        >
          <option value="">Select…</option>
          {def.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  if (def.type === 'textarea') {
    return (
      <div>
        {label}
        <textarea
          id={def.id}
          value={(value as string) ?? ''}
          placeholder={def.placeholder}
          onChange={(e) => onChange(def.id, e.target.value)}
          rows={3}
          className={`${baseInput} ${errorInput} resize-y`}
        />
        {def.helperText && (
          <p className="mt-1 text-xs text-surface-400">{def.helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  if (def.type === 'file') {
    return (
      <div>
        {label}
        <div className="relative">
          <input
            type="file"
            id={def.id}
            accept={def.accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(def.id, file?.name ?? '');
            }}
            className="block w-full text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition"
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  const inputType =
    def.type === 'number' ? 'number' : def.type === 'date' ? 'date' : def.type === 'email' ? 'email' : def.type === 'tel' ? 'tel' : 'text';

  return (
    <div>
      {label}
      <div className="relative">
        <input
          type={inputType}
          id={def.id}
          value={(value as string) ?? ''}
          placeholder={def.placeholder}
          onChange={(e) => onChange(def.id, e.target.value)}
          className={`${baseInput} ${errorInput} ${def.suffix ? 'pr-12' : ''}`}
        />
        {def.suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-surface-400 pointer-events-none">
            {def.suffix}
          </span>
        )}
      </div>
      {def.helperText && (
        <p className="mt-1 text-xs text-surface-400">{def.helperText}</p>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ReviewStep({ data }: { data: FormData }) {
  const evalResult = evaluateRules(data);
  const visibleSteps = STEPS.filter(
    (s) => s.id !== 'review_submit' && isStepVisible(s, data, evalResult)
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-surface-500">
        Please review your details before submitting. You can go back to any
        step to make changes.
      </p>
      {visibleSteps.map((step) => {
        const visibleFields = step.fields.filter((fId) =>
          isFieldVisible(fId, evalResult)
        );
        if (visibleFields.length === 0) return null;

        return (
          <div
            key={step.id}
            className="p-4 bg-surface-50 border border-surface-200 rounded-lg"
          >
            <h4 className="text-sm font-semibold text-surface-700 mb-3">
              {step.title}
            </h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {visibleFields.map((fId) => {
                const def = FIELDS[fId];
                if (!def) return null;
                const val = data[fId];
                if (val === undefined || val === '' || val === null || val === false) return null;

                let displayVal: string;
                if (typeof val === 'boolean') {
                  displayVal = val ? 'Yes' : 'No';
                } else if (def.options) {
                  displayVal =
                    def.options.find((o) => o.value === String(val))?.label ??
                    String(val);
                } else {
                  displayVal = String(val);
                  if (def.suffix) displayVal += ` ${def.suffix}`;
                }

                return (
                  <div key={fId} className="flex flex-col py-1">
                    <dt className="text-xs text-surface-400">{def.label}</dt>
                    <dd className="text-sm text-surface-800">{displayVal}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

export default function QuoteWizard() {
  const [data, setData] = useState<FormData>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const evalResult = useMemo(() => evaluateRules(data), [data]);

  const visibleSteps = useMemo(
    () => STEPS.filter((s) => isStepVisible(s, data, evalResult)),
    [data, evalResult]
  );

  const currentStep = visibleSteps[stepIndex] ?? visibleSteps[0];
  const isReview = currentStep?.id === 'review_submit';
  const isLastBeforeReview = stepIndex === visibleSteps.length - 2;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === visibleSteps.length - 1;

  const handleChange = useCallback((id: string, val: string | boolean) => {
    setData((prev) => ({ ...prev, [id]: val }));
    setErrors((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return prev;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (!currentStep) return;

    if (!isReview) {
      const stepErrors = validateStep(currentStep, data, evalResult);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }

    setErrors({});
    setStepIndex((i) => Math.min(i + 1, visibleSteps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, data, evalResult, isReview, visibleSteps.length]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setErrors({ _form: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }, [data]);

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-surface-900">
          Quote Request Submitted
        </h2>
        <p className="mt-3 text-surface-500">
          Thank you! We&apos;ve received your freight quote request. Matching
          forwarders will be in touch within 24–48 hours.
        </p>
        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition"
        >
          Back to Home
        </a>
      </div>
    );
  }

  const visibleFields = currentStep
    ? currentStep.fields.filter((fId) => isFieldVisible(fId, evalResult))
    : [];

  const checkboxFields = visibleFields.filter(
    (fId) => FIELDS[fId]?.type === 'checkbox'
  );
  const regularFields = visibleFields.filter(
    (fId) => FIELDS[fId]?.type !== 'checkbox'
  );

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar steps={visibleSteps} currentIndex={stepIndex} />

      <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-surface-900">
            {currentStep?.title}
          </h2>
          {currentStep?.description && (
            <p className="mt-1 text-sm text-surface-500">
              {currentStep.description}
            </p>
          )}
        </div>

        {isReview ? (
          <ReviewStep data={data} />
        ) : (
          <div className="space-y-5">
            {regularFields.map((fId) => {
              const def = FIELDS[fId];
              if (!def) return null;
              return (
                <FormField
                  key={fId}
                  def={def}
                  value={data[fId]}
                  error={errors[fId]}
                  required={isFieldRequired(fId, evalResult)}
                  onChange={handleChange}
                />
              );
            })}

            {checkboxFields.length > 0 && (
              <div className="pt-2 border-t border-surface-100">
                {checkboxFields.map((fId) => {
                  const def = FIELDS[fId];
                  if (!def) return null;
                  return (
                    <FormField
                      key={fId}
                      def={def}
                      value={data[fId]}
                      error={errors[fId]}
                      required={isFieldRequired(fId, evalResult)}
                      onChange={handleChange}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {errors._form && (
          <p className="mt-4 text-sm text-red-500 text-center">{errors._form}</p>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-100">
          {!isFirst ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium text-surface-600 hover:text-surface-800 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition shadow-sm"
            >
              {submitting ? 'Submitting…' : 'Submit Quote Request'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition shadow-sm"
            >
              {isLastBeforeReview ? 'Review' : 'Continue'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
