import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { products, categories } from '../data/mockData';
import { useCartStore, useUserStore } from '../store/useStore';
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';
import { fetchCategories, fetchProducts } from '../services/supabase';

export default function Shop() {

/* ── Category accent colors ── */
const categoryAccent = {
  1: { color: '#FB923C', glow: 'rgba(251,146,60,0.25)', icon: '🎨' },
  2: { color: '#2DD4BF', glow: 'rgba(45,212,191,0.25)', icon: '🪡' },
  3: { color: '#F59E0B', glow: 'rgba(245,158,11,0.25)', icon: '✨' },
};

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const { wishlist, toggleWishlist } = useUserStore();

  const [dbProducts, setDbProducts] = useState(products);
  const [dbCategories, setDbCategories] = useState(categories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        if (cats && cats.length > 0) setDbCategories(cats);
        if (prods && prods.length > 0) setDbProducts(prods);
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to mock data.', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

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

  /* Filter products */
  const filtered = dbProducts.filter(p => {
    if (showWishlistOnly) return wishlist.includes(p.id);
    if (activeCategory === 'All') return true;
    const catMatch = dbCategories.find(c => c.name === activeCategory);
    if (catMatch) return p.categoryId === catMatch.id;
    return true;
  });

  /* Group by category for the organized display */
  const groupedByCategory = dbCategories.map(cat => ({
    ...cat,
    accent: categoryAccent[cat.id] || { color: '#8A2BE2', glow: 'rgba(138,43,226,0.25)', icon: '✨' },
    products: filtered.filter(p => p.categoryId === cat.id),
  })).filter(g => g.products.length > 0);

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.querySelector('.img-fallback')?.classList.remove('hidden');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Shop — Dharshini Creations</title></Helmet>

      {/* Hero */}
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: 'var(--color-purple-glow)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Handcrafted Collection</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Our Menu</motion.h1>
          <motion.p className="text-sm mt-3 max-w-md mx-auto" style={{ color: 'var(--color-gray-soft)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Every piece is handcrafted with love. Choose your category and place your order.
          </motion.p>
        </div>
      </section>

      <div className="section-container" style={{ paddingTop: 40 }}>
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {['All', 'Fabric Painting', 'Embroidery Works', 'Combo Works'].map((cat) => {
            const isActive = !showWishlistOnly && activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 interactive"
                style={{
                  background: isActive ? 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'white' : 'var(--color-gray-dark)',
                  border: isActive ? 'none' : '1px solid var(--color-border-light)',
                  boxShadow: isActive ? '0 0 20px rgba(124, 58, 237, 0.35)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
          <button
            onClick={handleToggleWishlistFilter}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 interactive flex items-center gap-2"
            style={{
              background: showWishlistOnly ? 'linear-gradient(135deg, #EC4899, #F472B6)' : 'rgba(255, 255, 255, 0.03)',
              color: showWishlistOnly ? 'white' : 'var(--color-gray-dark)',
              border: showWishlistOnly ? 'none' : '1px solid var(--color-border-light)',
              boxShadow: showWishlistOnly ? '0 0 15px rgba(236, 72, 153, 0.3)' : 'none',
            }}
          >
            <FiHeart size={14} fill={showWishlistOnly ? 'white' : 'none'} /> Wishlist ({wishlist.length})
          </button>
        </div>

        {/* ── Category-grouped Menu Display ── */}
        {groupedByCategory.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl mb-4">💜</p>
            <p className="text-lg font-semibold" style={{ color: 'var(--color-white)' }}>No items found</p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-gray-dark)' }}>
              {showWishlistOnly ? 'Your wishlist is empty. Browse our collection and add items you love!' : 'Try selecting a different category.'}
            </p>
          </div>
        )}

        {groupedByCategory.map((group, groupIdx) => (
          <div key={group.id} className={groupIdx > 0 ? 'mt-16' : ''}>
            {/* Category Header */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: group.accent.glow,
                  border: `1px solid ${group.accent.color}40`,
                  boxShadow: `0 0 20px ${group.accent.glow}`,
                }}
              >
                {group.accent.icon}
              </div>
              <div className="flex-1">
                <h2 className="font-cinzel text-xl md:text-2xl font-bold" style={{ color: 'var(--color-white)' }}>
                  {group.name}
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-gray-dark)' }}>
                  {group.products.length} {group.products.length === 1 ? 'item' : 'items'} · Starting from ₹{group.startingPrice}+
                </p>
              </div>
              <div className="hidden sm:block h-px flex-1" style={{ background: `linear-gradient(90deg, ${group.accent.color}30, transparent)` }} />
            </motion.div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.products.map((p, i) => (
                <Link key={p.id} to={`/shop/${p.id}`} className="block">
                  <motion.div
                    className="glass-card overflow-hidden group interactive h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                        onError={handleImgError}
                      />
                      <div className="img-fallback hidden absolute inset-0 flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(12,8,22,0.9))' }}>
                        {group.accent.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p.id); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center interactive z-10"
                        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                      >
                        <FiHeart size={14} fill={wishlist.includes(p.id) ? 'var(--color-purple-glow)' : 'none'} color={wishlist.includes(p.id) ? 'var(--color-purple-glow)' : 'white'} />
                      </button>

                      {/* Quick View on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2" style={{ background: `${group.accent.color}cc`, backdropFilter: 'blur(10px)', color: 'white' }}>
                          <FiEye size={14} /> View Details
                        </span>
                      </div>

                      {/* Customizable badge */}
                      {p.isCustomizable && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                          Customizable
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div className="text-left">
                        <h4 className="font-poppins font-semibold text-sm mb-1 truncate" style={{ color: 'var(--color-white)' }}>
                          {p.name}
                        </h4>
                        <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--color-gray-dark)' }}>
                          {p.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-cinzel font-bold text-lg" style={{ color: group.accent.color }}>
                          ₹{p.basePrice}+
                        </span>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(p); }}
                          className="p-2.5 rounded-full interactive transition-all hover:scale-110 z-10"
                          style={{ background: `linear-gradient(135deg, ${group.accent.color}, ${group.accent.color}cc)`, boxShadow: `0 0 15px ${group.accent.glow}` }}
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
        ))}
      </div>
    </motion.div>
  );
}
