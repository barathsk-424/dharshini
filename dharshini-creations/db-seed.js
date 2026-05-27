import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgehwvbjtyadpqkrljby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWh3dmJqdHlhZHBxa3JsamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU2ODcsImV4cCI6MjA5NTM3MTY4N30.0cwbFoU8Vfu9-9exVVjIMJkoV9Iwe8lfBJqqnBUhX-Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fixed UUIDs so we can reference them consistently
const catIds = {
  fabricPainting: '10000000-0000-0000-0000-000000000001',
  embroideryWorks: '10000000-0000-0000-0000-000000000002',
  comboWorks: '10000000-0000-0000-0000-000000000003',
};

const prodIds = {
  p1: '20000000-0000-0000-0000-000000000001',
  p2: '20000000-0000-0000-0000-000000000002',
  p3: '20000000-0000-0000-0000-000000000003',
  p4: '20000000-0000-0000-0000-000000000004',
  p5: '20000000-0000-0000-0000-000000000005',
  p6: '20000000-0000-0000-0000-000000000006',
  p7: '20000000-0000-0000-0000-000000000007',
  p8: '20000000-0000-0000-0000-000000000008',
  p9: '20000000-0000-0000-0000-000000000009',
  p10: '20000000-0000-0000-0000-000000000010',
};

async function seedAll() {
  // ── 1. CATEGORIES ──
  console.log('\n=== Inserting Categories ===');
  const { data: catData, error: catErr } = await supabase.from('categories').upsert([
    { id: catIds.fabricPainting, name: 'Fabric Painting', slug: 'fabric-painting', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', description: 'Hand-painted designs on premium fabric with vibrant colors that last.', is_active: true },
    { id: catIds.embroideryWorks, name: 'Embroidery Works', slug: 'embroidery-works', image: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', description: 'Intricate hand-stitched embroidery with premium threads and artistry.', is_active: true },
    { id: catIds.comboWorks, name: 'Combo Works', slug: 'combo-works', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', description: 'The best of both worlds — fabric painting combined with embroidery artistry.', is_active: true },
  ], { onConflict: 'id' }).select();
  if (catErr) console.error('Categories ERROR:', catErr.message, catErr.details);
  else console.log('Categories OK:', catData.length, 'rows');

  // ── 2. PRODUCTS ──
  console.log('\n=== Inserting Products ===');
  const products = [
    { id: prodIds.p1, category_id: catIds.fabricPainting, name: 'Kerchief Painting', slug: 'kerchief-painting', short_description: 'Beautiful hand-painted design on premium cotton kerchief. Perfect as a gift or personal accessory.', price: 50, offer_price: 50, thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.5 },
    { id: prodIds.p2, category_id: catIds.fabricPainting, name: 'Simple T-shirt Painting', slug: 'simple-tshirt-painting', short_description: 'A clean, hand-painted design on a quality cotton T-shirt. Great for everyday wear.', price: 199, offer_price: 199, thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.5 },
    { id: prodIds.p3, category_id: catIds.fabricPainting, name: 'Custom T-shirt Painting', slug: 'custom-tshirt-painting', short_description: 'Fully customized hand-painted T-shirt with your choice of design. Made to order.', price: 350, offer_price: 350, thumbnail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: true, stock: 100, rating: 5.0 },
    { id: prodIds.p4, category_id: catIds.fabricPainting, name: 'Shirt Painting', slug: 'shirt-painting', short_description: 'Premium hand-painted artwork on a formal or casual shirt. Vibrant colors that last.', price: 499, offer_price: 499, thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.8 },
    { id: prodIds.p5, category_id: catIds.embroideryWorks, name: 'Name Embroidery', slug: 'name-embroidery', short_description: 'Elegant hand-stitched name embroidery with premium thread. Perfect for gifts.', price: 80, offer_price: 80, thumbnail: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.7 },
    { id: prodIds.p6, category_id: catIds.embroideryWorks, name: 'Small Floral Design', slug: 'small-floral-design', short_description: 'Delicate hand-stitched floral embroidery. A beautiful addition to any garment.', price: 150, offer_price: 150, thumbnail: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.6 },
    { id: prodIds.p7, category_id: catIds.embroideryWorks, name: 'Sleeve Embroidery', slug: 'sleeve-embroidery', short_description: 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', price: 199, offer_price: 199, thumbnail: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.5 },
    { id: prodIds.p8, category_id: catIds.embroideryWorks, name: 'Custom Embroidery', slug: 'custom-embroidery', short_description: 'Fully customized embroidery work with your choice of design. Handcrafted with care.', price: 350, offer_price: 350, thumbnail: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: true, stock: 100, rating: 5.0 },
    { id: prodIds.p9, category_id: catIds.comboWorks, name: 'Paint + Embroidery T-shirt', slug: 'paint-embroidery-tshirt', short_description: 'The best of both worlds — hand-painted artwork combined with embroidery detailing.', price: 499, offer_price: 499, thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: true, stock: 100, rating: 5.0 },
    { id: prodIds.p10, category_id: catIds.comboWorks, name: 'Paint + Embroidery Shirt', slug: 'paint-embroidery-shirt', short_description: 'Premium shirt featuring both fabric painting and embroidery. A luxury statement piece.', price: 699, offer_price: 699, thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.9 },
  ];
  const { data: prodData, error: prodErr } = await supabase.from('products').upsert(products, { onConflict: 'id' }).select();
  if (prodErr) console.error('Products ERROR:', prodErr.message, prodErr.details);
  else console.log('Products OK:', prodData.length, 'rows');

  // ── 3. PRODUCT GALLERY ──
  console.log('\n=== Inserting Product Gallery ===');
  await supabase.from('product_gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const galleryItems = Object.values(prodIds).map(pid => ({
    product_id: pid,
    image_url: products.find(p => p.id === pid)?.thumbnail || '',
  }));
  const { data: galData, error: galErr } = await supabase.from('product_gallery').insert(galleryItems).select();
  if (galErr) console.error('Product Gallery ERROR:', galErr.message, galErr.details);
  else console.log('Product Gallery OK:', galData.length, 'rows');

  // ── 4. REVIEWS ──
  console.log('\n=== Inserting Reviews ===');
  const reviewIds = [
    '30000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000004',
    '30000000-0000-0000-0000-000000000005',
    '30000000-0000-0000-0000-000000000006',
  ];
  const { data: revData, error: revErr } = await supabase.from('reviews').upsert([
    { id: reviewIds[0], title: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.', likes: 24, product_id: prodIds.p5 },
    { id: reviewIds[1], title: 'Rahul Kumar', rating: 5, comment: 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.', likes: 18, product_id: prodIds.p3 },
    { id: reviewIds[2], title: 'Ananya Reddy', rating: 4, comment: 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!', likes: 12, product_id: prodIds.p4 },
    { id: reviewIds[3], title: 'Vikash Patel', rating: 5, comment: 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!', likes: 31, product_id: prodIds.p9 },
    { id: reviewIds[4], title: 'Meera Iyer', rating: 5, comment: 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality.', likes: 27, product_id: prodIds.p8 },
    { id: reviewIds[5], title: 'Arjun Nair', rating: 4, comment: 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!', likes: 15, product_id: prodIds.p10 },
  ], { onConflict: 'id' }).select();
  if (revErr) console.error('Reviews ERROR:', revErr.message, revErr.details);
  else console.log('Reviews OK:', revData.length, 'rows');

  // ── 5. FAQs ──
  console.log('\n=== Inserting FAQs ===');
  const faqIds = [
    '40000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000002',
    '40000000-0000-0000-0000-000000000003',
    '40000000-0000-0000-0000-000000000004',
    '40000000-0000-0000-0000-000000000005',
    '40000000-0000-0000-0000-000000000006',
  ];
  const { data: faqData, error: faqErr } = await supabase.from('faqs').upsert([
    { id: faqIds[0], question: 'How long does a custom order take?', answer: 'Custom orders typically take 5-10 business days depending on the complexity of the design. Rush orders can be accommodated for an additional fee.' },
    { id: faqIds[1], question: 'What materials do you use?', answer: 'We use premium quality threads (DMC & Anchor), fabric paints (Fevicryl Fabric Colors), and source the finest cotton and linen fabrics for our work.' },
    { id: faqIds[2], question: 'Can I provide my own design?', answer: 'Absolutely! You can upload your own design through our AI Custom Builder or send it directly via WhatsApp. We will review it and provide a quote within 24 hours.' },
    { id: faqIds[3], question: 'Do you ship internationally?', answer: 'Currently, we ship across India. International shipping is available on request — please contact us via WhatsApp for a custom shipping quote.' },
    { id: faqIds[4], question: 'What is your return policy?', answer: 'Since each piece is handmade and custom-crafted, we do not accept returns. However, if there is a quality issue, we will work with you to make it right.' },
    { id: faqIds[5], question: 'Can I wash embroidered/painted clothes normally?', answer: 'We recommend gentle hand washing or machine wash on delicate cycle with cold water. Turn the garment inside out. Avoid bleach and tumble drying.' },
  ], { onConflict: 'id' }).select();
  if (faqErr) console.error('FAQs ERROR:', faqErr.message, faqErr.details);
  else console.log('FAQs OK:', faqData.length, 'rows');

  // ── 6. BANNERS ──
  console.log('\n=== Inserting Banners ===');
  const bannerIds = [
    '50000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000002',
  ];
  const { data: banData, error: banErr } = await supabase.from('banners').upsert([
    { id: bannerIds[0], title: 'Handmade Embroidery & Fabric Painting', description: 'Unique handcrafted designs that tell your story', image: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=1200&q=85' },
    { id: bannerIds[1], title: 'Custom T-shirt Art', description: 'Your imagination, our craft — made to order', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85' },
  ], { onConflict: 'id' }).select();
  if (banErr) console.error('Banners ERROR:', banErr.message, banErr.details);
  else console.log('Banners OK:', banData.length, 'rows');

  // ── VERIFICATION ──
  console.log('\n========== VERIFICATION ==========');
  const tables = ['categories', 'products', 'product_gallery', 'reviews', 'faqs', 'banners'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*');
    if (error) console.log(`❌ ${t}: ${error.message}`);
    else console.log(`✅ ${t}: ${data.length} rows`);
  }
  
  // Print sample data
  console.log('\n--- Sample Category ---');
  const { data: sc } = await supabase.from('categories').select('*').limit(1);
  console.log(JSON.stringify(sc?.[0], null, 2));
  
  console.log('\n--- Sample Product ---');
  const { data: sp } = await supabase.from('products').select('*').limit(1);
  console.log(JSON.stringify(sp?.[0], null, 2));
}

seedAll().catch(console.error);
