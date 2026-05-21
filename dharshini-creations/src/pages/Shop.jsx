import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/mockData';
import { useCartStore, useUserStore } from '../store/useStore';
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';

const sortOpts = ['Popularity', 'Newest', 'Price: Low-High', 'Price: High-Low'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('Popularity');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const { wishlist, toggleWishlist } = useUserStore();

  useEffect(() => {
    if (searchParams.get('wishlist') === 'true') {
      setShowWishlistOnly(true);
      setActiveCategory('All');
    }
  }, [searchParams]);

  const handleToggleWishlistFilter = () => {
    if (showWishlistOnly) {
      setShowWishlistOnly(false);
      setSearchParams({});
    } else {
      setShowWishlistOnly(true);
      setActiveCategory('All');
      setSearchParams({ wishlist: 'true' });
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setShowWishlistOnly(false);
    setSearchParams({});
  };

  const filtered = products.filter(p => {
    if (showWishlistOnly) return wishlist.includes(p.id);
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Fabric Painting') return p.categoryId === 1;
    if (activeCategory === 'Embroidery Works') return p.categoryId === 2;
    if (activeCategory === 'Combo Works') return p.categoryId === 3;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Price: Low-High') return a.basePrice - b.basePrice;
    if (sort === 'Price: High-Low') return b.basePrice - a.basePrice;
    if (sort === 'Newest') return b.id - a.id;
    return 0; // Popularity / Default
  });

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.querySelector('.img-fallback')?.classList.remove('hidden');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Shop — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#A78BFA' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Handcrafted Collection</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #FAFAFA, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shop</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {['All', 'Fabric Painting', 'Embroidery Works', 'Combo Works'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 interactive"
              style={{
                background: !showWishlistOnly && activeCategory === cat ? 'linear-gradient(135deg, #7C3AED, #A78BFA)' : 'rgba(255, 255, 255, 0.03)',
                color: !showWishlistOnly && activeCategory === cat ? '#FAFAFA' : '#9CA3AF',
                border: !showWishlistOnly && activeCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: !showWishlistOnly && activeCategory === cat ? '0 0 15px rgba(124, 58, 237, 0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={handleToggleWishlistFilter}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 interactive flex items-center gap-2"
            style={{
              background: showWishlistOnly ? 'linear-gradient(135deg, #EC4899, #F472B6)' : 'rgba(255, 255, 255, 0.03)',
              color: showWishlistOnly ? '#FAFAFA' : '#9CA3AF',
              border: showWishlistOnly ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: showWishlistOnly ? '0 0 15px rgba(236, 72, 153, 0.3)' : 'none',
            }}
          >
            <FiHeart size={14} fill={showWishlistOnly ? 'white' : 'none'} /> Wishlist ({wishlist.length})
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 mb-8">
          <p className="text-sm" style={{ color: '#9CA3AF' }}>{sorted.length} Products</p>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 rounded-xl text-sm border outline-none cursor-pointer" style={{ borderColor: 'rgba(167,139,250,0.3)', color: '#9CA3AF', background: 'rgba(12,8,22,0.8)' }}>
            {sortOpts.map(o => <option key={o} value={o} style={{ background: '#0a0a0a' }}>{o}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((p, i) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="block">
              <motion.div className="glass-card overflow-hidden group interactive h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    onError={handleImgError}
                  />
                  <div className="img-fallback hidden absolute inset-0 flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(12,8,22,0.9))' }}>
                    {p.categoryId === 1 ? '🎨' : p.categoryId === 2 ? '🪡' : '✨'}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p.id); }} 
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center interactive z-10" 
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                  >
                    <FiHeart size={14} fill={wishlist.includes(p.id) ? '#A78BFA' : 'none'} color={wishlist.includes(p.id) ? '#A78BFA' : 'white'} />
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2" style={{ background: 'rgba(124,58,237,0.8)', backdropFilter: 'blur(10px)', color: 'white' }}>
                      <FiEye size={14} /> Quick View
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between h-[calc(100%-14rem)]">
                  <div className="text-left">
                    <h4 className="font-poppins font-semibold text-sm mb-1 truncate" style={{ color: '#FAFAFA' }}>{p.name}</h4>
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: '#9CA3AF' }}>{p.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-cinzel font-bold text-lg" style={{ color: '#A78BFA' }}>₹{p.basePrice}</span>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(p); }} 
                      className="p-2.5 rounded-full interactive transition-all hover:scale-110 z-10" 
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', boxShadow: '0 0 15px rgba(124,58,237,0.3)' }}
                    >
                      <FiShoppingBag size={14} color="white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
