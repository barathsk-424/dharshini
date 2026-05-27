import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgehwvbjtyadpqkrljby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWh3dmJqdHlhZHBxa3JsamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU2ODcsImV4cCI6MjA5NTM3MTY4N30.0cwbFoU8Vfu9-9exVVjIMJkoV9Iwe8lfBJqqnBUhX-Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tables = [
  'admins', 'banners', 'blogs', 'brands', 'cart', 'categories',
  'contact_messages', 'coupons', 'faqs', 'login_history',
  'newsletter_subscribers', 'notifications', 'order_items', 'orders',
  'payments', 'product_gallery', 'product_variants', 'product_tags',
  'products', 'profiles', 'reviews', 'wishlist', 'inquiries',
  'instagram_cache', 'shipments', 'pricing_rules', 'product_images',
  'gallery_images', 'instagram_posts'
];

async function inspect() {
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
    } else {
      const cols = data.length > 0 ? Object.keys(data[0]).join(', ') : '(empty - columns unknown)';
      console.log(`✅ ${table}: ${data.length} rows sample | Columns: ${cols}`);
    }
  }
}

inspect();
