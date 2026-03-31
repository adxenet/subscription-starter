-- Seed baseline categories for China freight forwarder directory

insert into public.directory_categories (slug, name)
values
  ('ocean-freight-fcl', 'Ocean Freight (FCL)'),
  ('ocean-freight-lcl', 'Ocean Freight (LCL)'),
  ('air-freight', 'Air Freight'),
  ('rail-freight', 'Rail Freight'),
  ('road-freight', 'Road Freight'),
  ('multimodal-shipping', 'Multimodal Shipping'),
  ('customs-clearance', 'Customs Clearance'),
  ('door-to-door', 'Door-to-Door Shipping'),
  ('ecommerce-fulfillment', 'Ecommerce Fulfillment'),
  ('amazon-fba-prep', 'Amazon FBA Prep'),
  ('warehousing', 'Warehousing'),
  ('cold-chain-logistics', 'Cold Chain Logistics'),
  ('dangerous-goods', 'Dangerous Goods Shipping'),
  ('project-cargo', 'Project Cargo'),
  ('insurance', 'Cargo Insurance')
on conflict (slug) do update
set name = excluded.name;
