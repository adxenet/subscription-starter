-- Grant API access to directory tables so PostgREST can see them

grant usage on schema public to anon, authenticated;

grant select on public.directory_categories to anon, authenticated;
grant select on public.directory_businesses to anon, authenticated;
grant select on public.directory_business_category_map to anon, authenticated;
grant select on public.directory_reviews to anon, authenticated;

grant insert on public.directory_businesses to authenticated;
grant update on public.directory_businesses to authenticated;

grant insert on public.directory_reviews to authenticated;
grant update, delete on public.directory_reviews to authenticated;

grant insert on public.directory_business_claims to authenticated;
grant select on public.directory_business_claims to authenticated;

grant select on public.quote_requests to authenticated;
grant insert on public.quote_requests to anon, authenticated;

-- Reload PostgREST schema cache
notify pgrst, 'reload schema';
