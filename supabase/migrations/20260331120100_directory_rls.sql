-- RLS and helper functions for directory tables

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

create or replace function public.is_directory_owner_or_admin(target_owner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() = target_owner or public.is_directory_admin();
$$;

grant execute on function public.is_directory_admin() to authenticated, anon;
grant execute on function public.is_directory_owner_or_admin(uuid) to authenticated, anon;

alter table public.directory_categories enable row level security;
alter table public.directory_businesses enable row level security;
alter table public.directory_business_category_map enable row level security;
alter table public.directory_reviews enable row level security;
alter table public.directory_business_claims enable row level security;
alter table public.directory_moderation_logs enable row level security;

-- Categories
create policy "Directory categories are public read"
on public.directory_categories
for select
using (true);

create policy "Directory categories admin mutate"
on public.directory_categories
for all
using (public.is_directory_admin())
with check (public.is_directory_admin());

-- Businesses
create policy "Directory businesses public read approved"
on public.directory_businesses
for select
using (status = 'approved' or public.is_directory_admin());

create policy "Directory businesses owner create"
on public.directory_businesses
for insert
with check (auth.uid() is not null and owner_user_id = auth.uid());

create policy "Directory businesses owner update"
on public.directory_businesses
for update
using (public.is_directory_owner_or_admin(owner_user_id))
with check (public.is_directory_owner_or_admin(owner_user_id));

create policy "Directory businesses admin delete"
on public.directory_businesses
for delete
using (public.is_directory_admin());

-- Category map
create policy "Directory map public read"
on public.directory_business_category_map
for select
using (true);

create policy "Directory map admin mutate"
on public.directory_business_category_map
for all
using (public.is_directory_admin())
with check (public.is_directory_admin());

-- Reviews
create policy "Directory reviews public read approved"
on public.directory_reviews
for select
using (status = 'approved' or public.is_directory_admin());

create policy "Directory reviews authenticated create own"
on public.directory_reviews
for insert
with check (auth.uid() is not null and user_id = auth.uid());

create policy "Directory reviews owner update own or admin"
on public.directory_reviews
for update
using (user_id = auth.uid() or public.is_directory_admin())
with check (user_id = auth.uid() or public.is_directory_admin());

create policy "Directory reviews owner delete own or admin"
on public.directory_reviews
for delete
using (user_id = auth.uid() or public.is_directory_admin());

-- Claims
create policy "Directory claims own read or admin"
on public.directory_business_claims
for select
using (claimant_user_id = auth.uid() or public.is_directory_admin());

create policy "Directory claims authenticated create own"
on public.directory_business_claims
for insert
with check (auth.uid() is not null and claimant_user_id = auth.uid());

create policy "Directory claims admin update"
on public.directory_business_claims
for update
using (public.is_directory_admin())
with check (public.is_directory_admin());

-- Moderation logs
create policy "Directory moderation logs admin read"
on public.directory_moderation_logs
for select
using (public.is_directory_admin());

create policy "Directory moderation logs admin write"
on public.directory_moderation_logs
for insert
with check (public.is_directory_admin());

create policy "Directory moderation logs admin update"
on public.directory_moderation_logs
for update
using (public.is_directory_admin())
with check (public.is_directory_admin());
