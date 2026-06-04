import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client.
 * Call this inside "use client" components.
 * Creates a new client per call — wrap in useMemo if performance matters.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
