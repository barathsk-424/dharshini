import { createClient } from '@supabase/supabase-js'

// Values are injected at build time by Vite from .env
// For local dev: create a .env file (see .env.example)
// For CI/CD: set these as GitHub Actions secrets
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Missing environment variables.\n' +
    'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.\n' +
    'See .env.example for the required format.'
  )
}

export const supabase = createClient(
  supabaseUrl  || '',
  supabaseAnonKey || ''
)
