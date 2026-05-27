-- =====================================================
-- DHARSHINI CREATIONS - COMPLETE DATABASE RESET
-- Copy this ENTIRE script and paste in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/bgehwvbjtyadpqkrljby/sql/new
-- Then click RUN
-- =====================================================

-- ── STEP 1: DROP ALL EXISTING TABLES ──
DROP TABLE IF EXISTS product_tags CASCADE;
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS product_gallery CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS shipments CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS banners CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS instagram_cache CASCADE;
DROP TABLE IF EXISTS instagram_posts CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS login_history CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS pricing_rules CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;

-- ── STEP 2: CREATE OPTIMIZED TABLES ──

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  starting_price NUMERIC DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC NOT NULL,
  image TEXT,
  tags TEXT[] DEFAULT '{}',
  is_customizable BOOLEAN DEFAULT false,
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews (public, no auth needed)
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  avatar TEXT,
  review_date DATE DEFAULT CURRENT_DATE,
  has_video BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE gallery_images (
  id SERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  category TEXT,
  title TEXT,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instagram Posts
CREATE TABLE instagram_posts (
  id TEXT PRIMARY KEY,
  media_url TEXT NOT NULL,
  caption TEXT,
  permalink TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Inquiries
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── STEP 3: ENABLE RLS + PUBLIC READ POLICIES ──

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public read access for all display tables
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read instagram" ON instagram_posts FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);

-- Allow anyone to submit an inquiry
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read inquiries" ON inquiries FOR SELECT USING (true);

-- ── STEP 4: INSERT ALL WEBSITE DATA ──

-- Categories
INSERT INTO categories (id, name, slug, image, starting_price, description) VALUES
(1, 'Fabric Painting', 'fabric-painting', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', 50, 'Hand-painted designs on premium fabric with vibrant colors that last.'),
(2, 'Embroidery Works', 'embroidery-works', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', 80, 'Intricate hand-stitched embroidery with premium threads and artistry.'),
(3, 'Combo Works', 'combo-works', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', 499, 'The best of both worlds — fabric painting combined with embroidery artistry.');

SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- Products
INSERT INTO products (id, category_id, name, description, base_price, image, tags, is_customizable, colors, sizes) VALUES
(1, 1, 'Kerchief Painting', 'Beautiful hand-painted design on premium cotton kerchief. Perfect as a gift or personal accessory.', 50, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', '{"fabric-painting"}', false, '{"White","Cream"}', '{"Free Size"}'),
(2, 1, 'Simple T-shirt Painting', 'A clean, hand-painted design on a quality cotton T-shirt. Great for everyday wear with a creative touch.', 199, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', '{"fabric-painting"}', false, '{"White","Black","Pastel Pink"}', '{"S","M","L","XL"}'),
(3, 1, 'Custom T-shirt Painting', 'Fully customized hand-painted T-shirt with your choice of design, character, or artwork. Made to order.', 350, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', '{"fabric-painting","trending"}', true, '{"White","Black","Navy"}', '{"S","M","L","XL"}'),
(4, 1, 'Shirt Painting', 'Premium hand-painted artwork on a formal or casual shirt. Vibrant colors that last through washes.', 499, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', '{"fabric-painting"}', true, '{"White","Sky Blue","Cream"}', '{"S","M","L","XL"}'),
(5, 2, 'Name Embroidery', 'Elegant hand-stitched name embroidery with premium thread. Perfect for personalized gifts.', 80, 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', '{"embroidery"}', true, '{"White","Black","Cream"}', '{"Free Size"}'),
(6, 2, 'Small Floral Design', 'Delicate hand-stitched floral embroidery pattern. A subtle and beautiful addition to any garment.', 150, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', '{"embroidery","floral"}', false, '{"White","Cream","Pastel Pink"}', '{"Free Size"}'),
(7, 2, 'Sleeve Embroidery', 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', 199, 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', '{"embroidery"}', true, '{"Black","White","Maroon"}', '{"S","M","L","XL"}'),
(8, 2, 'Custom Embroidery', 'Fully customized embroidery work with your choice of design, pattern, or motif. Handcrafted with care.', 350, 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', '{"embroidery","trending"}', true, '{"White","Black","Red","Maroon"}', '{"S","M","L","XL"}'),
(9, 3, 'Paint + Embroidery T-shirt', 'The best of both worlds — a T-shirt with hand-painted artwork combined with embroidery detailing.', 499, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', '{"combo","trending"}', true, '{"White","Black"}', '{"S","M","L","XL"}'),
(10, 3, 'Paint + Embroidery Shirt', 'Premium shirt featuring both fabric painting and embroidery. A luxury handcrafted statement piece.', 699, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', '{"combo"}', true, '{"White","Ivory","Cream"}', '{"S","M","L","XL","XXL"}');

SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));

-- Reviews
INSERT INTO reviews (id, name, rating, comment, avatar, review_date, has_video) VALUES
(1, 'Priya Sharma', 5, 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', '2024-12-15', false),
(2, 'Rahul Kumar', 5, 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', '2025-01-20', true),
(3, 'Ananya Reddy', 4, 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80', '2025-02-08', false),
(4, 'Vikash Patel', 5, 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', '2025-03-01', false),
(5, 'Meera Iyer', 5, 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality and craftsmanship.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', '2025-03-15', true),
(6, 'Arjun Nair', 4, 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!', 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=150&h=150&q=80', '2025-04-02', false);

SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));

-- Gallery Images
INSERT INTO gallery_images (id, src, category, title, likes) VALUES
(1, 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', 'embroidery', 'Royal Floral Embroidery', 234),
(2, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', 'fabric-painting', 'Sunset Paradise Tee', 187),
(3, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', 'combo', 'Wedding Special Combo', 312),
(4, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', 'embroidery', 'Name Art Collection', 156),
(5, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', 'fabric-painting', 'Anime Character Art', 445),
(6, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', 'customer', 'Customer Creation', 98),
(7, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', 'combo', 'Festival Special', 267),
(8, 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', 'embroidery', 'Sleeve Detail Work', 189),
(9, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', 'fabric-painting', 'Butterfly Collection', 334),
(10, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', 'customer', 'Happy Customer', 121),
(11, 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', 'embroidery', 'Mirror Work Design', 278),
(12, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', 'combo', 'Couple Set', 399);

SELECT setval('gallery_images_id_seq', (SELECT MAX(id) FROM gallery_images));

-- Instagram Posts
INSERT INTO instagram_posts (id, media_url, caption, permalink) VALUES
('ig1', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', 'New floral embroidery collection dropping soon! 🌸✨ #DharshiniCreations', 'https://instagram.com'),
('ig2', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', 'Behind the scenes — hand-painting this gorgeous tee 🎨 #HandmadeWithLove', 'https://instagram.com'),
('ig3', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', 'Customer order ready! Every stitch tells a story 🪡 #EmbroideryArt', 'https://instagram.com'),
('ig4', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', 'Festival collection is HERE 🎉 Limited pieces available! #FestivalFashion', 'https://instagram.com'),
('ig5', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', 'Custom anime tee for a happy customer! 🎌 #AnimeFashion #CustomArt', 'https://instagram.com'),
('ig6', 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', 'The magic of needle and thread ✨ #Handcrafted #PremiumQuality', 'https://instagram.com');

-- FAQs
INSERT INTO faqs (id, question, answer) VALUES
(1, 'How long does a custom order take?', 'Custom orders typically take 5-10 business days depending on the complexity of the design. Rush orders can be accommodated for an additional fee.'),
(2, 'What materials do you use?', 'We use premium quality threads (DMC & Anchor), fabric paints (Fevicryl Fabric Colors), and source the finest cotton and linen fabrics for our work.'),
(3, 'Can I provide my own design?', 'Absolutely! You can upload your own design through our AI Custom Builder or send it directly via WhatsApp. We will review it and provide a quote within 24 hours.'),
(4, 'Do you ship internationally?', 'Currently, we ship across India. International shipping is available on request — please contact us via WhatsApp for a custom shipping quote.'),
(5, 'What is your return policy?', 'Since each piece is handmade and custom-crafted, we do not accept returns. However, if there is a quality issue, we will work with you to make it right.'),
(6, 'Can I wash embroidered/painted clothes normally?', 'We recommend gentle hand washing or machine wash on delicate cycle with cold water. Turn the garment inside out. Avoid bleach and tumble drying.');

SELECT setval('faqs_id_seq', (SELECT MAX(id) FROM faqs));

-- ── DONE! ──
-- All tables created and data inserted successfully.
