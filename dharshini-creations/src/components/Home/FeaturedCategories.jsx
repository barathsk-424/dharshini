import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/mockData';
import { FiX } from 'react-icons/fi';

export default function FeaturedCategories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section ref={ref} className="relative gradient-bg">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Our Specialties</p>
          <h2 className="section-title glow-text">Featured Categories</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="glass-card overflow-hidden cursor-pointer interactive group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(138,43,226,0.3), rgba(5,5,5,0.8))`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    {cat.id === 1 ? '🎨' : cat.id === 2 ? '🪡' : '✨'}
                  </motion.div>
                </div>
                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(178,102,255,0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 2s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-semibold mb-2" style={{ color: '#F5F5F5' }}>
                  {cat.name}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#B8B8B8' }}>
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-lg font-bold" style={{ color: '#B266FF' }}>
                    Starting ₹{cat.startingPrice}+
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(138,43,226,0.2)', color: '#B266FF', border: '1px solid rgba(178,102,255,0.3)' }}>
                    View Pricing →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              className="glass-card p-8 max-w-lg w-full mx-4 relative"
              style={{ background: 'rgba(10, 5, 20, 0.95)', border: '1px solid rgba(138,43,226,0.4)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 interactive transition-colors"
              >
                <FiX size={20} color="#B8B8B8" />
              </button>

              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">
                  {selectedCategory.id === 1 ? '🎨' : selectedCategory.id === 2 ? '🪡' : '✨'}
                </span>
                <h3 className="font-cinzel text-2xl font-bold glow-text" style={{ color: '#F5F5F5' }}>
                  {selectedCategory.name}
                </h3>
                <p className="font-great-vibes text-lg mt-1" style={{ color: '#B266FF' }}>Pricing Guide</p>
              </div>

              <div className="space-y-3">
                {selectedCategory.items.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center justify-between py-3 px-4 rounded-xl transition-colors"
                    style={{
                      background: 'rgba(138,43,226,0.08)',
                      borderBottom: '1px solid rgba(106,13,173,0.15)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <span className="font-poppins text-sm" style={{ color: '#F5F5F5' }}>{item.name}</span>
                    <span className="font-cinzel font-bold" style={{ color: '#B266FF' }}>{item.price}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <a href="/custom-orders" className="btn-primary inline-flex interactive">
                  Order Now →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
