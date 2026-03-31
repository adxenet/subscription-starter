-- Remove price-related columns from directory_businesses (not needed for MVP)

drop index if exists idx_dir_businesses_price_band;

alter table public.directory_businesses
  drop column if exists min_price_usd,
  drop column if exists max_price_usd,
  drop column if exists price_band;
