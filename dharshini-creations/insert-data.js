import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgehwvbjtyadpqkrljby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWh3dmJqdHlhZHBxa3JsamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU2ODcsImV4cCI6MjA5NTM3MTY4N30.0cwbFoU8Vfu9-9exVVjIMJkoV9Iwe8lfBJqqnBUhX-Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertData() {
  console.log('Inserting categories...');
  const { error: catError } = await supabase.from('categories').upsert([
    { id: 1, name: 'Fabric Painting', slug: 'fabric-painting', image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', starting_price: 50 },
    { id: 2, name: 'Embroidery Works', slug: 'embroidery-works', image_url: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', starting_price: 80 },
    { id: 3, name: 'Combo Works', slug: 'combo-works', image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', starting_price: 499 }
  ]);
  if (catError) console.error('Categories error:', catError);
  else console.log('Categories inserted!');

  console.log('Inserting products...');
  const { error: prodError } = await supabase.from('products').upsert([
    { id: 1, category_id: 1, name: 'Kerchief Painting', description: 'Beautiful hand-painted design on premium cotton kerchief.', base_price: 50, tags: ['fabric-painting'], is_customizable: false },
    { id: 2, category_id: 1, name: 'Simple T-shirt Painting', description: 'A clean, hand-painted design on a quality cotton T-shirt.', base_price: 199, tags: ['fabric-painting'], is_customizable: false },
    { id: 3, category_id: 1, name: 'Custom T-shirt Painting', description: 'Fully customized hand-painted T-shirt.', base_price: 350, tags: ['fabric-painting', 'trending'], is_customizable: true },
    { id: 4, category_id: 1, name: 'Shirt Painting', description: 'Premium hand-painted artwork on a formal or casual shirt.', base_price: 499, tags: ['fabric-painting'], is_customizable: true },
    { id: 5, category_id: 2, name: 'Name Embroidery', description: 'Elegant hand-stitched name embroidery.', base_price: 80, tags: ['embroidery'], is_customizable: true },
    { id: 6, category_id: 2, name: 'Small Floral Design', description: 'Delicate hand-stitched floral embroidery pattern.', base_price: 150, tags: ['embroidery', 'floral'], is_customizable: false },
    { id: 7, category_id: 2, name: 'Sleeve Embroidery', description: 'Intricate hand-stitched embroidery on sleeves.', base_price: 199, tags: ['embroidery'], is_customizable: true },
    { id: 8, category_id: 2, name: 'Custom Embroidery', description: 'Fully customized embroidery work.', base_price: 350, tags: ['embroidery', 'trending'], is_customizable: true },
    { id: 9, category_id: 3, name: 'Paint + Embroidery T-shirt', description: 'T-shirt with hand-painted artwork combined with embroidery detailing.', base_price: 499, tags: ['combo', 'trending'], is_customizable: true },
    { id: 10, category_id: 3, name: 'Paint + Embroidery Shirt', description: 'Premium shirt featuring both fabric painting and embroidery.', base_price: 699, tags: ['combo'], is_customizable: true }
  ]);
  if (prodError) console.error('Products error:', prodError);
  else console.log('Products inserted!');

  console.log('Inserting product images...');
  const { error: imgError } = await supabase.from('product_images').insert([
    { product_id: 1, url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
    { product_id: 2, url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80' },
    { product_id: 3, url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
    { product_id: 4, url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80' },
    { product_id: 5, url: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80' },
    { product_id: 6, url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80' },
    { product_id: 7, url: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80' },
    { product_id: 8, url: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80' },
    { product_id: 9, url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80' },
    { product_id: 10, url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' }
  ]);
  if (imgError) console.error('Product images error:', imgError);
  else console.log('Product images inserted!');

  console.log('Inserting instagram cache...');
  const { error: igError } = await supabase.from('instagram_cache').upsert([
    { post_id: 'ig1', media_url: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', caption: 'New floral embroidery collection dropping soon!', permalink: 'https://instagram.com' },
    { post_id: 'ig2', media_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', caption: 'Behind the scenes — hand-painting this gorgeous tee', permalink: 'https://instagram.com' },
    { post_id: 'ig3', media_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', caption: 'Customer order ready!', permalink: 'https://instagram.com' },
    { post_id: 'ig4', media_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', caption: 'Festival collection is HERE', permalink: 'https://instagram.com' },
    { post_id: 'ig5', media_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', caption: 'Custom anime tee for a happy customer!', permalink: 'https://instagram.com' },
    { post_id: 'ig6', media_url: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', caption: 'The magic of needle and thread', permalink: 'https://instagram.com' }
  ]);
  if (igError) console.error('Instagram cache error:', igError);
  else console.log('Instagram cache inserted!');
}

insertData();
