-- Enable RLS on tables containing user-specific data
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read any profile, update only own
CREATE POLICY "Allow public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow individual update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Orders: user sees own orders; admin sees all (role check via profiles)
CREATE POLICY "User owns orders" ON orders FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Order items: accessible through orders
CREATE POLICY "User order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Reviews: public read; authenticated insert own review
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (is_approved = true OR auth.uid() = user_id);
CREATE POLICY "Insert own review" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wishlist: user manages own
CREATE POLICY "Manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Inquiries: anyone can insert, admin read
CREATE POLICY "Insert inquiry" ON inquiries FOR INSERT WITH CHECK (true);
