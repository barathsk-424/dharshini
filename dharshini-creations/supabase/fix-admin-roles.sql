-- ============================================================
-- Grant admin privilege to both admin accounts in Supabase
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Ensure dharshni@gmail.com has admin role in both tables
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'dharshni@gmail.com';

UPDATE public.customer_profiles 
SET role = 'admin' 
WHERE email = 'dharshni@gmail.com';

-- 2. Ensure dharshnifabric@gmail.com has admin role in both tables
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'dharshnifabric@gmail.com';

UPDATE public.customer_profiles 
SET role = 'admin' 
WHERE email = 'dharshnifabric@gmail.com';

-- 3. Verify the role update
SELECT email, role, status FROM public.users WHERE email IN ('dharshni@gmail.com', 'dharshnifabric@gmail.com')
UNION ALL
SELECT email, role, status FROM public.customer_profiles WHERE email IN ('dharshni@gmail.com', 'dharshnifabric@gmail.com');
