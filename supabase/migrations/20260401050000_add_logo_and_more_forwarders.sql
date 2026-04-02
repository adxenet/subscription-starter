-- Add logo_url column to directory_businesses
alter table public.directory_businesses
  add column if not exists logo_url text;

-- Set logo URLs for existing businesses using UI Avatars
update public.directory_businesses
set logo_url = 'https://ui-avatars.com/api/?name=' || replace(name, ' ', '+') || '&background=b4090b&color=fff&size=128&bold=true&font-size=0.35'
where logo_url is null;

-- Insert additional dummy forwarders
insert into public.directory_businesses (
  id, slug, name, short_description, description,
  website_url, phone, email, city, province, country,
  accepting_new_clients, status, featured, logo_url
)
values
  (
    '40000000-0000-0000-0000-000000000001',
    'pacific-star-logistics-shanghai',
    'Pacific Star Logistics',
    'Full-service ocean and air freight from Shanghai.',
    'End-to-end logistics with real-time tracking, customs clearance, and warehousing in the Yangtze Delta region.',
    'https://example.com/pacificstar', '+86-21-6688-0001', 'info@pacificstar.example',
    'Shanghai', 'Shanghai', 'China', true, 'approved', true,
    'https://ui-avatars.com/api/?name=Pacific+Star&background=1e40af&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    'golden-dragon-shipping-shenzhen',
    'Golden Dragon Shipping',
    'Premium FCL services to North America and Europe.',
    'Dedicated container lines with weekly sailings and guaranteed space allocation for high-volume shippers.',
    'https://example.com/goldendragon', '+86-755-8899-0002', 'sales@goldendragon.example',
    'Shenzhen', 'Guangdong', 'China', true, 'approved', true,
    'https://ui-avatars.com/api/?name=Golden+Dragon&background=b45309&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    'orient-bridge-cargo-guangzhou',
    'Orient Bridge Cargo',
    'LCL consolidation and eCommerce fulfillment.',
    'Weekly LCL departures with competitive CBM rates and integrated Amazon FBA prep services.',
    'https://example.com/orientbridge', '+86-20-7766-0003', 'ops@orientbridge.example',
    'Guangzhou', 'Guangdong', 'China', true, 'approved', false,
    'https://ui-avatars.com/api/?name=Orient+Bridge&background=059669&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    'skyline-air-freight-beijing',
    'Skyline Air Freight',
    'Express air cargo for time-critical shipments.',
    'Same-day pickup and next-flight-out options from Beijing Capital and Daxing airports.',
    'https://example.com/skylineair', '+86-10-3344-0004', 'express@skylineair.example',
    'Beijing', 'Beijing', 'China', false, 'approved', false,
    'https://ui-avatars.com/api/?name=Skyline+Air&background=7c3aed&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000005',
    'jade-river-forwarding-ningbo',
    'Jade River Forwarding',
    'Ningbo port specialists for FCL and breakbulk.',
    'Deep relationships with Ningbo-Zhoushan port terminals for priority loading and competitive rates.',
    'https://example.com/jaderiver', '+86-574-2211-0005', 'book@jaderiver.example',
    'Ningbo', 'Zhejiang', 'China', true, 'approved', false,
    'https://ui-avatars.com/api/?name=Jade+River&background=0d9488&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000006',
    'summit-trade-logistics-xiamen',
    'Summit Trade Logistics',
    'Door-to-door freight with customs brokerage.',
    'Complete supply chain solutions from factory pickup in Fujian province to destination warehouse delivery.',
    'https://example.com/summittrade', '+86-592-4455-0006', 'trade@summittrade.example',
    'Xiamen', 'Fujian', 'China', true, 'approved', false,
    'https://ui-avatars.com/api/?name=Summit+Trade&background=dc2626&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000007',
    'blue-ocean-container-lines-qingdao',
    'Blue Ocean Container Lines',
    'Weekly FCL sailings from Qingdao to 40+ ports.',
    'Direct and transshipment ocean services with competitive transit times and container tracking.',
    'https://example.com/blueocean', '+86-532-6677-0007', 'containers@blueocean.example',
    'Qingdao', 'Shandong', 'China', true, 'approved', true,
    'https://ui-avatars.com/api/?name=Blue+Ocean&background=0369a1&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000008',
    'great-wall-supply-chain-tianjin',
    'Great Wall Supply Chain',
    'Integrated supply chain and warehousing solutions.',
    'Bonded warehousing, inventory management, and multimodal freight from Tianjin port.',
    'https://example.com/greatwall', '+86-22-8899-0008', 'supply@greatwall.example',
    'Tianjin', 'Tianjin', 'China', false, 'approved', false,
    'https://ui-avatars.com/api/?name=Great+Wall&background=92400e&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000009',
    'phoenix-express-cargo-chengdu',
    'Phoenix Express Cargo',
    'Western China eCommerce and cross-border specialist.',
    'Rail and air freight solutions optimized for DTC brands shipping from Sichuan province.',
    'https://example.com/phoenixexpress', '+86-28-1122-0009', 'cargo@phoenixexpress.example',
    'Chengdu', 'Sichuan', 'China', true, 'approved', false,
    'https://ui-avatars.com/api/?name=Phoenix+Express&background=ea580c&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000010',
    'silk-route-global-hangzhou',
    'Silk Route Global',
    'FBA prep and eCommerce logistics from Hangzhou.',
    'Specializing in Amazon FBA prep with inspection, labeling, bundling, and express shipping services.',
    'https://example.com/silkroute', '+86-571-3344-0010', 'fba@silkroute.example',
    'Hangzhou', 'Zhejiang', 'China', true, 'approved', false,
    'https://ui-avatars.com/api/?name=Silk+Route&background=4f46e5&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000011',
    'red-star-freight-dalian',
    'Red Star Freight',
    'Bulk and project cargo from Northeast China.',
    'Heavy-lift, oversized, and breakbulk cargo handling with engineering support for complex shipments.',
    'https://example.com/redstar', '+86-411-5566-0011', 'project@redstar.example',
    'Dalian', 'Liaoning', 'China', false, 'approved', false,
    'https://ui-avatars.com/api/?name=Red+Star&background=991b1b&color=fff&size=128&bold=true&font-size=0.35'
  ),
  (
    '40000000-0000-0000-0000-000000000012',
    'pearl-delta-express-dongguan',
    'Pearl Delta Express',
    'Fast-turnaround freight from the Pearl River Delta.',
    'Same-day factory pickup across Dongguan, Foshan, and Zhongshan with next-day port delivery.',
    'https://example.com/pearldelta', '+86-769-7788-0012', 'express@pearldelta.example',
    'Dongguan', 'Guangdong', 'China', true, 'approved', false,
    'https://ui-avatars.com/api/?name=Pearl+Delta&background=0891b2&color=fff&size=128&bold=true&font-size=0.35'
  )
on conflict (slug) do update
set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  city = excluded.city,
  province = excluded.province,
  country = excluded.country,
  accepting_new_clients = excluded.accepting_new_clients,
  status = excluded.status,
  featured = excluded.featured,
  logo_url = excluded.logo_url,
  updated_at = now();

-- Map new businesses to categories
insert into public.directory_business_category_map (business_id, category_id)
select b.id, c.id
from (
  values
    ('pacific-star-logistics-shanghai', 'ocean-freight-fcl'),
    ('pacific-star-logistics-shanghai', 'air-freight'),
    ('pacific-star-logistics-shanghai', 'customs-clearance'),
    ('golden-dragon-shipping-shenzhen', 'ocean-freight-fcl'),
    ('golden-dragon-shipping-shenzhen', 'door-to-door'),
    ('orient-bridge-cargo-guangzhou', 'ocean-freight-lcl'),
    ('orient-bridge-cargo-guangzhou', 'amazon-fba-prep'),
    ('orient-bridge-cargo-guangzhou', 'ecommerce-fulfillment'),
    ('skyline-air-freight-beijing', 'air-freight'),
    ('jade-river-forwarding-ningbo', 'ocean-freight-fcl'),
    ('jade-river-forwarding-ningbo', 'multimodal-shipping'),
    ('summit-trade-logistics-xiamen', 'door-to-door'),
    ('summit-trade-logistics-xiamen', 'customs-clearance'),
    ('blue-ocean-container-lines-qingdao', 'ocean-freight-fcl'),
    ('great-wall-supply-chain-tianjin', 'warehousing'),
    ('great-wall-supply-chain-tianjin', 'multimodal-shipping'),
    ('phoenix-express-cargo-chengdu', 'ecommerce-fulfillment'),
    ('phoenix-express-cargo-chengdu', 'rail-freight'),
    ('silk-route-global-hangzhou', 'amazon-fba-prep'),
    ('silk-route-global-hangzhou', 'ecommerce-fulfillment'),
    ('red-star-freight-dalian', 'project-cargo'),
    ('pearl-delta-express-dongguan', 'door-to-door'),
    ('pearl-delta-express-dongguan', 'road-freight')
) as x(business_slug, category_slug)
join public.directory_businesses b on b.slug = x.business_slug
join public.directory_categories c on c.slug = x.category_slug
on conflict (business_id, category_id) do nothing;

-- Grant select on new column
notify pgrst, 'reload schema';
