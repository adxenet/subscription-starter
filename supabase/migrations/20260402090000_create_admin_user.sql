-- Admin user is created via the Supabase Auth Admin API (not direct SQL insert).
-- Credentials are managed outside of version control.
-- After creating the user via the API, promote them with:
--   SELECT public.promote_to_admin('their-email@example.com');

-- Convenience function to promote any user to admin by email
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users
  SET role = 'admin'
  WHERE id = (
    SELECT id FROM auth.users WHERE email = user_email LIMIT 1
  );
END;
$$;

NOTIFY pgrst, 'reload schema';
