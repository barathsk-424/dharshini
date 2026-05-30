-- ============================================================
-- Fix Product Deletion foreign key constraints
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- This script ensures that deleting a product does not fail due to foreign key violations.
-- It configures child tables to either cascade deletion or set their reference to NULL.

DO $$
BEGIN
  -- 1. product_images table
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_images') THEN
    ALTER TABLE public.product_images DROP CONSTRAINT IF EXISTS product_images_product_id_fkey;
    ALTER TABLE public.product_images 
      ADD CONSTRAINT product_images_product_id_fkey 
      FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
  END IF;

  -- 2. order_items table
  -- We set product_id to NULL when the product is deleted so that order history is preserved.
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_items') THEN
    ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
    ALTER TABLE public.order_items 
      ADD CONSTRAINT order_items_product_id_fkey 
      FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;
  END IF;

  -- 3. reviews table
  -- Reviews can be deleted when the product they review is deleted.
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'reviews') THEN
    ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_product_id_fkey;
    ALTER TABLE public.reviews 
      ADD CONSTRAINT reviews_product_id_fkey 
      FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
  END IF;

  -- 4. wishlist table
  -- Wishlist items are deleted when the product is deleted.
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wishlist') THEN
    ALTER TABLE public.wishlist DROP CONSTRAINT IF EXISTS wishlist_product_id_fkey;
    ALTER TABLE public.wishlist 
      ADD CONSTRAINT wishlist_product_id_fkey 
      FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
  END IF;

END $$;
