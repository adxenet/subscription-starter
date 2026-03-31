import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BOOLEAN_FIELDS = new Set([
  'stackable',
  'forklift_accessible',
  'security_handling_required',
  'lifting_points_available',
  'crane_required',
  'shipper_loads_container',
  'customs_clearance_required',
  'importer_of_record_known',
  'include_duties_taxes',
  'service_export_customs',
  'service_import_customs',
  'service_insurance',
  'service_warehousing',
  'service_consolidation',
  'service_palletization',
  'service_pickup',
  'service_last_mile_delivery',
  'service_duties_taxes_estimation',
  'loading_dock_available',
  'forklift_available',
  'tail_lift_needed',
  'appointment_required',
  'multiple_suppliers',
  'long_term_partner'
]);

const NUMBER_FIELDS = new Set([
  'package_count',
  'total_weight_kg',
  'cargo_value',
  'temperature_min_c',
  'temperature_max_c',
  'container_count',
  'estimated_cargo_weight_kg',
  'commercial_invoice_value',
  'insured_value',
  'storage_duration_days',
  'pickup_points',
  'shipments_per_month',
  'shipments_per_quarter'
]);

const ALLOWED_FIELDS = new Set([
  'shipping_mode', 'service_type', 'incoterm', 'shipment_ready_date', 'shipping_window',
  'origin_company', 'origin_address', 'origin_city', 'origin_postal_code', 'origin_country', 'origin_port_airport',
  'destination_company', 'destination_address', 'destination_city', 'destination_postal_code', 'destination_country', 'destination_port_airport',
  'packaging_type', 'package_count', 'dimensions_mode', 'package_lines', 'total_weight_kg', 'commodity_description',
  'cargo_value', 'cargo_value_currency', 'cargo_type', 'stackable', 'forklift_accessible',
  'temperature_min_c', 'temperature_max_c', 'un_number', 'dg_class', 'packing_group',
  'security_handling_required', 'lifting_points_available', 'crane_required',
  'shipment_format', 'container_type', 'container_count', 'estimated_cargo_weight_kg', 'shipper_loads_container',
  'hs_code', 'country_of_origin_goods', 'commercial_invoice_value', 'commercial_invoice_currency',
  'customs_clearance_required', 'importer_of_record_known', 'include_duties_taxes',
  'service_export_customs', 'service_import_customs', 'service_insurance', 'service_warehousing',
  'service_consolidation', 'service_palletization', 'service_pickup', 'service_last_mile_delivery',
  'service_duties_taxes_estimation', 'insured_value', 'insured_value_currency', 'storage_duration_days',
  'loading_dock_available', 'forklift_available', 'tail_lift_needed', 'appointment_required',
  'multiple_suppliers', 'pickup_points',
  'frequency_type', 'shipment_frequency', 'shipments_per_month', 'average_shipment_profile',
  'annual_volume_band', 'long_term_partner', 'peak_months', 'peak_volume', 'shipments_per_quarter',
  'full_name', 'company_name', 'business_type', 'email', 'phone', 'preferred_contact_method', 'whatsapp_number'
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.full_name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const row: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(body)) {
      if (!ALLOWED_FIELDS.has(key)) continue;
      if (val === undefined || val === '' || val === null) continue;

      if (BOOLEAN_FIELDS.has(key)) {
        row[key] = val === true || val === 'true';
      } else if (NUMBER_FIELDS.has(key)) {
        const n = Number(val);
        if (!isNaN(n)) row[key] = n;
      } else {
        row[key] = String(val).slice(0, 2000);
      }
    }

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();
    if (ip) row.ip_address = ip;
    row.user_agent = request.headers.get('user-agent')?.slice(0, 500) ?? null;

    const { error } = await supabaseAdmin
      .from('quote_requests')
      .insert(row);

    if (error) {
      console.error('Quote insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save quote request' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Quote API error:', err);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
