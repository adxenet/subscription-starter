-- Ensure anon/authenticated can read the new logo_url column
grant select on public.directory_businesses to anon, authenticated;

-- Force PostgREST schema cache reload
notify pgrst, 'reload schema';
