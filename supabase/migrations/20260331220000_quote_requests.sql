-- Quote request submissions from the multi-step freight wizard

-- Clean up any partial previous run
drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
drop policy if exists "Anyone can submit a quote request" on public.quote_requests;
drop policy if exists "Admins can view all quote requests" on public.quote_requests;
drop policy if exists "Admins can update quote requests" on public.quote_requests;
drop index if exists idx_quote_requests_status;
drop index if exists idx_quote_requests_created;
drop index if exists idx_quote_requests_email;
drop table if exists public.quote_requests;
drop type if exists public.quote_status;

-- Ensure helper functions exist (may already exist from earlier migrations)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_directory_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.role = 'admin'
  );
$$;

grant execute on function public.is_directory_admin() to authenticated, anon;

do $$ begin
  create type public.quote_status as enum ('new', 'reviewing', 'matched', 'closed', 'spam');
exception when duplicate_object then null;
end $$;

create table public.quote_requests (
  id          uuid primary key default gen_random_uuid(),
  status      public.quote_status not null default 'new',

  -- Shipment basics
  shipping_mode         text,
  service_type          text,
  incoterm              text,
  shipment_ready_date   date,
  shipping_window       text,

  -- Route - origin
  origin_company        text,
  origin_address        text,
  origin_city           text,
  origin_postal_code    text,
  origin_country        text,
  origin_port_airport   text,

  -- Route - destination
  destination_company   text,
  destination_address   text,
  destination_city      text,
  destination_postal_code text,
  destination_country   text,
  destination_port_airport text,

  -- Cargo details
  packaging_type        text,
  package_count         int,
  dimensions_mode       text,
  package_lines         text,
  total_weight_kg       numeric,
  commodity_description text,
  cargo_value           numeric,
  cargo_value_currency  text,
  cargo_type            text,
  stackable             boolean default false,
  forklift_accessible   boolean default false,
  temperature_min_c     numeric,
  temperature_max_c     numeric,
  un_number             text,
  dg_class              text,
  packing_group         text,
  security_handling_required boolean default false,
  lifting_points_available   boolean default false,
  crane_required        boolean default false,
  shipment_format       text,
  container_type        text,
  container_count       int,
  estimated_cargo_weight_kg numeric,
  shipper_loads_container boolean default false,

  -- Customs & compliance
  hs_code                   text,
  country_of_origin_goods   text,
  commercial_invoice_value  numeric,
  commercial_invoice_currency text,
  customs_clearance_required boolean default false,
  importer_of_record_known   boolean default false,
  include_duties_taxes       boolean default false,

  -- Additional services
  service_export_customs     boolean default false,
  service_import_customs     boolean default false,
  service_insurance          boolean default false,
  service_warehousing        boolean default false,
  service_consolidation      boolean default false,
  service_palletization      boolean default false,
  service_pickup             boolean default false,
  service_last_mile_delivery boolean default false,
  service_duties_taxes_estimation boolean default false,
  insured_value              numeric,
  insured_value_currency     text,
  storage_duration_days      int,
  loading_dock_available     boolean default false,
  forklift_available         boolean default false,
  tail_lift_needed           boolean default false,
  appointment_required       boolean default false,
  multiple_suppliers         boolean default false,
  pickup_points              int,

  -- Frequency
  frequency_type         text,
  shipment_frequency     text,
  shipments_per_month    int,
  average_shipment_profile text,
  annual_volume_band     text,
  long_term_partner      boolean default false,
  peak_months            text,
  peak_volume            text,
  shipments_per_quarter  int,

  -- Contact
  full_name              text not null,
  company_name           text,
  business_type          text,
  email                  text not null,
  phone                  text,
  preferred_contact_method text,
  whatsapp_number        text,

  -- Metadata
  ip_address             inet,
  user_agent             text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index idx_quote_requests_status on public.quote_requests (status);
create index idx_quote_requests_created on public.quote_requests (created_at desc);
create index idx_quote_requests_email on public.quote_requests (email);

alter table public.quote_requests enable row level security;

-- Public can insert (anyone can submit a quote request)
create policy "Anyone can submit a quote request"
  on public.quote_requests for insert
  with check (true);

-- Only admins can read/update
create policy "Admins can view all quote requests"
  on public.quote_requests for select
  using (public.is_directory_admin());

create policy "Admins can update quote requests"
  on public.quote_requests for update
  using (public.is_directory_admin());

create trigger set_quote_requests_updated_at
  before update on public.quote_requests
  for each row execute function public.set_updated_at();
