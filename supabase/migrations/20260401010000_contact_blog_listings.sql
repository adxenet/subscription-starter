-- Contact form submissions
create table public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  topic       text not null,
  message     text not null,
  ip_address  inet,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index idx_contact_submissions_created on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit a contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can view contact submissions"
  on public.contact_submissions for select
  using (public.is_directory_admin());

grant insert on public.contact_submissions to anon, authenticated;
grant select on public.contact_submissions to authenticated;

-- Blog posts
create table public.blog_posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  excerpt          text,
  body_html        text,
  cover_image_url  text,
  author_name      text default 'China Forwarders',
  reading_time_min int,
  status           text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_blog_posts_slug on public.blog_posts (slug);
create index idx_blog_posts_status on public.blog_posts (status, published_at desc);

alter table public.blog_posts enable row level security;

create policy "Published blog posts are public"
  on public.blog_posts for select
  using (status = 'published' or public.is_directory_admin());

create policy "Admins can manage blog posts"
  on public.blog_posts for all
  using (public.is_directory_admin())
  with check (public.is_directory_admin());

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- Listing submissions (pending review before becoming directory_businesses)
create table public.listing_submissions (
  id                uuid primary key default gen_random_uuid(),
  status            text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  company_name      text not null,
  description       text not null,
  website           text,
  year_established  int,
  address           text,
  city              text not null,
  province          text,
  country           text not null,
  services          text[],
  contact_name      text not null,
  contact_email     text not null,
  contact_phone     text,
  contact_wechat    text,
  ip_address        inet,
  user_agent        text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_listing_submissions_status on public.listing_submissions (status);
create index idx_listing_submissions_created on public.listing_submissions (created_at desc);

alter table public.listing_submissions enable row level security;

create policy "Anyone can submit a listing"
  on public.listing_submissions for insert
  with check (true);

create policy "Admins can view listing submissions"
  on public.listing_submissions for select
  using (public.is_directory_admin());

create policy "Admins can update listing submissions"
  on public.listing_submissions for update
  using (public.is_directory_admin());

grant insert on public.listing_submissions to anon, authenticated;
grant select, update on public.listing_submissions to authenticated;

create trigger set_listing_submissions_updated_at
  before update on public.listing_submissions
  for each row execute function public.set_updated_at();

notify pgrst, 'reload schema';
