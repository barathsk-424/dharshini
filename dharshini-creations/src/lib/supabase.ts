import { createClient } from '@supabase/supabase-js'

// Public Supabase config — these are safe to include in frontend code.
// The anon key is a public key with row-level security enforced on the server.
// Sensitive operations use the service role key which is NEVER in frontend code.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://pzdulbzdolnrtyxnuxkp.supabase.co'

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHVsYnpkb2xucnR5eG51eGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjEyMjQsImV4cCI6MjA5NTQzNzIyNH0.PtllPqeRqTBjB7ktGiQWMhWmhUcQqZmDTH50y9Lv4KM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
