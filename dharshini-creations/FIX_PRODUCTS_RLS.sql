-- ============================================================
-- DHARSHINI CREATIONS — FIX PRODUCTS RLS
-- Run this script in your Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable RLS on the products table (just in case)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 1. Ensure public users can read products
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'products' AND policyname = 'Allow public read products'
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.products'; END LOOP;
END $$;

CREATE POLICY "Allow public read products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- 2. Allow admin users to insert, update, and delete products
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'products' AND policyname IN ('Admin insert products', 'Admin update products', 'Admin delete products', 'Admin all products')
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.products'; END LOOP;
END $$;

-- Single policy for ALL operations for admins
CREATE POLICY "Admin all products" 
  ON public.products 
  FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Also add a policy for service role (optional but good practice)
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'products' AND policyname = 'Service role all products'
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.products'; END LOOP;
END $$;

CREATE POLICY "Service role all products" 
  ON public.products 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);
