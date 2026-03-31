import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    // Pass Supabase URL and anonymous key from the environment to the client
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
