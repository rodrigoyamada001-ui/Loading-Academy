import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabaseEnv } from "@/lib/env";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

export async function createClient() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase is not configured. Copy .env.example to .env.local and fill the Supabase values.");
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server components cannot always set cookies; middleware refreshes sessions.
          }
        }
      }
    }
  );
}
