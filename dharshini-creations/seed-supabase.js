// seed-supabase.js — seeds all mock data into Supabase tables
// Run with: node seed-supabase.js

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHVsYnpkb2xucnR5eG51eGtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg2MTIyNCwiZXhwIjoyMDk1NDM3MjI0fQ.PmFFMG6IsjTDeQGfljUU3mROSfXDYaQAl48Eac-4Zy4';
const SUPABASE_URL     = 'https://pzdulbzdolnrtyxnuxkp.supabase.co';

import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

// ── DATA ────────────────────────────────────────────────────

const categories = [
  { id: 1, name: 'Fabric Painting', slug: 'fabric-painting', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', starting_price: 50, description: 'Hand-painted designs on premium fabric with vibrant colors that last.', items: [{ name: 'Kerchief Painting', price: '₹50+' }, { name: 'Simple T-shirt', price: '₹199+' }, { name: 'Custom T-shirt', price: '₹350+' }, { name: 'Shirt Painting', price: '₹499+' }] },
  { id: 2, name: 'Embroidery Works', slug: 'embroidery-works', image: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', starting_price: 80, description: 'Intricate hand-stitched embroidery with premium threads and artistry.', items: [{ name: 'Name Embroidery', price: '₹80+' }, { name: 'Small Floral Design', price: '₹150+' }, { name: 'Sleeve Embroidery', price: '₹199+' }, { name: 'Custom Embroidery', price: '₹350+' }] },
  { id: 3, name: 'Combo Works', slug: 'combo-works', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', starting_price: 499, description: 'The best of both worlds — fabric painting combined with embroidery artistry.', items: [{ name: 'Paint+Embroidery T-shirt', price: '₹499+' }, { name: 'Paint+Embroidery Shirt', price: '₹699+' }] },
];

const products = [
  { id: 1, category_id: 1, name: 'Kerchief Painting', description: 'Beautiful hand-painted design on premium cotton kerchief. Perfect as a gift or personal accessory.', base_price: 50, tags: ['fabric-painting'], is_customizable: false, colors: ['White', 'Cream'], sizes: ['Free Size'] },
  { id: 2, category_id: 1, name: 'Simple T-shirt Painting', description: 'A clean, hand-painted design on a quality cotton T-shirt. Great for everyday wear with a creative touch.', base_price: 199, tags: ['fabric-painting'], is_customizable: false, colors: ['White', 'Black', 'Pastel Pink'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 3, category_id: 1, name: 'Custom T-shirt Painting', description: 'Fully customized hand-painted T-shirt with your choice of design, character, or artwork. Made to order.', base_price: 350, tags: ['fabric-painting', 'trending'], is_customizable: true, colors: ['White', 'Black', 'Navy'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 4, category_id: 1, name: 'Shirt Painting', description: 'Premium hand-painted artwork on a formal or casual shirt. Vibrant colors that last through washes.', base_price: 499, tags: ['fabric-painting'], is_customizable: true, colors: ['White', 'Sky Blue', 'Cream'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, category_id: 2, name: 'Name Embroidery', description: 'Elegant hand-stitched name embroidery with premium thread. Perfect for personalized gifts.', base_price: 80, tags: ['embroidery'], is_customizable: true, colors: ['White', 'Black', 'Cream'], sizes: ['Free Size'] },
  { id: 6, category_id: 2, name: 'Small Floral Design', description: 'Delicate hand-stitched floral embroidery pattern. A subtle and beautiful addition to any garment.', base_price: 150, tags: ['embroidery', 'floral'], is_customizable: false, colors: ['White', 'Cream', 'Pastel Pink'], sizes: ['Free Size'] },
  { id: 7, category_id: 2, name: 'Sleeve Embroidery', description: 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', base_price: 199, tags: ['embroidery'], is_customizable: true, colors: ['Black', 'White', 'Maroon'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 8, category_id: 2, name: 'Custom Embroidery', description: 'Fully customized embroidery work with your choice of design, pattern, or motif. Handcrafted with care.', base_price: 350, tags: ['embroidery', 'trending'], is_customizable: true, colors: ['White', 'Black', 'Red', 'Maroon'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 9, category_id: 3, name: 'Paint + Embroidery T-shirt', description: 'The best of both worlds — a T-shirt with hand-painted artwork combined with embroidery detailing.', base_price: 499, tags: ['combo', 'trending'], is_customizable: true, colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 10, category_id: 3, name: 'Paint + Embroidery Shirt', description: 'Premium shirt featuring both fabric painting and embroidery. A luxury handcrafted statement piece.', base_price: 699, tags: ['combo'], is_customizable: true, colors: ['White', 'Ivory', 'Cream'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
];

const productImages = [
  { product_id: 1, url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 2, url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 3, url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 4, url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 5, url: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 6, url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 7, url: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 8, url: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 9, url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', is_primary: true },
  { product_id: 10, url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', is_primary: true },
];

const reviews = [
  { name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', date: '2024-12-15', has_video: false },
  { name: 'Rahul Kumar', rating: 5, comment: 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-01-20', has_video: true },
  { name: 'Ananya Reddy', rating: 4, comment: 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-02-08', has_video: false },
  { name: 'Vikash Patel', rating: 5, comment: 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-03-01', has_video: false },
  { name: 'Meera Iyer', rating: 5, comment: 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality and craftsmanship.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-03-15', has_video: true },
  { name: 'Arjun Nair', rating: 4, comment: 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=150&h=150&q=80', date: '2025-04-02', has_video: false },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Royal Floral Embroidery', likes: 234 },
  { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', category: 'fabric-painting', title: 'Sunset Paradise Tee', likes: 187 },
  { src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', category: 'combo', title: 'Wedding Special Combo', likes: 312 },
  { src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Name Art Collection', likes: 156 },
  { src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', category: 'fabric-painting', title: 'Anime Character Art', likes: 445 },
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', category: 'customer', title: 'Customer Creation', likes: 98 },
  { src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', category: 'combo', title: 'Festival Special', likes: 267 },
  { src: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Sleeve Detail Work', likes: 189 },
  { src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', category: 'fabric-painting', title: 'Butterfly Collection', likes: 334 },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', category: 'customer', title: 'Happy Customer', likes: 121 },
  { src: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', category: 'embroidery', title: 'Mirror Work Design', likes: 278 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', category: 'combo', title: 'Couple Set', likes: 399 },
];

const instagramPosts = [
  { id: 'ig1', media_url: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', caption: 'New floral embroidery collection dropping soon! 🌸✨ #DharshiniCreations', permalink: 'https://instagram.com' },
  { id: 'ig2', media_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', caption: 'Behind the scenes — hand-painting this gorgeous tee 🎨 #HandmadeWithLove', permalink: 'https://instagram.com' },
  { id: 'ig3', media_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80', caption: 'Customer order ready! Every stitch tells a story 🪡 #EmbroideryArt', permalink: 'https://instagram.com' },
  { id: 'ig4', media_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', caption: 'Festival collection is HERE 🎉 Limited pieces available! #FestivalFashion', permalink: 'https://instagram.com' },
  { id: 'ig5', media_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', caption: 'Custom anime tee for a happy customer! 🎌 #AnimeFashion #CustomArt', permalink: 'https://instagram.com' },
  { id: 'ig6', media_url: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', caption: 'The magic of needle and thread ✨ #Handcrafted #PremiumQuality', permalink: 'https://instagram.com' },
];

// ── SEED ────────────────────────────────────────────────────

async function seed(table, data, label) {
  const { error } = await supabase.from(table).upsert(data, { onConflict: 'id' });
  if (error) { console.error(`❌ ${label}:`, error.message); }
  else { console.log(`✅ ${label} seeded (${data.length} rows)`); }
}

console.log('Seeding Supabase...\n');
await seed('categories',      categories,     'categories');
await seed('products',        products,       'products');
await seed('product_images',  productImages,  'product_images');
await seed('reviews',         reviews,        'reviews');
await seed('gallery_images',  galleryImages,  'gallery_images');
await seed('instagram_posts', instagramPosts, 'instagram_posts');

console.log('\n🎉 All data seeded!');
