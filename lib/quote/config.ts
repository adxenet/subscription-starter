export type FieldType =
  | 'select'
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'file'
  | 'email'
  | 'tel'
  | 'multi-select';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  required?: boolean;
  suffix?: string;
  accept?: string;
  helperText?: string;
}

export interface StepDef {
  id: string;
  title: string;
  description?: string;
  fields: string[];
}

export interface RuleCondition {
  field?: string;
  equals?: string | boolean;
  in?: string[];
  notEmpty?: boolean;
  notEqualsField?: string;
}

export interface Rule {
  when: {
    field?: string;
    equals?: string | boolean;
    in?: string[];
    all?: RuleCondition[];
    any?: RuleCondition[];
  };
  effects: {
    show?: string[];
    hide?: string[];
    require?: string[];
    showStep?: string[];
  };
}

export const STEPS: StepDef[] = [
  {
    id: 'shipment_basics',
    title: 'Shipment Basics',
    description: 'Tell us about your shipment type and timeline.',
    fields: [
      'shipping_mode',
      'service_type',
      'incoterm',
      'shipment_ready_date',
      'shipping_window'
    ]
  },
  {
    id: 'route',
    title: 'Route',
    description: 'Where is the cargo coming from and going to?',
    fields: [
      'origin_company',
      'origin_address',
      'origin_city',
      'origin_postal_code',
      'origin_country',
      'origin_port_airport',
      'destination_company',
      'destination_address',
      'destination_city',
      'destination_postal_code',
      'destination_country',
      'destination_port_airport'
    ]
  },
  {
    id: 'cargo_details',
    title: 'Cargo Details',
    description: 'Describe what you are shipping.',
    fields: [
      'packaging_type',
      'package_count',
      'dimensions_mode',
      'package_lines',
      'total_weight_kg',
      'commodity_description',
      'cargo_value',
      'cargo_value_currency',
      'cargo_type',
      'stackable',
      'forklift_accessible',
      'temperature_min_c',
      'temperature_max_c',
      'un_number',
      'dg_class',
      'packing_group',
      'msds_upload',
      'security_handling_required',
      'lifting_points_available',
      'crane_required',
      'shipment_format',
      'container_type',
      'container_count',
      'estimated_cargo_weight_kg',
      'shipper_loads_container'
    ]
  },
  {
    id: 'customs_compliance',
    title: 'Customs & Compliance',
    description: 'Import/export documentation and duties.',
    fields: [
      'hs_code',
      'country_of_origin_goods',
      'commercial_invoice_value',
      'commercial_invoice_currency',
      'customs_clearance_required',
      'importer_of_record_known',
      'include_duties_taxes'
    ]
  },
  {
    id: 'additional_services',
    title: 'Additional Services',
    description: 'Select any extra services you need.',
    fields: [
      'service_export_customs',
      'service_import_customs',
      'service_insurance',
      'service_warehousing',
      'service_consolidation',
      'service_palletization',
      'service_pickup',
      'service_last_mile_delivery',
      'service_duties_taxes_estimation',
      'insured_value',
      'insured_value_currency',
      'storage_duration_days',
      'loading_dock_available',
      'forklift_available',
      'tail_lift_needed',
      'appointment_required',
      'multiple_suppliers',
      'pickup_points'
    ]
  },
  {
    id: 'frequency',
    title: 'Frequency',
    description: 'How often do you ship?',
    fields: [
      'frequency_type',
      'shipment_frequency',
      'shipments_per_month',
      'average_shipment_profile',
      'annual_volume_band',
      'long_term_partner',
      'peak_months',
      'peak_volume',
      'shipments_per_quarter'
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'How can forwarders reach you?',
    fields: [
      'full_name',
      'company_name',
      'business_type',
      'email',
      'phone',
      'preferred_contact_method',
      'whatsapp_number'
    ]
  },
  {
    id: 'uploads',
    title: 'Uploads',
    description: 'Attach any supporting documents (optional).',
    fields: [
      'packing_list_upload',
      'commercial_invoice_upload',
      'product_photos_upload',
      'other_supporting_docs_upload'
    ]
  },
  {
    id: 'review_submit',
    title: 'Review & Submit',
    description: 'Review your details before submitting.',
    fields: []
  }
];

export const FIELDS: Record<string, FieldDef> = {
  shipping_mode: {
    id: 'shipping_mode',
    label: 'Shipping Mode',
    type: 'select',
    required: true,
    options: [
      { value: 'sea_fcl', label: 'Sea — Full Container (FCL)' },
      { value: 'sea_lcl', label: 'Sea — Less than Container (LCL)' },
      { value: 'air', label: 'Air Freight' },
      { value: 'rail', label: 'Rail Freight' },
      { value: 'road', label: 'Road / Trucking' }
    ]
  },
  service_type: {
    id: 'service_type',
    label: 'Service Type',
    type: 'select',
    required: true,
    options: [
      { value: 'door_to_door', label: 'Door to Door' },
      { value: 'door_to_port', label: 'Door to Port' },
      { value: 'port_to_port', label: 'Port to Port' },
      { value: 'port_to_door', label: 'Port to Door' }
    ]
  },
  incoterm: {
    id: 'incoterm',
    label: 'Incoterm',
    type: 'select',
    options: [
      { value: 'exw', label: 'EXW — Ex Works' },
      { value: 'fob', label: 'FOB — Free On Board' },
      { value: 'cif', label: 'CIF — Cost, Insurance & Freight' },
      { value: 'cfr', label: 'CFR — Cost & Freight' },
      { value: 'dap', label: 'DAP — Delivered at Place' },
      { value: 'ddp', label: 'DDP — Delivered Duty Paid' },
      { value: 'fca', label: 'FCA — Free Carrier' },
      { value: 'cpt', label: 'CPT — Carriage Paid To' }
    ]
  },
  shipment_ready_date: { id: 'shipment_ready_date', label: 'Shipment Ready Date', type: 'date', required: true },
  shipping_window: {
    id: 'shipping_window',
    label: 'Shipping Window',
    type: 'select',
    options: [
      { value: 'urgent', label: 'Urgent (ASAP)' },
      { value: '1_week', label: 'Within 1 week' },
      { value: '2_weeks', label: 'Within 2 weeks' },
      { value: '1_month', label: 'Within 1 month' },
      { value: 'flexible', label: 'Flexible' }
    ]
  },
  origin_company: { id: 'origin_company', label: 'Origin Company', type: 'text', placeholder: 'Supplier / factory name' },
  origin_address: { id: 'origin_address', label: 'Origin Address', type: 'text', placeholder: 'Street address' },
  origin_city: { id: 'origin_city', label: 'Origin City', type: 'text' },
  origin_postal_code: { id: 'origin_postal_code', label: 'Origin Postal Code', type: 'text' },
  origin_country: { id: 'origin_country', label: 'Origin Country', type: 'text', placeholder: 'e.g. China' },
  origin_port_airport: { id: 'origin_port_airport', label: 'Origin Port / Airport', type: 'text', placeholder: 'e.g. Shanghai, Shenzhen' },
  destination_company: { id: 'destination_company', label: 'Destination Company', type: 'text', placeholder: 'Receiving company' },
  destination_address: { id: 'destination_address', label: 'Destination Address', type: 'text', placeholder: 'Street address' },
  destination_city: { id: 'destination_city', label: 'Destination City', type: 'text' },
  destination_postal_code: { id: 'destination_postal_code', label: 'Destination Postal Code', type: 'text' },
  destination_country: { id: 'destination_country', label: 'Destination Country', type: 'text', placeholder: 'e.g. United States' },
  destination_port_airport: { id: 'destination_port_airport', label: 'Destination Port / Airport', type: 'text', placeholder: 'e.g. Los Angeles, Rotterdam' },
  packaging_type: {
    id: 'packaging_type',
    label: 'Packaging Type',
    type: 'select',
    options: [
      { value: 'pallets', label: 'Pallets' },
      { value: 'cartons', label: 'Cartons / Boxes' },
      { value: 'crates', label: 'Wooden Crates' },
      { value: 'drums', label: 'Drums / Barrels' },
      { value: 'bags', label: 'Bags' },
      { value: 'rolls', label: 'Rolls' },
      { value: 'other', label: 'Other' }
    ]
  },
  package_count: { id: 'package_count', label: 'Number of Packages', type: 'number', placeholder: 'e.g. 10' },
  dimensions_mode: {
    id: 'dimensions_mode',
    label: 'Dimensions Entry',
    type: 'select',
    options: [
      { value: 'per_package', label: 'Per package (L × W × H)' },
      { value: 'total_cbm', label: 'Total volume (CBM)' }
    ]
  },
  package_lines: { id: 'package_lines', label: 'Package Dimensions', type: 'textarea', placeholder: 'e.g. 10 × 120cm × 80cm × 100cm, 25kg each', helperText: 'One line per package type: qty × L × W × H, weight' },
  total_weight_kg: { id: 'total_weight_kg', label: 'Total Weight (kg)', type: 'number', suffix: 'kg' },
  commodity_description: { id: 'commodity_description', label: 'Commodity Description', type: 'textarea', placeholder: 'Describe the goods being shipped', required: true },
  cargo_value: { id: 'cargo_value', label: 'Cargo Value', type: 'number', placeholder: 'e.g. 15000' },
  cargo_value_currency: {
    id: 'cargo_value_currency',
    label: 'Currency',
    type: 'select',
    options: [
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
      { value: 'CNY', label: 'CNY' },
      { value: 'AUD', label: 'AUD' },
      { value: 'CAD', label: 'CAD' }
    ]
  },
  cargo_type: {
    id: 'cargo_type',
    label: 'Cargo Type',
    type: 'select',
    options: [
      { value: 'general', label: 'General Cargo' },
      { value: 'hazardous', label: 'Hazardous / Dangerous Goods' },
      { value: 'perishable', label: 'Perishable / Temperature Controlled' },
      { value: 'high_value', label: 'High Value' },
      { value: 'oversized', label: 'Oversized / Heavy Lift' },
      { value: 'fragile', label: 'Fragile' }
    ]
  },
  stackable: { id: 'stackable', label: 'Stackable', type: 'checkbox' },
  forklift_accessible: { id: 'forklift_accessible', label: 'Forklift accessible at origin', type: 'checkbox' },
  temperature_min_c: { id: 'temperature_min_c', label: 'Min Temperature', type: 'number', suffix: '°C' },
  temperature_max_c: { id: 'temperature_max_c', label: 'Max Temperature', type: 'number', suffix: '°C' },
  un_number: { id: 'un_number', label: 'UN Number', type: 'text', placeholder: 'e.g. UN1234' },
  dg_class: { id: 'dg_class', label: 'DG Class', type: 'text', placeholder: 'e.g. Class 3' },
  packing_group: {
    id: 'packing_group',
    label: 'Packing Group',
    type: 'select',
    options: [
      { value: 'I', label: 'I — Great Danger' },
      { value: 'II', label: 'II — Medium Danger' },
      { value: 'III', label: 'III — Minor Danger' }
    ]
  },
  msds_upload: { id: 'msds_upload', label: 'MSDS Document', type: 'file', accept: '.pdf,.doc,.docx' },
  security_handling_required: { id: 'security_handling_required', label: 'Security handling required', type: 'checkbox' },
  lifting_points_available: { id: 'lifting_points_available', label: 'Lifting points available', type: 'checkbox' },
  crane_required: { id: 'crane_required', label: 'Crane required', type: 'checkbox' },
  shipment_format: {
    id: 'shipment_format',
    label: 'Shipment Format',
    type: 'select',
    options: [
      { value: 'palletized', label: 'Palletized' },
      { value: 'loose_cartons', label: 'Loose Cartons' },
      { value: 'partial_truckload', label: 'Partial Truckload (LTL)' },
      { value: 'full_truckload', label: 'Full Truckload (FTL)' },
      { value: 'dedicated_vehicle', label: 'Dedicated Vehicle' }
    ]
  },
  container_type: {
    id: 'container_type',
    label: 'Container Type',
    type: 'select',
    options: [
      { value: '20gp', label: "20' Standard" },
      { value: '40gp', label: "40' Standard" },
      { value: '40hc', label: "40' High Cube" },
      { value: '20rf', label: "20' Reefer" },
      { value: '40rf', label: "40' Reefer" },
      { value: '20ot', label: "20' Open Top" },
      { value: '40ot', label: "40' Open Top" },
      { value: '20fr', label: "20' Flat Rack" },
      { value: '40fr', label: "40' Flat Rack" }
    ]
  },
  container_count: { id: 'container_count', label: 'Number of Containers', type: 'number', placeholder: 'e.g. 2' },
  estimated_cargo_weight_kg: { id: 'estimated_cargo_weight_kg', label: 'Estimated Cargo Weight', type: 'number', suffix: 'kg' },
  shipper_loads_container: { id: 'shipper_loads_container', label: 'Shipper loads container (shipper-owned)', type: 'checkbox' },
  hs_code: { id: 'hs_code', label: 'HS Code', type: 'text', placeholder: 'e.g. 8471.30', helperText: 'Harmonized System code for your goods' },
  country_of_origin_goods: { id: 'country_of_origin_goods', label: 'Country of Origin (goods)', type: 'text', placeholder: 'e.g. China' },
  commercial_invoice_value: { id: 'commercial_invoice_value', label: 'Commercial Invoice Value', type: 'number' },
  commercial_invoice_currency: {
    id: 'commercial_invoice_currency',
    label: 'Invoice Currency',
    type: 'select',
    options: [
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
      { value: 'CNY', label: 'CNY' }
    ]
  },
  customs_clearance_required: { id: 'customs_clearance_required', label: 'Customs clearance required', type: 'checkbox' },
  importer_of_record_known: { id: 'importer_of_record_known', label: 'Importer of Record known', type: 'checkbox' },
  include_duties_taxes: { id: 'include_duties_taxes', label: 'Include duties & taxes in quote', type: 'checkbox' },
  service_export_customs: { id: 'service_export_customs', label: 'Export customs clearance', type: 'checkbox' },
  service_import_customs: { id: 'service_import_customs', label: 'Import customs clearance', type: 'checkbox' },
  service_insurance: { id: 'service_insurance', label: 'Cargo insurance', type: 'checkbox' },
  service_warehousing: { id: 'service_warehousing', label: 'Warehousing / storage', type: 'checkbox' },
  service_consolidation: { id: 'service_consolidation', label: 'Consolidation', type: 'checkbox' },
  service_palletization: { id: 'service_palletization', label: 'Palletization / repacking', type: 'checkbox' },
  service_pickup: { id: 'service_pickup', label: 'Pickup from origin', type: 'checkbox' },
  service_last_mile_delivery: { id: 'service_last_mile_delivery', label: 'Last-mile delivery', type: 'checkbox' },
  service_duties_taxes_estimation: { id: 'service_duties_taxes_estimation', label: 'Duties & taxes estimation', type: 'checkbox' },
  insured_value: { id: 'insured_value', label: 'Insured Value', type: 'number' },
  insured_value_currency: {
    id: 'insured_value_currency',
    label: 'Currency',
    type: 'select',
    options: [
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
      { value: 'CNY', label: 'CNY' }
    ]
  },
  storage_duration_days: { id: 'storage_duration_days', label: 'Storage Duration', type: 'number', suffix: 'days' },
  loading_dock_available: { id: 'loading_dock_available', label: 'Loading dock available', type: 'checkbox' },
  forklift_available: { id: 'forklift_available', label: 'Forklift available at destination', type: 'checkbox' },
  tail_lift_needed: { id: 'tail_lift_needed', label: 'Tail-lift truck needed', type: 'checkbox' },
  appointment_required: { id: 'appointment_required', label: 'Delivery appointment required', type: 'checkbox' },
  multiple_suppliers: { id: 'multiple_suppliers', label: 'Multiple pickup suppliers', type: 'checkbox' },
  pickup_points: { id: 'pickup_points', label: 'Number of Pickup Points', type: 'number', placeholder: 'e.g. 3' },
  frequency_type: {
    id: 'frequency_type',
    label: 'Shipment Frequency',
    type: 'select',
    required: true,
    options: [
      { value: 'one_time', label: 'One-time shipment' },
      { value: 'recurring', label: 'Recurring / Regular' },
      { value: 'seasonal', label: 'Seasonal' },
      { value: 'adhoc_recurring', label: 'Ad-hoc / Occasional' }
    ]
  },
  shipment_frequency: {
    id: 'shipment_frequency',
    label: 'How Often?',
    type: 'select',
    options: [
      { value: 'weekly', label: 'Weekly' },
      { value: 'biweekly', label: 'Every 2 weeks' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' }
    ]
  },
  shipments_per_month: { id: 'shipments_per_month', label: 'Shipments per Month', type: 'number' },
  average_shipment_profile: { id: 'average_shipment_profile', label: 'Average Shipment Profile', type: 'textarea', placeholder: 'Typical weight, volume, commodity per shipment' },
  annual_volume_band: {
    id: 'annual_volume_band',
    label: 'Annual Volume',
    type: 'select',
    options: [
      { value: 'under_10', label: 'Under 10 shipments/year' },
      { value: '10_50', label: '10–50 shipments/year' },
      { value: '50_200', label: '50–200 shipments/year' },
      { value: '200_plus', label: '200+ shipments/year' }
    ]
  },
  long_term_partner: { id: 'long_term_partner', label: 'Looking for a long-term partner', type: 'checkbox' },
  peak_months: { id: 'peak_months', label: 'Peak Months', type: 'text', placeholder: 'e.g. Sep–Dec' },
  peak_volume: { id: 'peak_volume', label: 'Peak Volume Description', type: 'textarea', placeholder: 'Expected volume during peak' },
  shipments_per_quarter: { id: 'shipments_per_quarter', label: 'Shipments per Quarter', type: 'number' },
  full_name: { id: 'full_name', label: 'Full Name', type: 'text', required: true },
  company_name: { id: 'company_name', label: 'Company Name', type: 'text', required: true },
  business_type: {
    id: 'business_type',
    label: 'Business Type',
    type: 'select',
    options: [
      { value: 'importer', label: 'Importer' },
      { value: 'exporter', label: 'Exporter' },
      { value: 'manufacturer', label: 'Manufacturer' },
      { value: 'ecommerce', label: 'Ecommerce Seller' },
      { value: 'trading_company', label: 'Trading Company' },
      { value: 'broker', label: 'Customs Broker' },
      { value: 'other', label: 'Other' }
    ]
  },
  email: { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@company.com' },
  phone: { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 555 123 4567' },
  preferred_contact_method: {
    id: 'preferred_contact_method',
    label: 'Preferred Contact Method',
    type: 'select',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'whatsapp', label: 'WhatsApp' }
    ]
  },
  whatsapp_number: { id: 'whatsapp_number', label: 'WhatsApp Number', type: 'tel', placeholder: '+86 138 0000 0000' },
  packing_list_upload: { id: 'packing_list_upload', label: 'Packing List', type: 'file', accept: '.pdf,.xlsx,.csv,.doc,.docx' },
  commercial_invoice_upload: { id: 'commercial_invoice_upload', label: 'Commercial Invoice', type: 'file', accept: '.pdf,.xlsx,.doc,.docx' },
  product_photos_upload: { id: 'product_photos_upload', label: 'Product Photos', type: 'file', accept: '.jpg,.jpeg,.png,.webp,.pdf' },
  other_supporting_docs_upload: { id: 'other_supporting_docs_upload', label: 'Other Documents', type: 'file', accept: '.pdf,.doc,.docx,.xlsx,.csv,.jpg,.png' }
};

export const RULES: Rule[] = [
  {
    when: { field: 'service_type', equals: 'door_to_door' },
    effects: {
      show: ['origin_company', 'origin_address', 'origin_city', 'origin_postal_code', 'origin_country', 'destination_company', 'destination_address', 'destination_city', 'destination_postal_code', 'destination_country'],
      require: ['origin_address', 'origin_city', 'origin_country', 'destination_address', 'destination_city', 'destination_country'],
      hide: ['origin_port_airport', 'destination_port_airport']
    }
  },
  {
    when: { field: 'service_type', equals: 'door_to_port' },
    effects: {
      show: ['origin_company', 'origin_address', 'origin_city', 'origin_postal_code', 'origin_country', 'destination_port_airport'],
      require: ['origin_address', 'origin_city', 'origin_country', 'destination_port_airport'],
      hide: ['origin_port_airport', 'destination_address', 'destination_city', 'destination_postal_code', 'destination_country']
    }
  },
  {
    when: { field: 'service_type', equals: 'port_to_port' },
    effects: {
      show: ['origin_port_airport', 'destination_port_airport'],
      require: ['origin_port_airport', 'destination_port_airport'],
      hide: ['origin_address', 'origin_city', 'origin_postal_code', 'origin_country', 'destination_address', 'destination_city', 'destination_postal_code', 'destination_country']
    }
  },
  {
    when: { field: 'service_type', equals: 'port_to_door' },
    effects: {
      show: ['origin_port_airport', 'destination_company', 'destination_address', 'destination_city', 'destination_postal_code', 'destination_country'],
      require: ['origin_port_airport', 'destination_address', 'destination_city', 'destination_country'],
      hide: ['origin_address', 'origin_city', 'origin_postal_code', 'origin_country', 'destination_port_airport']
    }
  },
  {
    when: { field: 'shipping_mode', equals: 'air' },
    effects: {
      show: ['packaging_type', 'package_count', 'dimensions_mode', 'package_lines', 'total_weight_kg', 'commodity_description', 'cargo_value', 'cargo_value_currency'],
      require: ['package_count', 'package_lines', 'total_weight_kg', 'commodity_description'],
      hide: ['container_type', 'container_count', 'shipper_loads_container', 'shipment_format']
    }
  },
  {
    when: { field: 'shipping_mode', equals: 'sea_fcl' },
    effects: {
      show: ['container_type', 'container_count', 'estimated_cargo_weight_kg', 'commodity_description', 'cargo_value', 'cargo_value_currency', 'shipper_loads_container'],
      require: ['container_type', 'container_count', 'estimated_cargo_weight_kg', 'commodity_description'],
      hide: ['package_count', 'package_lines', 'dimensions_mode', 'shipment_format']
    }
  },
  {
    when: { field: 'shipping_mode', equals: 'sea_lcl' },
    effects: {
      show: ['packaging_type', 'package_count', 'dimensions_mode', 'package_lines', 'total_weight_kg', 'commodity_description', 'cargo_value', 'cargo_value_currency'],
      require: ['packaging_type', 'package_count', 'package_lines', 'total_weight_kg', 'commodity_description'],
      hide: ['container_type', 'container_count', 'shipper_loads_container', 'shipment_format']
    }
  },
  {
    when: { field: 'shipping_mode', equals: 'road' },
    effects: {
      show: ['shipment_format', 'commodity_description', 'cargo_value', 'cargo_value_currency'],
      require: ['shipment_format', 'commodity_description']
    }
  },
  {
    when: { field: 'shipment_format', in: ['palletized', 'loose_cartons', 'partial_truckload'] },
    effects: {
      show: ['packaging_type', 'package_count', 'dimensions_mode', 'package_lines', 'total_weight_kg'],
      require: ['package_count', 'package_lines', 'total_weight_kg']
    }
  },
  {
    when: { field: 'shipment_format', in: ['full_truckload', 'dedicated_vehicle'] },
    effects: {
      show: ['package_count', 'total_weight_kg'],
      require: ['total_weight_kg'],
      hide: ['package_lines']
    }
  },
  {
    when: { field: 'cargo_type', equals: 'hazardous' },
    effects: { show: ['un_number', 'dg_class', 'packing_group', 'msds_upload'], require: ['un_number', 'dg_class', 'msds_upload'] }
  },
  {
    when: { field: 'cargo_type', equals: 'perishable' },
    effects: { show: ['temperature_min_c', 'temperature_max_c'], require: ['temperature_min_c', 'temperature_max_c'] }
  },
  {
    when: { field: 'cargo_type', equals: 'high_value' },
    effects: { show: ['security_handling_required'] }
  },
  {
    when: { field: 'cargo_type', equals: 'oversized' },
    effects: { show: ['lifting_points_available', 'crane_required', 'package_lines'], require: ['package_lines'] }
  },
  {
    when: { field: 'incoterm', equals: 'ddp' },
    effects: { show: ['include_duties_taxes'], showStep: ['customs_compliance'] }
  },
  {
    when: { field: 'service_insurance', equals: true },
    effects: { show: ['insured_value', 'insured_value_currency'], require: ['insured_value', 'insured_value_currency'] }
  },
  {
    when: { field: 'service_warehousing', equals: true },
    effects: { show: ['storage_duration_days'], require: ['storage_duration_days'] }
  },
  {
    when: { field: 'service_consolidation', equals: true },
    effects: { show: ['multiple_suppliers'] }
  },
  {
    when: { field: 'multiple_suppliers', equals: true },
    effects: { show: ['pickup_points'], require: ['pickup_points'] }
  },
  {
    when: { field: 'frequency_type', equals: 'recurring' },
    effects: { show: ['shipment_frequency', 'shipments_per_month', 'average_shipment_profile', 'annual_volume_band', 'long_term_partner'], require: ['shipment_frequency'] }
  },
  {
    when: { field: 'frequency_type', equals: 'seasonal' },
    effects: { show: ['peak_months', 'peak_volume'], require: ['peak_months'] }
  },
  {
    when: { field: 'frequency_type', equals: 'adhoc_recurring' },
    effects: { show: ['shipments_per_quarter'] }
  },
  {
    when: { field: 'preferred_contact_method', equals: 'whatsapp' },
    effects: { show: ['whatsapp_number'], require: ['whatsapp_number'] }
  }
];
