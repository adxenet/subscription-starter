-- Bulk seed data for testing search/filtering on /directory
-- Includes diverse cities, categories, price bands, and accepting_new_clients values.

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
  ('30000000-0000-0000-0000-000000000001', 'yangtze-fcl-solutions-shanghai', 'Yangtze FCL Solutions', 'Enterprise FCL exports via Shanghai.', 'Large-scale full container forwarding and customs handling.', 'https://example.com/yangtze-fcl', '+86-21-5555-0001', 'ops@yangtzefcl.example', 'Shanghai', 'Shanghai', 'China', 1500, 12000, 'premium', true, 'approved', true),
  ('30000000-0000-0000-0000-000000000002', 'canton-air-link-guangzhou', 'Canton Air Link', 'Fast air freight lanes from Guangzhou.', 'Priority air cargo options for urgent ecommerce and retail loads.', 'https://example.com/canton-air', '+86-20-5555-0002', 'hello@cantonair.example', 'Guangzhou', 'Guangdong', 'China', 500, 5000, 'mid', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000003', 'ningbo-ocean-consolidators', 'Ningbo Ocean Consolidators', 'LCL consolidation and export paperwork.', 'Weekly LCL departures and bonded handling for SMEs.', 'https://example.com/ningbo-ocean', '+86-574-5555-0003', 'sales@ningboocean.example', 'Ningbo', 'Zhejiang', 'China', 350, 3200, 'budget', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000004', 'shenzhen-crossborder-fulfillment', 'Shenzhen Crossborder Fulfillment', 'FBA prep, labeling, and outbound shipping.', 'Integrated fulfillment plus freight forwarding for Amazon sellers.', 'https://example.com/sz-crossborder', '+86-755-5555-0004', 'team@szcrossborder.example', 'Shenzhen', 'Guangdong', 'China', 300, 2600, 'budget', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000005', 'beijing-rail-cargo-hub', 'Beijing Rail Cargo Hub', 'China-Europe rail and multimodal planning.', 'Rail-focused transit for high-value cargo with predictable schedules.', 'https://example.com/beijing-rail', '+86-10-5555-0005', 'ops@bjrailhub.example', 'Beijing', 'Beijing', 'China', 900, 7800, 'premium', false, 'approved', false),
  ('30000000-0000-0000-0000-000000000006', 'xiamen-door2door-forwarders', 'Xiamen Door2Door Forwarders', 'Door-to-door freight with customs brokerage.', 'Pickup from factory and final-mile delivery to destination warehouse.', 'https://example.com/xm-door2door', '+86-592-5555-0006', 'info@xmdoor2door.example', 'Xiamen', 'Fujian', 'China', 400, 3800, 'mid', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000007', 'qingdao-cold-chain-logistics', 'Qingdao Cold Chain Logistics', 'Temperature-controlled logistics for perishables.', 'Cold chain handling for food and pharma exports.', 'https://example.com/qd-coldchain', '+86-532-5555-0007', 'care@qdcoldchain.example', 'Qingdao', 'Shandong', 'China', 1300, 9800, 'premium', false, 'approved', false),
  ('30000000-0000-0000-0000-000000000008', 'hongkong-express-aircargo', 'Hong Kong Express AirCargo', 'Express cross-border air cargo services.', 'Airport-to-airport and door-to-air options with daily departures.', 'https://example.com/hk-aircargo', '+852-3555-0008', 'bookings@hkaircargo.example', 'Hong Kong', 'Hong Kong', 'China', 700, 6200, 'mid', true, 'approved', true),
  ('30000000-0000-0000-0000-000000000009', 'suzhou-smart-warehousing', 'Suzhou Smart Warehousing', 'Warehousing and inventory sync for importers.', 'Storage, pick-pack, and outbound freight coordination.', 'https://example.com/sz-warehouse', '+86-512-5555-0009', 'warehouse@suzhousmart.example', 'Suzhou', 'Jiangsu', 'China', 280, 2200, 'budget', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000010', 'tianjin-project-cargo-group', 'Tianjin Project Cargo Group', 'Oversized and project cargo specialists.', 'Heavy-lift and breakbulk planning for industrial shipments.', 'https://example.com/tj-project', '+86-22-5555-0010', 'projects@tjcargo.example', 'Tianjin', 'Tianjin', 'China', 2500, 20000, 'enterprise', false, 'approved', false),
  ('30000000-0000-0000-0000-000000000011', 'wuhan-multimodal-network', 'Wuhan Multimodal Network', 'Rail, road, and ocean combined routes.', 'Cost-optimized routing across inland China to major ports.', 'https://example.com/wh-multimodal', '+86-27-5555-0011', 'support@whmultimodal.example', 'Wuhan', 'Hubei', 'China', 600, 5400, 'mid', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000012', 'chengdu-ecom-freight-partners', 'Chengdu Ecom Freight Partners', 'Cross-border ecommerce freight from Western China.', 'Consolidation and express export for DTC brands.', 'https://example.com/cd-ecom', '+86-28-5555-0012', 'growth@cdecom.example', 'Chengdu', 'Sichuan', 'China', 450, 4200, 'mid', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000013', 'dalian-bulk-ocean-lines', 'Dalian Bulk Ocean Lines', 'Bulk ocean and non-containerized cargo.', 'Bulk vessel booking and port operations management.', 'https://example.com/dl-bulk', '+86-411-5555-0013', 'bulk@dlbulk.example', 'Dalian', 'Liaoning', 'China', 1700, 14000, 'premium', false, 'approved', false),
  ('30000000-0000-0000-0000-000000000014', 'foshan-furniture-export-logistics', 'Foshan Furniture Export Logistics', 'Specialized handling for furniture exporters.', 'Packaging, consolidation, and ocean shipment planning.', 'https://example.com/fs-furniture', '+86-757-5555-0014', 'export@fsfurniture.example', 'Foshan', 'Guangdong', 'China', 380, 3600, 'budget', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000015', 'zhengzhou-air-rail-connect', 'Zhengzhou Air Rail Connect', 'Air + rail combination for fast replenishment.', 'Hybrid transit lanes for balanced cost and speed.', 'https://example.com/zz-airrail', '+86-371-5555-0015', 'lanes@zzairrail.example', 'Zhengzhou', 'Henan', 'China', 800, 7000, 'premium', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000016', 'haikou-island-freight-services', 'Haikou Island Freight Services', 'South China sea shipping and island distribution.', 'Regional sea freight with bonded options.', 'https://example.com/hk-island', '+86-898-5555-0016', 'service@haikouisland.example', 'Haikou', 'Hainan', 'China', 420, 3300, 'mid', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000017', 'nanjing-customs-clearance-pro', 'Nanjing Customs Clearance Pro', 'Customs-first freight forwarding services.', 'Fast compliance checks and customs brokerage for regulated goods.', 'https://example.com/nj-customs', '+86-25-5555-0017', 'brokerage@njcustoms.example', 'Nanjing', 'Jiangsu', 'China', 500, 4100, 'mid', false, 'approved', false),
  ('30000000-0000-0000-0000-000000000018', 'hangzhou-growth-fba-logistics', 'Hangzhou Growth FBA Logistics', 'Amazon FBA prep and freight orchestration.', 'FBA prep with SLA-backed handoff and weekly departures.', 'https://example.com/hz-fba', '+86-571-5555-0018', 'fba@hzgrowth.example', 'Hangzhou', 'Zhejiang', 'China', 320, 2800, 'budget', true, 'approved', false),
  ('30000000-0000-0000-0000-000000000019', 'shenyang-industrial-cargo', 'Shenyang Industrial Cargo', 'Industrial machinery and project freight.', 'Specialized export planning for heavy manufacturing cargo.', 'https://example.com/sy-industrial', '+86-24-5555-0019', 'industrial@sycargo.example', 'Shenyang', 'Liaoning', 'China', 1800, 15000, 'enterprise', false, 'approved', false),
  ('30000000-0000-0000-0000-000000000020', 'kunming-southasia-forwarding', 'Kunming South Asia Forwarding', 'Road and air lanes into South Asia markets.', 'Cross-border lane optimization for regional trade corridors.', 'https://example.com/km-southasia', '+86-871-5555-0020', 'trade@kmsouthasia.example', 'Kunming', 'Yunnan', 'China', 550, 4300, 'mid', true, 'approved', false)
on conflict (slug) do update
set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
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
    ('yangtze-fcl-solutions-shanghai', 'ocean-freight-fcl'),
    ('yangtze-fcl-solutions-shanghai', 'customs-clearance'),
    ('canton-air-link-guangzhou', 'air-freight'),
    ('canton-air-link-guangzhou', 'door-to-door'),
    ('ningbo-ocean-consolidators', 'ocean-freight-lcl'),
    ('ningbo-ocean-consolidators', 'multimodal-shipping'),
    ('shenzhen-crossborder-fulfillment', 'ecommerce-fulfillment'),
    ('shenzhen-crossborder-fulfillment', 'amazon-fba-prep'),
    ('beijing-rail-cargo-hub', 'rail-freight'),
    ('beijing-rail-cargo-hub', 'multimodal-shipping'),
    ('xiamen-door2door-forwarders', 'door-to-door'),
    ('xiamen-door2door-forwarders', 'customs-clearance'),
    ('qingdao-cold-chain-logistics', 'cold-chain-logistics'),
    ('hongkong-express-aircargo', 'air-freight'),
    ('hongkong-express-aircargo', 'dangerous-goods'),
    ('suzhou-smart-warehousing', 'warehousing'),
    ('suzhou-smart-warehousing', 'ecommerce-fulfillment'),
    ('tianjin-project-cargo-group', 'project-cargo'),
    ('wuhan-multimodal-network', 'multimodal-shipping'),
    ('wuhan-multimodal-network', 'road-freight'),
    ('chengdu-ecom-freight-partners', 'ecommerce-fulfillment'),
    ('dalian-bulk-ocean-lines', 'ocean-freight-fcl'),
    ('foshan-furniture-export-logistics', 'ocean-freight-lcl'),
    ('zhengzhou-air-rail-connect', 'air-freight'),
    ('zhengzhou-air-rail-connect', 'rail-freight'),
    ('haikou-island-freight-services', 'road-freight'),
    ('nanjing-customs-clearance-pro', 'customs-clearance'),
    ('hangzhou-growth-fba-logistics', 'amazon-fba-prep'),
    ('hangzhou-growth-fba-logistics', 'ecommerce-fulfillment'),
    ('shenyang-industrial-cargo', 'project-cargo'),
    ('kunming-southasia-forwarding', 'road-freight'),
    ('kunming-southasia-forwarding', 'air-freight')
) as x(business_slug, category_slug)
join public.directory_businesses b on b.slug = x.business_slug
join public.directory_categories c on c.slug = x.category_slug
on conflict (business_id, category_id) do nothing;
