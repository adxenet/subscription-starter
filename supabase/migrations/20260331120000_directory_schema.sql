-- China Freight Forwarders directory schema (MVP)

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'business_status') then
    create type business_status as enum ('pending', 'approved', 'rejected', 'suspended');
  end if;

  if not exists (select 1 from pg_type where typname = 'claim_status') then
    create type claim_status as enum ('pending', 'approved', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'moderation_status') then
    create type moderation_status as enum ('pending', 'approved', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'price_range') then
    create type price_range as enum ('budget', 'mid', 'premium', 'enterprise');
  end if;
end $$;

alter table public.users
  add column if not exists role text not null default 'user'
  check (role in ('user', 'owner', 'admin'));

create table if not exists public.directory_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.directory_businesses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  website_url text,
  phone text,
  email text,
  city text,
  province text,
  country text not null default 'China',
  address_line1 text,
  address_line2 text,
  postal_code text,
  min_price_usd integer,
  max_price_usd integer,
  price_band price_range not null default 'mid',
  accepting_new_clients boolean not null default true,
  status business_status not null default 'pending',
  owner_user_id uuid references public.users(id) on delete set null,
  avg_rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_tsv tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(short_description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(city, '') || ' ' || coalesce(province, '')), 'C')
  ) stored
);

create table if not exists public.directory_business_category_map (
  business_id uuid not null references public.directory_businesses(id) on delete cascade,
  category_id uuid not null references public.directory_categories(id) on delete cascade,
  primary key (business_id, category_id)
);

create table if not exists public.directory_reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.directory_businesses(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  status moderation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, user_id)
);

create table if not exists public.directory_business_claims (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.directory_businesses(id) on delete cascade,
  claimant_user_id uuid not null references public.users(id) on delete cascade,
  evidence_url text,
  message text,
  status claim_status not null default 'pending',
  reviewed_by uuid references public.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (business_id, claimant_user_id)
);

create table if not exists public.directory_moderation_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  reason text,
  actor_user_id uuid references public.users(id),
  created_at timestamptz not null default now()
);

create index if not exists idx_dir_businesses_status on public.directory_businesses(status);
create index if not exists idx_dir_businesses_accepting on public.directory_businesses(accepting_new_clients);
create index if not exists idx_dir_businesses_price_band on public.directory_businesses(price_band);
create index if not exists idx_dir_businesses_city_province on public.directory_businesses(province, city);
create index if not exists idx_dir_businesses_owner on public.directory_businesses(owner_user_id);
create index if not exists idx_dir_businesses_search_tsv on public.directory_businesses using gin(search_tsv);
create index if not exists idx_dir_reviews_business_status on public.directory_reviews(business_id, status);
create index if not exists idx_dir_claims_status on public.directory_business_claims(status);
