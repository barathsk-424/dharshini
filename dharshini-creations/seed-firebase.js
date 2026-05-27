import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFMWqJb_6pAaSBsI71L5XWxL6CFfSheq0",
  authDomain: "dharshni-b79b4.firebaseapp.com",
  projectId: "dharshni-b79b4",
  storageBucket: "dharshni-b79b4.firebasestorage.app",
  messagingSenderId: "837655572327",
  appId: "1:837655572327:web:118de1b101a6a2707909c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = [
  { id: '1', name: 'Fabric Painting', slug: 'fabric-painting', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85', starting_price: 50, description: 'Hand-painted designs on premium fabric with vibrant colors that last.', is_active: true },
  { id: '2', name: 'Embroidery Works', slug: 'embroidery-works', image: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=800&q=85', starting_price: 80, description: 'Intricate hand-stitched embroidery with premium threads and artistry.', is_active: true },
  { id: '3', name: 'Combo Works', slug: 'combo-works', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85', starting_price: 499, description: 'The best of both worlds — fabric painting combined with embroidery artistry.', is_active: true }
];

const products = [
  { id: 'p1', category_id: '1', name: 'Kerchief Painting', slug: 'kerchief-painting', short_description: 'Beautiful hand-painted design on premium cotton kerchief.', price: 50, offer_price: 50, thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.5 },
  { id: 'p2', category_id: '1', name: 'Simple T-shirt Painting', slug: 'simple-tshirt-painting', short_description: 'A clean, hand-painted design on a quality cotton T-shirt.', price: 199, offer_price: 199, thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.5 },
  { id: 'p3', category_id: '1', name: 'Custom T-shirt Painting', slug: 'custom-tshirt-painting', short_description: 'Fully customized hand-painted T-shirt with your choice of design.', price: 350, offer_price: 350, thumbnail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: true, stock: 100, rating: 5.0 },
  { id: 'p4', category_id: '1', name: 'Shirt Painting', slug: 'shirt-painting', short_description: 'Premium hand-painted artwork on a formal or casual shirt.', price: 499, offer_price: 499, thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.8 },
  { id: 'p5', category_id: '2', name: 'Name Embroidery', slug: 'name-embroidery', short_description: 'Elegant hand-stitched name embroidery with premium thread.', price: 80, offer_price: 80, thumbnail: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.7 },
  { id: 'p6', category_id: '2', name: 'Small Floral Design', slug: 'small-floral-design', short_description: 'Delicate hand-stitched floral embroidery pattern.', price: 150, offer_price: 150, thumbnail: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.6 },
  { id: 'p7', category_id: '2', name: 'Sleeve Embroidery', slug: 'sleeve-embroidery', short_description: 'Intricate hand-stitched embroidery on sleeves with floral vine or geometric patterns.', price: 199, offer_price: 199, thumbnail: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.5 },
  { id: 'p8', category_id: '2', name: 'Custom Embroidery', slug: 'custom-embroidery', short_description: 'Fully customized embroidery work with your choice of design.', price: 350, offer_price: 350, thumbnail: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: true, stock: 100, rating: 5.0 },
  { id: 'p9', category_id: '3', name: 'Paint + Embroidery T-shirt', slug: 'paint-embroidery-tshirt', short_description: 'The best of both worlds — hand-painted artwork combined with embroidery detailing.', price: 499, offer_price: 499, thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: true, stock: 100, rating: 5.0 },
  { id: 'p10', category_id: '3', name: 'Paint + Embroidery Shirt', slug: 'paint-embroidery-shirt', short_description: 'Premium shirt featuring both fabric painting and embroidery.', price: 699, offer_price: 699, thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', is_active: true, is_featured: false, stock: 100, rating: 4.9 }
];

async function seedDatabase() {
  console.log("Seeding Categories...");
  for (const cat of categories) {
    await setDoc(doc(db, 'categories', cat.id), cat);
  }
  console.log("Seeding Products...");
  for (const prod of products) {
    await setDoc(doc(db, 'products', prod.id), prod);
  }
  console.log("Database Seeded Successfully!");
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
