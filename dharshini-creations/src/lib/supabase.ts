import { createClient } from '@supabase/supabase-js'

// These are baked in at build time by Vite (import.meta.env)
// Fallback values ensure the app doesn't crash if env vars are missing
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://pzdulbzdolnrtyxnuxkp.supabase.co'

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHVsYnpkb2xucnR5eG51eGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjEyMjQsImV4cCI6MjA5NTQzNzIyNH0.PtllPqeRqTBjB7ktGiQWMhWmhUcQqZmDTH50y9Lv4KM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
