-- ============================================================
-- Fix Orders Table RLS Policies to allow Admin Access
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Step 1: Drop all existing policies on public.orders to avoid duplicate conflicts
DO $$ 
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'orders' AND schemaname = 'public'
  LOOP 
    EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.orders'; 
  END LOOP;
END $$;

-- Step 2: Ensure Row Level Security is enabled on public.orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies for regular customers (can only see/manage their own orders)
CREATE POLICY "auth_insert_own_orders" 
  ON public.orders FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "auth_select_own_orders" 
  ON public.orders FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "auth_update_own_orders" 
  ON public.orders FOR UPDATE TO authenticated 
  USING (auth.uid() = user_id);

-- Step 4: Create policies for Administrators (role = 'admin') to see and manage ALL orders
-- This checks if the authenticated user has 'admin' role in the public.users table
CREATE POLICY "admin_select_all_orders" 
  ON public.orders FOR SELECT TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "admin_update_all_orders" 
  ON public.orders FOR UPDATE TO authenticated 
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

CREATE POLICY "admin_delete_all_orders" 
  ON public.orders FOR DELETE TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Step 5: Create service role policy (complete system bypass)
CREATE POLICY "service_all_orders" 
  ON public.orders FOR ALL TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Step 6: Verify all policies on the orders table
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'orders';
