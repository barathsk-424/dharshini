import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCartStore, useUserStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { fetchProducts } from '../services/supabase';
import { products as mockProducts } from '../data/mockData';

export default function Wishlist() {
  const { currentUser } = useAuth();
  const addItem = useCartStore(s => s.addItem);
  const { wishlist, toggleWishlist } = useUserStore();
  const [allProducts, setAllProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from Supabase (fallback to mock)
  useEffect(() => {
    fetchProducts().then(prods => { if (prods?.length) setAllProducts(prods); });
  }, []);

  // Mark loading done once auth resolves
  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  const removeFromWishlist = async (productId) => {
    toggleWishlist(productId); // local update immediately
    if (!currentUser) return;
    await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', currentUser.id)
      .eq('product_id', productId);
  };

  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>My Wishlist — Dharshini Creations</title></Helmet>
      
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 mb-8">
          <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back to Profile</Link>
          <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3">
            <FiHeart className="text-pink-500" fill="currentColor" /> My Wishlist
          </h1>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div className="glass-card p-12 text-center" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center mb-6">
              <FiHeart className="text-pink-400" size={24} />
            </div>
            <h3 className="font-cinzel text-xl text-white mb-2">Your Wishlist is Empty</h3>
            <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">Save your favorite handcrafted items here so you can find them later.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 interactive">
              Discover Products <FiArrowRight />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group flex flex-col h-full relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 transition-colors interactive"
                    title="Remove from Wishlist"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-poppins font-semibold text-sm mb-2 text-white truncate">{p.name}</h4>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="font-cinzel font-bold text-lg text-purple-300">₹{p.basePrice || p.base_price}+</span>
                    <button
                      onClick={() => addItem(p)}
                      className="p-2.5 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/40 hover:text-white transition-all interactive"
                      title="Add to Cart"
                    >
                      <FiShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
