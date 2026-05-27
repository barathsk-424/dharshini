-- Insert Categories
INSERT INTO categories (id, name, slug, image_url, starting_price) VALUES
(1, 'Fabric Painting', 'fabric-painting', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', 50),
(2, 'Embroidery Works', 'embroidery-works', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', 80),
(3, 'Combo Works', 'combo-works', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', 499)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, image_url = EXCLUDED.image_url, starting_price = EXCLUDED.starting_price;

-- Reset sequence for categories
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- Insert Products
INSERT INTO products (id, category_id, name, description, base_price, tags, is_customizable) VALUES
(1, 1, 'Kerchief Painting', 'Beautiful hand-painted design on premium cotton kerchief. Perfect as a gift or personal accessory.', 50, '{"fabric-painting"}', false),
(2, 1, 'Simple T-shirt Painting', 'A clean, hand-painted design on a quality cotton T-shirt. Great for everyday wear with a creative touch.', 199, '{"fabric-painting"}', false),
(3, 1, 'Custom T-shirt Painting', 'Fully customized hand-painted T-shirt with your choice of design, character, or artwork. Made to order.', 350, '{"fabric-painting", "trending"}', true),
(4, 1, 'Shirt Painting', 'Premium hand-painted artwork on a formal or casual shirt. Vibrant colors that last through washes.', 499, '{"fabric-painting"}', true),
(5, 2, 'Name Embroidery', 'Elegant hand-stitched name embroidery with premium thread. Perfect for personalized gifts.', 80, '{"embroidery"}', true),
(6, 2, 'Small Floral Design', 'Delicate hand-stitched floral embroidery pattern. A subtle and beautiful addition to any garment.', 150, '{"embroidery", "floral"}', false),
(7, 2, 'Sleeve Embroidery', 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', 199, '{"embroidery"}', true),
(8, 2, 'Custom Embroidery', 'Fully customized embroidery work with your choice of design, pattern, or motif. Handcrafted with care.', 350, '{"embroidery", "trending"}', true),
(9, 3, 'Paint + Embroidery T-shirt', 'The best of both worlds — a T-shirt with hand-painted artwork combined with embroidery detailing.', 499, '{"combo", "trending"}', true),
(10, 3, 'Paint + Embroidery Shirt', 'Premium shirt featuring both fabric painting and embroidery. A luxury handcrafted statement piece.', 699, '{"combo"}', true)
ON CONFLICT (id) DO UPDATE SET category_id = EXCLUDED.category_id, name = EXCLUDED.name, description = EXCLUDED.description, base_price = EXCLUDED.base_price, tags = EXCLUDED.tags, is_customizable = EXCLUDED.is_customizable;

-- Reset sequence for products
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));

-- Insert Product Images
INSERT INTO product_images (product_id, url) VALUES
(1, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
(2, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80'),
(3, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'),
(4, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'),
(5, 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80'),
(6, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'),
(7, 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80'),
(8, 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80'),
(9, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80'),
(10, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80');

-- Insert Instagram Cache
INSERT INTO instagram_cache (post_id, media_url, caption, permalink) VALUES
('ig1', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', 'New floral embroidery collection dropping soon! 🌸✨ #DharshiniCreations', 'https://instagram.com'),
('ig2', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', 'Behind the scenes — hand-painting this gorgeous tee 🎨 #HandmadeWithLove', 'https://instagram.com'),
('ig3', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', 'Customer order ready! Every stitch tells a story 🪡 #EmbroideryArt', 'https://instagram.com'),
('ig4', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', 'Festival collection is HERE 🎉 Limited pieces available! #FestivalFashion', 'https://instagram.com'),
('ig5', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', 'Custom anime tee for a happy customer! 🎌 #AnimeFashion #CustomArt', 'https://instagram.com'),
('ig6', 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', 'The magic of needle and thread ✨ #Handcrafted #PremiumQuality', 'https://instagram.com')
ON CONFLICT (post_id) DO NOTHING;
