import { collection, getDocs, doc, getDoc, setDoc, addDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const categoriesCol = collection(db, 'categories');
    const q = query(categoriesCol, orderBy('id', 'asc'));
    const categorySnapshot = await getDocs(q);
    return categorySnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

// Fetch products (optionally filtered by category_id)
export const fetchProducts = async (categoryId = null) => {
  try {
    const productsCol = collection(db, 'products');
    let q = query(productsCol, orderBy('id', 'asc'));
    
    if (categoryId) {
      q = query(productsCol, where('category_id', '==', categoryId), orderBy('id', 'asc'));
    }
    
    const productSnapshot = await getDocs(q);
    return productSnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

// Fetch reviews
export const fetchReviews = async () => {
  try {
    const reviewsCol = collection(db, 'reviews');
    const q = query(reviewsCol, orderBy('id', 'asc'));
    const reviewSnapshot = await getDocs(q);
    return reviewSnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return null;
  }
};

// Fetch gallery images
export const fetchGalleryImages = async () => {
  try {
    const galleryCol = collection(db, 'gallery_images');
    const q = query(galleryCol, orderBy('id', 'asc'));
    const gallerySnapshot = await getDocs(q);
    return gallerySnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return null;
  }
};

// Fetch instagram posts
export const fetchInstagramPosts = async () => {
  try {
    const igCol = collection(db, 'instagram_posts');
    const q = query(igCol, orderBy('fetched_at', 'desc'));
    const igSnapshot = await getDocs(q);
    return igSnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching instagram posts:', error);
    return null;
  }
};

// Submit an inquiry
export const submitInquiry = async (name, email, message) => {
  try {
    const inquiriesCol = collection(db, 'inquiries');
    const docRef = await addDoc(inquiriesCol, {
      name,
      email,
      message,
      resolved: false,
      created_at: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return { success: false, error: error.message };
  }
};
