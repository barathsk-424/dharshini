-- ============================================================
-- Comprehensive fix: Ensure all RLS policies exist for products
-- and handle foreign key constraints from product_images
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Step 1: Drop and recreate ALL product policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read products" ON products;
DROP POLICY IF EXISTS "Allow public insert products" ON products;
DROP POLICY IF EXISTS "Allow public update products" ON products;
DROP POLICY IF EXISTS "Allow public delete products" ON products;

CREATE POLICY "Allow public read products"   ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete products" ON products FOR DELETE USING (true);

-- Step 2: Fix product_images FK constraint (if the table exists)
-- This allows deleting products without manually deleting images first
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product_images') THEN
    -- Drop the old FK and re-add with ON DELETE CASCADE
    ALTER TABLE product_images DROP CONSTRAINT IF EXISTS product_images_product_id_fkey;
    ALTER TABLE product_images
      ADD CONSTRAINT product_images_product_id_fkey
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

    -- Also ensure product_images has open RLS policies
    ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public read product_images" ON product_images;
    DROP POLICY IF EXISTS "Allow public insert product_images" ON product_images;
    DROP POLICY IF EXISTS "Allow public update product_images" ON product_images;
    DROP POLICY IF EXISTS "Allow public delete product_images" ON product_images;
    CREATE POLICY "Allow public read product_images"   ON product_images FOR SELECT USING (true);
    CREATE POLICY "Allow public insert product_images" ON product_images FOR INSERT WITH CHECK (true);
    CREATE POLICY "Allow public update product_images" ON product_images FOR UPDATE USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public delete product_images" ON product_images FOR DELETE USING (true);
  END IF;
END $$;

-- Step 3: Also fix categories policies (needed for category updates/deletes)
DROP POLICY IF EXISTS "Allow public read categories" ON categories;
DROP POLICY IF EXISTS "Allow public insert categories" ON categories;
DROP POLICY IF EXISTS "Allow public update categories" ON categories;
DROP POLICY IF EXISTS "Allow public delete categories" ON categories;

CREATE POLICY "Allow public read categories"   ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update categories" ON categories FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete categories" ON categories FOR DELETE USING (true);

-- Step 4: Verify by listing all policies on products
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'products';
