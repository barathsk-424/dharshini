-- ============================================================
-- Fix the products primary key sequence
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Reset the products sequence to the current maximum ID
-- This fixes: "duplicate key value violates unique constraint products_pkey"
SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products));

-- Also fix sequences for all other tables that may have the same issue
SELECT setval('categories_id_seq',    (SELECT COALESCE(MAX(id), 0) FROM categories));
SELECT setval('reviews_id_seq',       (SELECT COALESCE(MAX(id), 0) FROM reviews));
SELECT setval('gallery_images_id_seq',(SELECT COALESCE(MAX(id), 0) FROM gallery_images));
SELECT setval('inquiries_id_seq',     (SELECT COALESCE(MAX(id), 0) FROM inquiries));
