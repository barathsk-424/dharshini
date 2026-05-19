import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { products } from '../../data/mockData';
import { useCartStore } from '../../store/useStore';
import { FiShoppingBag, FiEye } from 'react-icons/fi';

const tagColors = {
  trending: { bg: 'rgba(234,88,12,0.2)', text: '#fb923c', border: 'rgba(234,88,12,0.4)' },
  'new-arrival': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80', border: 'rgba(34,197,94,0.4)' },
  festival: { bg: 'rgba(168,85,247,0.2)', text: '#c084fc', border: 'rgba(168,85,247,0.4)' },
  couple: { bg: 'rgba(236,72,153,0.2)', text: '#f472b6', border: 'rgba(236,72,153,0.4)' },
  anime: { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa', border: 'rgba(59,130,246,0.4)' },
  floral: { bg: 'rgba(244,114,182,0.2)', text: '#f9a8d4', border: 'rgba(244,114,182,0.4)' },
};

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const addItem = useCartStore(s => s.addItem);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Curated for You</p>
          <h2 className="section-title glow-text">Premium Showcase</h2>
        </motion.div>

        {/* Tag filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {['All', 'Trending', 'New Arrivals', 'Festival', 'Couple', 'Anime', 'Floral'].map(tag => (
            <button
              key={tag}
              className="tag-badge interactive hover:scale-105 transition-transform"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Horizontal scrollable product ribbon */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="glass-card overflow-hidden group interactive flex-shrink-0"
                style={{ width: 280 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                {/* Image area */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, rgba(138,43,226,0.2), rgba(20,10,40,0.9))` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    {product.categoryId === 1 ? '🎨' : product.categoryId === 2 ? '🪡' : '✨'}
                  </div>

                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.tags.slice(0, 2).map(tag => {
                      const tc = tagColors[tag] || tagColors.floral;
                      return (
                        <span key={tag} className="text-[10px] font-semibold uppercase px-2 py-1 rounded-full"
                          style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>
                          {tag.replace('-', ' ')}
                        </span>
                      );
                    })}
                  </div>

                  {/* Quick view */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 interactive"
                      style={{
                        background: 'rgba(138,43,226,0.8)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(178,102,255,0.5)',
                      }}>
                      <FiEye size={14} /> Quick View
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-poppins font-semibold text-sm mb-1 truncate" style={{ color: '#F5F5F5' }}>
                    {product.name}
                  </h4>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: '#B8B8B8' }}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-lg" style={{ color: '#B266FF' }}>
                      ₹{product.basePrice}
                    </span>
                    <button
                      onClick={() => addItem(product)}
                      className="p-2.5 rounded-full interactive transition-all hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, #8A2BE2, #B266FF)',
                        boxShadow: '0 0 15px rgba(138,43,226,0.3)',
                      }}
                    >
                      <FiShoppingBag size={14} color="white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
