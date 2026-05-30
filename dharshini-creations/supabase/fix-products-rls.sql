-- ============================================================
-- Fix RLS policies for products, categories, and related tables
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ── PRODUCTS: Allow all operations ──────────────────────────
-- The existing schema only has a SELECT policy. We need INSERT,
-- UPDATE, and DELETE policies so the admin can manage products.

CREATE POLICY "Allow public insert products"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update products"
  ON products FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete products"
  ON products FOR DELETE
  USING (true);

-- ── CATEGORIES: Allow all operations ────────────────────────
-- Same issue — only SELECT exists.

CREATE POLICY "Allow public insert categories"
  ON categories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update categories"
  ON categories FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete categories"
  ON categories FOR DELETE
  USING (true);

-- ── REVIEWS: Allow all operations ───────────────────────────

CREATE POLICY "Allow public insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update reviews"
  ON reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete reviews"
  ON reviews FOR DELETE
  USING (true);

-- ── GALLERY IMAGES: Allow all operations ────────────────────

CREATE POLICY "Allow public insert gallery"
  ON gallery_images FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update gallery"
  ON gallery_images FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete gallery"
  ON gallery_images FOR DELETE
  USING (true);

-- ── INSTAGRAM POSTS: Allow all operations ───────────────────

CREATE POLICY "Allow public insert instagram"
  ON instagram_posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update instagram"
  ON instagram_posts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete instagram"
  ON instagram_posts FOR DELETE
  USING (true);

-- ── INQUIRIES: Ensure full CRUD (insert already exists) ─────

-- Update + Delete policies for inquiries (admin needs to manage them)
CREATE POLICY "Allow public read inquiries"
  ON inquiries FOR SELECT
  USING (true);

CREATE POLICY "Allow public update inquiries"
  ON inquiries FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete inquiries"
  ON inquiries FOR DELETE
  USING (true);
