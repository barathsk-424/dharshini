-- Create buckets (they will also appear in Storage UI)
INSERT INTO storage.buckets (id, name) VALUES ('product-images', 'product-images') ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name) VALUES ('customer-uploads', 'customer-uploads') ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name) VALUES ('instagram-feed', 'instagram-feed') ON CONFLICT DO NOTHING;

-- Product images: public read, admin insert (simplified: authenticated insert)
CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Auth upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Customer uploads (for custom orders): authenticated can upload own
CREATE POLICY "Auth manage own uploads" ON storage.objects FOR ALL USING (
  bucket_id = 'customer-uploads' AND auth.uid()::text = (storage.foldername(name))[1]
) WITH CHECK (
  bucket_id = 'customer-uploads' AND auth.uid()::text = (storage.foldername(name))[1]
);
