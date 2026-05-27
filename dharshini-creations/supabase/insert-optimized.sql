-- Insert Categories
INSERT INTO categories (id, name, slug, image, starting_price, description) VALUES
(1, 'Fabric Painting', 'fabric-painting', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', 50, 'Hand-painted designs on premium fabric with vibrant colors that last.'),
(2, 'Embroidery Works', 'embroidery-works', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', 80, 'Intricate hand-stitched embroidery with premium threads and artistry.'),
(3, 'Combo Works', 'combo-works', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', 499, 'The best of both worlds — fabric painting combined with embroidery artistry.')
ON CONFLICT (slug) DO NOTHING;

SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- Insert Products
INSERT INTO products (id, category_id, name, description, base_price, tags, is_customizable, image, colors, sizes) VALUES
(1, 1, 'Kerchief Painting', 'Beautiful hand-painted design on premium cotton kerchief. Perfect as a gift or personal accessory.', 50, '{"fabric-painting"}', false, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', '{"White","Cream"}', '{"Free Size"}'),
(2, 1, 'Simple T-shirt Painting', 'A clean, hand-painted design on a quality cotton T-shirt. Great for everyday wear with a creative touch.', 199, '{"fabric-painting"}', false, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', '{"White","Black","Pastel Pink"}', '{"S","M","L","XL"}'),
(3, 1, 'Custom T-shirt Painting', 'Fully customized hand-painted T-shirt with your choice of design, character, or artwork. Made to order.', 350, '{"fabric-painting","trending"}', true, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', '{"White","Black","Navy"}', '{"S","M","L","XL"}'),
(4, 1, 'Shirt Painting', 'Premium hand-painted artwork on a formal or casual shirt. Vibrant colors that last through washes.', 499, '{"fabric-painting"}', true, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', '{"White","Sky Blue","Cream"}', '{"S","M","L","XL"}'),
(5, 2, 'Name Embroidery', 'Elegant hand-stitched name embroidery with premium thread. Perfect for personalized gifts.', 80, '{"embroidery"}', true, 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', '{"White","Black","Cream"}', '{"Free Size"}'),
(6, 2, 'Small Floral Design', 'Delicate hand-stitched floral embroidery pattern. A subtle and beautiful addition to any garment.', 150, '{"embroidery","floral"}', false, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', '{"White","Cream","Pastel Pink"}', '{"Free Size"}'),
(7, 2, 'Sleeve Embroidery', 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', 199, '{"embroidery"}', true, 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', '{"Black","White","Maroon"}', '{"S","M","L","XL"}'),
(8, 2, 'Custom Embroidery', 'Fully customized embroidery work with your choice of design, pattern, or motif. Handcrafted with care.', 350, '{"embroidery","trending"}', true, 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', '{"White","Black","Red","Maroon"}', '{"S","M","L","XL"}'),
(9, 3, 'Paint + Embroidery T-shirt', 'The best of both worlds — a T-shirt with hand-painted artwork combined with embroidery detailing.', 499, '{"combo","trending"}', true, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', '{"White","Black"}', '{"S","M","L","XL"}'),
(10, 3, 'Paint + Embroidery Shirt', 'Premium shirt featuring both fabric painting and embroidery. A luxury handcrafted statement piece.', 699, '{"combo"}', true, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', '{"White","Ivory","Cream"}', '{"S","M","L","XL","XXL"}');

SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));

-- Insert Reviews
INSERT INTO reviews (id, name, rating, comment, avatar, date, has_video) VALUES
(1, 'Priya Sharma', 5, 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', '2024-12-15', false),
(2, 'Rahul Kumar', 5, 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', '2025-01-20', true),
(3, 'Ananya Reddy', 4, 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80', '2025-02-08', false),
(4, 'Vikash Patel', 5, 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', '2025-03-01', false),
(5, 'Meera Iyer', 5, 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality and craftsmanship.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', '2025-03-15', true),
(6, 'Arjun Nair', 4, 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!', 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=150&h=150&q=80', '2025-04-02', false);

SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));

-- Insert Gallery Images
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

-- Insert Instagram Posts
INSERT INTO instagram_posts (id, media_url, caption, permalink) VALUES
('ig1', 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', 'New floral embroidery collection dropping soon! 🌸✨ #DharshiniCreations', 'https://instagram.com'),
('ig2', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', 'Behind the scenes — hand-painting this gorgeous tee 🎨 #HandmadeWithLove', 'https://instagram.com'),
('ig3', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', 'Customer order ready! Every stitch tells a story 🪡 #EmbroideryArt', 'https://instagram.com'),
('ig4', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', 'Festival collection is HERE 🎉 Limited pieces available! #FestivalFashion', 'https://instagram.com'),
('ig5', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', 'Custom anime tee for a happy customer! 🎌 #AnimeFashion #CustomArt', 'https://instagram.com'),
('ig6', 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', 'The magic of needle and thread ✨ #Handcrafted #PremiumQuality', 'https://instagram.com');
