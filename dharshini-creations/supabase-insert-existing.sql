-- =====================================================
-- DHARSHINI CREATIONS - DATA INSERTION SCRIPT
-- Copy this ENTIRE script and paste in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/bgehwvbjtyadpqkrljby/sql/new
-- Then click RUN
-- =====================================================

-- First, let's make sure our UUIDs are clean so we don't duplicate
DELETE FROM reviews;
DELETE FROM product_gallery;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM faqs;

-- ── 1. CATEGORIES ──
INSERT INTO categories (id, name, slug, image, description, is_active) VALUES
('10000000-0000-0000-0000-000000000001', 'Fabric Painting', 'fabric-painting', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', 'Hand-painted designs on premium fabric with vibrant colors that last.', true),
('10000000-0000-0000-0000-000000000002', 'Embroidery Works', 'embroidery-works', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', 'Intricate hand-stitched embroidery with premium threads and artistry.', true),
('10000000-0000-0000-0000-000000000003', 'Combo Works', 'combo-works', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', 'The best of both worlds — fabric painting combined with embroidery artistry.', true);

-- ── 2. PRODUCTS ──
INSERT INTO products (id, category_id, name, slug, short_description, price, offer_price, thumbnail, is_active, is_featured, stock, rating) VALUES
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Kerchief Painting', 'kerchief-painting', 'Beautiful hand-painted design on premium cotton kerchief. Perfect as a gift or personal accessory.', 50, 50, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.5),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Simple T-shirt Painting', 'simple-tshirt-painting', 'A clean, hand-painted design on a quality cotton T-shirt. Great for everyday wear.', 199, 199, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.5),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Custom T-shirt Painting', 'custom-tshirt-painting', 'Fully customized hand-painted T-shirt with your choice of design. Made to order.', 350, 350, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', true, true, 100, 5.0),
('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Shirt Painting', 'shirt-painting', 'Premium hand-painted artwork on a formal or casual shirt. Vibrant colors that last.', 499, 499, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.8),
('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'Name Embroidery', 'name-embroidery', 'Elegant hand-stitched name embroidery with premium thread. Perfect for gifts.', 80, 80, 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.7),
('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', 'Small Floral Design', 'small-floral-design', 'Delicate hand-stitched floral embroidery. A beautiful addition to any garment.', 150, 150, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.6),
('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', 'Sleeve Embroidery', 'sleeve-embroidery', 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', 199, 199, 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.5),
('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 'Custom Embroidery', 'custom-embroidery', 'Fully customized embroidery work with your choice of design. Handcrafted with care.', 350, 350, 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', true, true, 100, 5.0),
('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000003', 'Paint + Embroidery T-shirt', 'paint-embroidery-tshirt', 'The best of both worlds — hand-painted artwork combined with embroidery detailing.', 499, 499, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', true, true, 100, 5.0),
('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000003', 'Paint + Embroidery Shirt', 'paint-embroidery-shirt', 'Premium shirt featuring both fabric painting and embroidery. A luxury statement piece.', 699, 699, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', true, false, 100, 4.9);

-- ── 3. PRODUCT GALLERY ──
INSERT INTO product_gallery (id, product_id, image_url) VALUES
('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80'),
('50000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80');

-- ── 4. REVIEWS ──
INSERT INTO reviews (id, title, rating, comment, likes, product_id) VALUES
('30000000-0000-0000-0000-000000000001', 'Priya Sharma', 5, 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.', 24, '20000000-0000-0000-0000-000000000005'),
('30000000-0000-0000-0000-000000000002', 'Rahul Kumar', 5, 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.', 18, '20000000-0000-0000-0000-000000000003'),
('30000000-0000-0000-0000-000000000003', 'Ananya Reddy', 4, 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!', 12, '20000000-0000-0000-0000-000000000004'),
('30000000-0000-0000-0000-000000000004', 'Vikash Patel', 5, 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!', 31, '20000000-0000-0000-0000-000000000009'),
('30000000-0000-0000-0000-000000000005', 'Meera Iyer', 5, 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality.', 27, '20000000-0000-0000-0000-000000000008'),
('30000000-0000-0000-0000-000000000006', 'Arjun Nair', 4, 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!', 15, '20000000-0000-0000-0000-000000000010');

-- ── 5. FAQs ──
INSERT INTO faqs (id, question, answer) VALUES
('40000000-0000-0000-0000-000000000001', 'How long does a custom order take?', 'Custom orders typically take 5-10 business days depending on the complexity of the design. Rush orders can be accommodated for an additional fee.'),
('40000000-0000-0000-0000-000000000002', 'What materials do you use?', 'We use premium quality threads (DMC & Anchor), fabric paints (Fevicryl Fabric Colors), and source the finest cotton and linen fabrics for our work.'),
('40000000-0000-0000-0000-000000000003', 'Can I provide my own design?', 'Absolutely! You can upload your own design through our AI Custom Builder or send it directly via WhatsApp. We will review it and provide a quote within 24 hours.'),
('40000000-0000-0000-0000-000000000004', 'Do you ship internationally?', 'Currently, we ship across India. International shipping is available on request — please contact us via WhatsApp for a custom shipping quote.'),
('40000000-0000-0000-0000-000000000005', 'What is your return policy?', 'Since each piece is handmade and custom-crafted, we do not accept returns. However, if there is a quality issue, we will work with you to make it right.'),
('40000000-0000-0000-0000-000000000006', 'Can I wash embroidered/painted clothes normally?', 'We recommend gentle hand washing or machine wash on delicate cycle with cold water. Turn the garment inside out. Avoid bleach and tumble drying.');

-- ── 6. ENSURE PUBLIC READ ACCESS ──
-- Just to make sure the app can read the data we just inserted
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public Read FAQs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public Read Product Gallery" ON product_gallery FOR SELECT USING (true);
