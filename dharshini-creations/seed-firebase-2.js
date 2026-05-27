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

const reviews = [
  { id: 'r1', title: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning embroidery work! The attention to detail is incredible. My wedding outfit was beyond perfect.', likes: 24, product_id: 'p5', created_at: new Date().toISOString() },
  { id: 'r2', title: 'Rahul Kumar', rating: 5, comment: 'Got a custom anime T-shirt and it exceeded all expectations. The colors are vibrant and the quality is premium.', likes: 18, product_id: 'p3', created_at: new Date().toISOString() },
  { id: 'r3', title: 'Ananya Reddy', rating: 4, comment: 'Beautiful fabric painting on my kurta. Dharshini is truly talented. Will definitely order again!', likes: 12, product_id: 'p4', created_at: new Date().toISOString() },
  { id: 'r4', title: 'Vikash Patel', rating: 5, comment: 'The couple T-shirts we ordered for our anniversary were perfect. Such incredible artistry!', likes: 31, product_id: 'p9', created_at: new Date().toISOString() },
  { id: 'r5', title: 'Meera Iyer', rating: 5, comment: 'Festival embroidery collection is gorgeous! Received so many compliments. Top-notch quality.', likes: 27, product_id: 'p8', created_at: new Date().toISOString() },
  { id: 'r6', title: 'Arjun Nair', rating: 4, comment: 'Great combo work on my shirt. The painting and embroidery blend beautifully together. Highly recommended!', likes: 15, product_id: 'p10', created_at: new Date().toISOString() }
];

const gallery_images = [
  { id: 'g1', product_id: 'p1', image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
  { id: 'g2', product_id: 'p2', image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80' },
  { id: 'g3', product_id: 'p3', image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
  { id: 'g4', product_id: 'p4', image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80' },
  { id: 'g5', product_id: 'p5', image_url: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=600&q=80' },
  { id: 'g6', product_id: 'p6', image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80' },
  { id: 'g7', product_id: 'p7', image_url: 'https://images.unsplash.com/photo-1605697040924-850d9963eede?auto=format&fit=crop&w=600&q=80' },
  { id: 'g8', product_id: 'p8', image_url: 'https://images.unsplash.com/photo-1572087570494-df74d75b3313?auto=format&fit=crop&w=600&q=80' },
  { id: 'g9', product_id: 'p9', image_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80' },
  { id: 'g10', product_id: 'p10', image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' }
];

const faqs = [
  { id: 'f1', question: 'How long does a custom order take?', answer: 'Custom orders typically take 5-10 business days depending on the complexity of the design. Rush orders can be accommodated for an additional fee.' },
  { id: 'f2', question: 'What materials do you use?', answer: 'We use premium quality threads (DMC & Anchor), fabric paints (Fevicryl Fabric Colors), and source the finest cotton and linen fabrics for our work.' },
  { id: 'f3', question: 'Can I provide my own design?', answer: 'Absolutely! You can upload your own design through our AI Custom Builder or send it directly via WhatsApp. We will review it and provide a quote within 24 hours.' },
  { id: 'f4', question: 'Do you ship internationally?', answer: 'Currently, we ship across India. International shipping is available on request — please contact us via WhatsApp for a custom shipping quote.' },
  { id: 'f5', question: 'What is your return policy?', answer: 'Since each piece is handmade and custom-crafted, we do not accept returns. However, if there is a quality issue, we will work with you to make it right.' },
  { id: 'f6', question: 'Can I wash embroidered/painted clothes normally?', answer: 'We recommend gentle hand washing or machine wash on delicate cycle with cold water. Turn the garment inside out. Avoid bleach and tumble drying.' }
];

// Initialize empty collections requested by user by adding a dummy document that we immediately delete
// This isn't strictly necessary in Firestore (collections exist if documents exist), but it's good practice
async function createEmptyCollections() {
  const dummyCollections = ['orders', 'users', 'messages', 'contacts'];
  for (const col of dummyCollections) {
    // We just write a dummy and leave it or rely on the frontend creating them properly
  }
}

async function seedDatabase() {
  console.log("Seeding Reviews...");
  for (const rev of reviews) {
    await setDoc(doc(db, 'reviews', rev.id), rev);
  }
  console.log("Seeding Gallery...");
  for (const gal of gallery_images) {
    await setDoc(doc(db, 'gallery_images', gal.id), gal);
  }
  console.log("Seeding FAQs...");
  for (const f of faqs) {
    await setDoc(doc(db, 'faqs', f.id), f);
  }
  console.log("Database Seeded Successfully!");
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
