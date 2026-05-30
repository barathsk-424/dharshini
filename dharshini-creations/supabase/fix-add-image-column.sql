-- ============================================================
-- Add the missing 'image' column to the products table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Step 1: Add the image column to products (safe — does nothing if it already exists)
ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT;

-- Step 2: Migrate any existing images from product_images table (if it exists)
-- This copies the primary (or first) image URL into the new column
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product_images') THEN
    UPDATE products p
    SET image = (
      SELECT pi.url
      FROM product_images pi
      WHERE pi.product_id = p.id
      ORDER BY pi.is_primary DESC NULLS LAST, pi.id ASC
      LIMIT 1
    )
    WHERE p.image IS NULL;
  END IF;
END $$;

-- Step 3: Verify — show all products with their image values
SELECT id, name, image FROM products ORDER BY id;
