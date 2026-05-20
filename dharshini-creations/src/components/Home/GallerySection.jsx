import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/mockData';
import { FiHeart, FiX } from 'react-icons/fi';
import Masonry from 'react-masonry-css';

const filters = ['All', 'Embroidery', 'Fabric Painting', 'Combo', 'Customer Orders'];
const filterMap = { 'All': 'all', 'Embroidery': 'embroidery', 'Fabric Painting': 'fabric-painting', 'Combo': 'combo', 'Customer Orders': 'customer' };

// Unique color per filter/category
const filterColors = {
  'All': { accent: '#B266FF', bg: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  'Embroidery': { accent: '#2DD4BF', bg: 'linear-gradient(135deg, #14B8A6, #2DD4BF)' },
  'Fabric Painting': { accent: '#FB923C', bg: 'linear-gradient(135deg, #EA580C, #FB923C)' },
  'Combo': { accent: '#818CF8', bg: 'linear-gradient(135deg, #6366F1, #818CF8)' },
  'Customer Orders': { accent: '#F472B6', bg: 'linear-gradient(135deg, #EC4899, #F472B6)' },
};

const categoryAccent = {
  'embroidery': '#2DD4BF',
  'fabric-painting': '#FB923C',
  'combo': '#818CF8',
  'customer': '#F472B6',
};

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [likes, setLikes] = useState({});

  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filterMap[activeFilter]);

  const toggleLike = (id) => setLikes(p => ({ ...p, [id]: !p[id] }));

  const heights = [240, 320, 260, 360, 280, 300, 340, 240, 320, 280, 260, 360];

  return (
    <section ref={ref} className="relative gradient-bg">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#FB7185' }}>Our Portfolio</p>
          <h2 className="section-title glow-text">Gallery</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map(f => {
            const fc = filterColors[f];
            return (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-poppins interactive transition-all"
                style={{
                  background: activeFilter === f ? fc.bg : 'rgba(124,58,237,0.06)',
                  color: activeFilter === f ? 'white' : '#9CA3AF',
                  border: `1px solid ${activeFilter === f ? fc.accent : 'rgba(255,255,255,0.05)'}`,
                }}>
                {f}
              </button>
            );
          })}
        </div>

        <Masonry breakpointCols={{ default: 3, 768: 2, 480: 1 }} className="masonry-grid" columnClassName="masonry-grid_column">
          {filtered.map((img, i) => {
            const accent = categoryAccent[img.category] || '#B266FF';
            return (
              <motion.div key={img.id} className="mb-5 group relative rounded-3xl overflow-hidden interactive"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
                style={{ height: heights[i % heights.length] }}
                onClick={() => setLightbox(img)} whileHover={{ scale: 1.02 }}>
                {/* Real Image Render */}
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Soft obsidian gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/40 backdrop-blur-md border-t border-white/5">
                  <p className="text-sm font-poppins font-semibold mb-1 text-left" style={{ color: '#FAFAFA' }}>{img.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs capitalize font-semibold" style={{ color: accent }}>{img.category.replace('-', ' ')}</span>
                    <button onClick={e => { e.stopPropagation(); toggleLike(img.id); }}
                      className="flex items-center gap-1.5 text-xs interactive hover:scale-105 transition-transform">
                      <FiHeart size={14} fill={likes[img.id] ? accent : 'none'} color={likes[img.id] ? accent : '#9CA3AF'} />
                      <span style={{ color: '#9CA3AF' }}>{img.likes + (likes[img.id] ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </Masonry>

        {lightbox && (() => {
          const accent = categoryAccent[lightbox.category] || '#B266FF';
          return (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}>
              <div className="relative max-w-2xl w-full mx-4 glass-card p-6" onClick={e => e.stopPropagation()}>
                <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 z-10"><FiX size={20} color="#9CA3AF" /></button>
                <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
                  <img src={lightbox.src} alt={lightbox.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-cinzel text-xl font-semibold text-left" style={{ color: '#FAFAFA' }}>{lightbox.title}</h3>
                <p className="text-sm mt-1 text-left" style={{ color: '#9CA3AF' }}>Category: <span style={{ color: accent }}>{lightbox.category}</span> • {lightbox.likes} likes</p>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
