import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL     = 'https://pzdulbzdolnrtyxnuxkp.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHVsYnpkb2xucnR5eG51eGtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg2MTIyNCwiZXhwIjoyMDk1NDM3MjI0fQ.PmFFMG6IsjTDeQGfljUU3mROSfXDYaQAl48Eac-4Zy4';
const ANON_KEY         = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHVsYnpkb2xucnR5eG51eGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjEyMjQsImV4cCI6MjA5NTQzNzIyNH0.PtllPqeRqTBjB7ktGiQWMhWmhUcQqZmDTH50y9Lv4KM';

const sb   = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const anon = createClient(SUPABASE_URL, ANON_KEY);

// 1. Check customer_profiles for admin
console.log('=== customer_profiles (service role) ===');
const { data: allProfiles } = await sb.from('customer_profiles').select('id, email, role, status');
allProfiles?.forEach(p => console.log(' -', p.email, '| role:', p.role));

// 2. Login as admin and test profile read
console.log('\n=== Login as dharshnifabric@gmail.com ===');
const { data: loginData, error: loginErr } = await anon.auth.signInWithPassword({
  email: 'dharshnifabric@gmail.com',
  password: 'dharshni@12092007'
});
if (loginErr) { console.error('Login FAILED:', loginErr.message); process.exit(1); }
console.log('Login OK, user id:', loginData.user.id);

// 3. Test profile read with authenticated client
console.log('\n=== Profile read (authenticated) ===');
const { data: profile, error: profileErr } = await anon
  .from('customer_profiles')
  .select('id, email, role, status')
  .eq('id', loginData.user.id)
  .maybeSingle();
if (profileErr) console.log('READ ERROR:', profileErr.message, '| code:', profileErr.code);
else console.log('Profile:', profile?.email, '| role:', profile?.role);

// 4. Check RLS policies on customer_profiles
console.log('\n=== RLS policies on customer_profiles ===');
const { data: policies } = await sb
  .from('pg_policies')
  .select('policyname, cmd, roles, qual')
  .eq('tablename', 'customer_profiles');
policies?.forEach(p => console.log(' -', p.policyname, '| cmd:', p.cmd, '| roles:', p.roles));

await anon.auth.signOut();
