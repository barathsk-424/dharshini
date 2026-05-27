-- Drop existing tables to start from scratch
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS instagram_posts CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Categories Table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  starting_price NUMERIC,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_customizable BOOLEAN DEFAULT false,
  image TEXT,
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  avatar TEXT,
  date DATE DEFAULT CURRENT_DATE,
  has_video BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE gallery_images (
  id SERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  category TEXT,
  title TEXT,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instagram Posts Table
CREATE TABLE instagram_posts (
  id TEXT PRIMARY KEY,
  media_url TEXT NOT NULL,
  caption TEXT,
  permalink TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Enable RLS and setup open policies since we rely on Anon Key for fetching
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read instagram" ON instagram_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
