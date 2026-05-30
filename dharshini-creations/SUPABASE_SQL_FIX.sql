-- ============================================================
-- DHARSHINI CREATIONS — SUPABASE DATABASE FIX
-- Run this entire script in:
-- Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ── 1. Fix orders.user_id FK to reference auth.users ────────
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE public.orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- ── 2. Create wishlist table ─────────────────────────────────
DROP TABLE IF EXISTS public.wishlist CASCADE;
CREATE TABLE public.wishlist (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_own_wishlist" ON public.wishlist
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── 3. Fix inquiries RLS (allow anon contact form inserts) ───
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'inquiries'
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.inquiries'; END LOOP;
END $$;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert"  ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "auth_read"      ON public.inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_update"    ON public.inquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete"    ON public.inquiries FOR DELETE TO authenticated USING (true);

-- ── 4. Fix orders RLS ────────────────────────────────────────
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'orders'
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.orders'; END LOOP;
END $$;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_insert_orders"     ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth_select_own_orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "auth_update_own_orders" ON public.orders FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "service_all_orders"     ON public.orders FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ── 5. Fix customer_profiles RLS ─────────────────────────────
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'customer_profiles'
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.customer_profiles'; END LOOP;
END $$;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_insert_own_profile" ON public.customer_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "auth_select_own_profile" ON public.customer_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "auth_update_own_profile" ON public.customer_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "service_all_profiles"    ON public.customer_profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ── 6. Fix users RLS ─────────────────────────────────────────
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE tablename = 'users'
  LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.users'; END LOOP;
END $$;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_insert_own_user" ON public.users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "auth_select_own_user" ON public.users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "auth_update_own_user" ON public.users FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "service_all_users"    ON public.users FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ── 7. Auto-sync trigger: new auth user → users + customer_profiles ──
-- NOTE: Passwords are hashed by Supabase Auth and never available in plaintext.
-- The password column stores '[secured]' as a display placeholder only.
-- The actual authentication is handled entirely by Supabase Auth (auth.users).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, status, password, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    'Active',
    '[secured]',   -- placeholder; real password is hashed in auth.users
    NOW()
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.customer_profiles (id, name, email, role, status, password, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    'Active',
    '[secured]',   -- placeholder; real password is hashed in auth.users
    NOW()
  ) ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 8. Backfill all existing auth users into both tables ─────
INSERT INTO public.users (id, name, email, role, status, password, created_at)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)),
  email,
  COALESCE(raw_user_meta_data->>'role', 'user'),
  'Active',
  '[secured]',
  created_at
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  email    = EXCLUDED.email,
  name     = COALESCE(EXCLUDED.name, users.name),
  password = COALESCE(users.password, '[secured]');

INSERT INTO public.customer_profiles (id, name, email, role, status, password, created_at)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)),
  email,
  COALESCE(raw_user_meta_data->>'role', 'user'),
  'Active',
  '[secured]',
  created_at
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  email    = EXCLUDED.email,
  name     = COALESCE(EXCLUDED.name, customer_profiles.name),
  password = COALESCE(customer_profiles.password, '[secured]');

-- ── 9. Set primary admin account ────────────────────────────
-- dharshnifabric@gmail.com is the primary admin
UPDATE public.users SET role = 'admin' WHERE email = 'dharshnifabric@gmail.com';
UPDATE public.customer_profiles SET role = 'admin' WHERE email = 'dharshnifabric@gmail.com';
-- Demote old test admin accounts to regular users
UPDATE public.users SET role = 'user' WHERE email ILIKE 'dharshini@dharshini%';
UPDATE public.customer_profiles SET role = 'user' WHERE email ILIKE 'dharshini@dharshini%';

-- ── Verify ────────────────────────────────────────────────────
SELECT 'users' AS tbl, count(*) FROM public.users
UNION ALL SELECT 'customer_profiles', count(*) FROM public.customer_profiles
UNION ALL SELECT 'orders', count(*) FROM public.orders
UNION ALL SELECT 'inquiries', count(*) FROM public.inquiries
UNION ALL SELECT 'wishlist', count(*) FROM public.wishlist;
