import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_PUBLIC_KEY, SUPABASE_PUBLIC_URL } from '../config/supabasePublic';

const url =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined) ||
  SUPABASE_PUBLIC_URL;

const anon =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  SUPABASE_PUBLIC_KEY;

let cached: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anon) return null;
  if (!cached) cached = createClient(url, anon);
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anon);
}
