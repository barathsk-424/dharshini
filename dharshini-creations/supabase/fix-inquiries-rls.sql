-- ── Fix: Add missing RLS policies for inquiries table ──────────────────────
-- The table has INSERT allowed for all, but SELECT/UPDATE/DELETE were missing.
-- This prevents the Admin Dashboard from reading messages.

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated read inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated delete inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow public read inquiries" ON inquiries;

-- 1. Anyone (users) can submit a new message
CREATE POLICY "Allow public insert inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- 2. Authenticated users (admin) can read all messages
CREATE POLICY "Allow authenticated read inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

-- 3. Authenticated users (admin) can mark messages as resolved
CREATE POLICY "Allow authenticated update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 4. Authenticated users (admin) can delete messages
CREATE POLICY "Allow authenticated delete inquiries"
  ON inquiries FOR DELETE
  USING (auth.role() = 'authenticated');
