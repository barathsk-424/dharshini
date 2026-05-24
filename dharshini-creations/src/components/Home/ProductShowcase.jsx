import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/mockData';
import { useCartStore } from '../../store/useStore';
import { FiShoppingBag, FiEye } from 'react-icons/fi';

/* Accent color per category */
const categoryAccent = {
  1: '#FB923C',  // Fabric Painting
  2: '#2DD4BF',  // Embroidery
  3: '#F59E0B',  // Combo
};

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const addItem = useCartStore(s => s.addItem);

  /* Show a curated selection: pick first 6 products */
  const showcaseItems = products.slice(0, 6);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle" style={{ color: '#FB923C' }}>Curated for You</p>
          <h2 className="section-title glow-text">Popular Picks</h2>
        </motion.div>

        {/* Horizontal scrollable product ribbon */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {showcaseItems.map((product, i) => {
              const accent = categoryAccent[product.categoryId] || '#B266FF';
              return (
                <Link key={product.id} to={`/shop/${product.id}`} className="block">
                  <motion.div
                    className="glass-card overflow-hidden group interactive flex-shrink-0"
                    style={{ width: 280 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Customizable badge */}
                      {product.isCustomizable && (
                        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                          Customizable
                        </span>
                      )}

                      {/* Quick view */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 interactive"
                          style={{
                            background: `${accent}cc`,
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            border: `1px solid ${accent}80`,
                          }}>
                          <FiEye size={14} /> View Details
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="font-poppins font-semibold text-sm mb-1 truncate text-left" style={{ color: '#F5F5F5' }}>
                        {product.name}
                      </h4>
                      <p className="text-xs mb-3 line-clamp-2 text-left" style={{ color: '#E5E7EB' }}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-cinzel font-bold text-lg" style={{ color: accent }}>
                          ₹{product.basePrice}+
                        </span>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); }}
                          className="p-2.5 rounded-full interactive transition-all hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                            boxShadow: `0 0 15px ${accent}4d`,
                          }}
                        >
                          <FiShoppingBag size={14} color="white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link to="/shop" className="btn-ghost interactive inline-flex">
            View Full Menu →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
