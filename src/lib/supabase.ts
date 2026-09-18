/**
 * Shared Supabase client for the marketing site.
 *
 * This is a fully static Astro build — no adapter, no Cloudflare
 * Worker, no build-time secret injection. The anon key is a public,
 * publishable credential by design (it already ships inside the iOS
 * binary), so it is committed here rather than routed through an env
 * var that would just add a silent-undefined failure mode with no
 * build step to catch it.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ifineefgoootzplzqlsa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmaW5lZWZnb29vdHpwbHpxbHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDM2NDksImV4cCI6MjA4NzI3OTY0OX0.nNWJMEz8uXw6ORJkyH3Y5iPJ1YOT3UhExDrZYEhQ2-w";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { detectSessionInUrl: false, persistSession: false, autoRefreshToken: false },
});
