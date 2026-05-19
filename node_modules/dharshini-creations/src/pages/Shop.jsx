import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/mockData';
import { useCartStore, useUserStore } from '../store/useStore';
import { FiShoppingBag, FiHeart, FiEye, FiFilter } from 'react-icons/fi';

const sortOpts = ['Popularity', 'Newest', 'Price: Low-High', 'Price: High-Low'];

export default function Shop() {
  const [sort, setSort] = useState('Popularity');
  const addItem = useCartStore(s => s.addItem);
  const { wishlist, toggleWishlist } = useUserStore();
  const sorted = [...products].sort((a, b) => sort === 'Price: Low-High' ? a.basePrice - b.basePrice : sort === 'Price: High-Low' ? b.basePrice - a.basePrice : 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Shop — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Handcrafted Collection</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shop</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <p className="text-sm" style={{ color: '#B8B8B8' }}>{products.length} Products</p>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 rounded-xl text-sm border outline-none" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#B8B8B8', background: 'rgba(20,10,40,0.8)' }}>
            {sortOpts.map(o => <option key={o} value={o} style={{ background: '#0a0a0a' }}>{o}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((p, i) => (
            <motion.div key={p.id} className="glass-card overflow-hidden group interactive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0" style={{ background: `linear-gradient(${135+i*20}deg, rgba(138,43,226,0.2), rgba(20,10,40,0.9))` }} />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">{p.categoryId === 1 ? '🎨' : p.categoryId === 2 ? '🪡' : '✨'}</div>
                <button onClick={() => toggleWishlist(p.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center interactive" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <FiHeart size={14} fill={wishlist.includes(p.id) ? '#B266FF' : 'none'} color={wishlist.includes(p.id) ? '#B266FF' : 'white'} />
                </button>
              </div>
              <div className="p-5">
                <h4 className="font-poppins font-semibold text-sm mb-1 truncate" style={{ color: '#F5F5F5' }}>{p.name}</h4>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: '#B8B8B8' }}>{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-cinzel font-bold text-lg" style={{ color: '#B266FF' }}>₹{p.basePrice}</span>
                  <button onClick={() => addItem(p)} className="p-2.5 rounded-full interactive" style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)' }}>
                    <FiShoppingBag size={14} color="white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
