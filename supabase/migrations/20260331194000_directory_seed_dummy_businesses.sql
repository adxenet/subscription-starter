-- Seed dummy businesses for local/dev demo usage.
-- Safe to rerun via ON CONFLICT clauses.

insert into public.directory_businesses (
  id,
  slug,
  name,
  short_description,
  description,
  website_url,
  phone,
  email,
  city,
  province,
  country,
  min_price_usd,
  max_price_usd,
  price_band,
  accepting_new_clients,
  status,
  featured
)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'dragon-bridge-logistics-shenzhen',
    'Dragon Bridge Logistics',
    'FCL/LCL shipping from Shenzhen with customs and door delivery.',
    'Dragon Bridge Logistics helps importers move cargo from China factories to global warehouses with compliant customs workflows.',
    'https://example.com/dragon-bridge',
    '+86-755-1000-0001',
    'ops@dragonbridge.example',
    'Shenzhen',
    'Guangdong',
    'China',
    600,
    4500,
    'mid',
    true,
    'approved',
    true
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'pearl-route-freight-guangzhou',
    'Pearl Route Freight',
    'Reliable air and ocean freight for ecommerce brands.',
    'Pearl Route Freight specializes in small-to-mid volume shipments, fast handoff, and responsive shipment tracking.',
    'https://example.com/pearl-route',
    '+86-20-1000-0002',
    'hello@pearlroute.example',
    'Guangzhou',
    'Guangdong',
    'China',
    400,
    3200,
    'budget',
    true,
    'approved',
    false
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'silk-lane-global-shanghai',
    'Silk Lane Global',
    'Premium freight forwarding with bonded warehousing.',
    'Silk Lane Global supports enterprise importers with bonded warehousing, multimodal planning, and KPI reporting.',
    'https://example.com/silk-lane',
    '+86-21-1000-0003',
    'contact@silklane.example',
    'Shanghai',
    'Shanghai',
    'China',
    1200,
    9800,
    'premium',
    false,
    'approved',
    true
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'jade-anchor-cargo-ningbo',
    'Jade Anchor Cargo',
    'Cost-efficient Ningbo ocean exports and consolidation.',
    'Jade Anchor Cargo is focused on ocean container planning and consolidation for SMEs shipping monthly.',
    'https://example.com/jade-anchor',
    '+86-574-1000-0004',
    'sales@jadeanchor.example',
    'Ningbo',
    'Zhejiang',
    'China',
    500,
    4000,
    'mid',
    true,
    'approved',
    false
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'eastern-sky-forwarding-hong-kong',
    'Eastern Sky Forwarding',
    'Express air freight and dangerous goods support.',
    'Eastern Sky Forwarding provides express lanes and DG-compliant air cargo handling for urgent shipments.',
    'https://example.com/eastern-sky',
    '+852-3000-0005',
    'team@easternsky.example',
    'Hong Kong',
    'Hong Kong',
    'China',
    900,
    6800,
    'premium',
    true,
    'approved',
    false
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    'greatwall-fulfillment-xiamen',
    'GreatWall Fulfillment',
    'China warehousing, pick-pack, and final-mile handoff.',
    'GreatWall Fulfillment combines freight forwarding with ecommerce prep, labeling, and cross-border handoff.',
    'https://example.com/greatwall-fulfillment',
    '+86-592-1000-0006',
    'support@greatwall.example',
    'Xiamen',
    'Fujian',
    'China',
    350,
    2600,
    'budget',
    true,
    'approved',
    false
  )
on conflict (slug) do update
set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  website_url = excluded.website_url,
  phone = excluded.phone,
  email = excluded.email,
  city = excluded.city,
  province = excluded.province,
  country = excluded.country,
  min_price_usd = excluded.min_price_usd,
  max_price_usd = excluded.max_price_usd,
  price_band = excluded.price_band,
  accepting_new_clients = excluded.accepting_new_clients,
  status = excluded.status,
  featured = excluded.featured,
  updated_at = now();

insert into public.directory_business_category_map (business_id, category_id)
select b.id, c.id
from (
  values
    ('dragon-bridge-logistics-shenzhen', 'ocean-freight-fcl'),
    ('dragon-bridge-logistics-shenzhen', 'customs-clearance'),
    ('pearl-route-freight-guangzhou', 'air-freight'),
    ('pearl-route-freight-guangzhou', 'ecommerce-fulfillment'),
    ('silk-lane-global-shanghai', 'multimodal-shipping'),
    ('silk-lane-global-shanghai', 'warehousing'),
    ('jade-anchor-cargo-ningbo', 'ocean-freight-lcl'),
    ('jade-anchor-cargo-ningbo', 'door-to-door'),
    ('eastern-sky-forwarding-hong-kong', 'air-freight'),
    ('eastern-sky-forwarding-hong-kong', 'dangerous-goods'),
    ('greatwall-fulfillment-xiamen', 'amazon-fba-prep'),
    ('greatwall-fulfillment-xiamen', 'ecommerce-fulfillment')
) as x(business_slug, category_slug)
join public.directory_businesses b on b.slug = x.business_slug
join public.directory_categories c on c.slug = x.category_slug
on conflict (business_id, category_id) do nothing;

insert into public.directory_reviews (
  id,
  business_id,
  user_id,
  rating,
  title,
  body,
  status
)
select
  v.id::uuid,
  v.business_id::uuid,
  u.id,
  v.rating::int,
  v.title,
  v.body,
  'approved'::public.moderation_status
from (
  values
    (
      '20000000-0000-0000-0000-000000000001',
      '10000000-0000-0000-0000-000000000001',
      5,
      'Smooth first shipment',
      'Great communication and clear timelines from booking to delivery.'
    ),
    (
      '20000000-0000-0000-0000-000000000002',
      '10000000-0000-0000-0000-000000000002',
      4,
      'Reliable partner',
      'Good rates and reliable support for recurring air shipments.'
    ),
    (
      '20000000-0000-0000-0000-000000000003',
      '10000000-0000-0000-0000-000000000003',
      5,
      'Excellent enterprise workflow',
      'Strong SOPs, reporting, and customs support.'
    )
) as v(id, business_id, rating, title, body)
cross join lateral (
  select id from public.users limit 1
) u
on conflict (id) do nothing;

update public.directory_businesses b
set
  avg_rating = coalesce(stats.avg_rating, 0),
  review_count = coalesce(stats.review_count, 0),
  updated_at = now()
from (
  select
    business_id,
    avg(rating)::numeric(3,2) as avg_rating,
    count(*)::int as review_count
  from public.directory_reviews
  where status = 'approved'
  group by business_id
) stats
where b.id = stats.business_id;
