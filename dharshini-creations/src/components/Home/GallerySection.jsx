import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { galleryImages } from '../../data/mockData';
import { FiHeart, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Masonry from 'react-masonry-css';

const filters = ['All', 'Embroidery', 'Fabric Painting', 'Combo', 'Customer Orders'];
const filterMap = { 'All': 'all', 'Embroidery': 'embroidery', 'Fabric Painting': 'fabric-painting', 'Combo': 'combo', 'Customer Orders': 'customer' };

// Unique color per filter/category
const filterColors = {
  'All': { accent: '#B266FF', bg: 'linear-gradient(135deg, #8A2BE2, #B266FF)' },
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

  const heights = [220, 280, 200, 320, 240, 260, 300, 220, 280, 240, 200, 320];

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
                  background: activeFilter === f ? fc.bg : 'rgba(138,43,226,0.1)',
                  color: activeFilter === f ? 'white' : '#B8B8B8',
                  border: `1px solid ${activeFilter === f ? fc.accent : 'rgba(106,13,173,0.2)'}`,
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
              <motion.div key={img.id} className="mb-4 group relative rounded-2xl overflow-hidden interactive"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
                style={{ height: heights[i % heights.length] }}
                onClick={() => setLightbox(img)} whileHover={{ scale: 1.02 }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(${135 + i * 30}deg, ${accent}26, rgba(20,10,40,0.85))` }} />
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-60">
                  {img.category === 'embroidery' ? '🪡' : img.category === 'fabric-painting' ? '🎨' : img.category === 'combo' ? '✨' : '💜'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/45 backdrop-blur-md border-t border-white/10">
                  <p className="text-sm font-poppins font-semibold mb-1 text-left" style={{ color: '#F5F5F5' }}>{img.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs capitalize font-semibold" style={{ color: accent }}>{img.category.replace('-', ' ')}</span>
                    <button onClick={e => { e.stopPropagation(); toggleLike(img.id); }}
                      className="flex items-center gap-1 text-xs interactive hover:scale-105 transition-transform">
                      <FiHeart size={14} fill={likes[img.id] ? accent : 'none'} color={likes[img.id] ? accent : '#B8B8B8'} />
                      <span style={{ color: '#B8B8B8' }}>{img.likes + (likes[img.id] ? 1 : 0)}</span>
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
                <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 interactive z-10"><FiX size={20} color="#B8B8B8" /></button>
                <div className="aspect-video rounded-xl mb-4 flex items-center justify-center text-6xl" style={{ background: `${accent}1a` }}>
                  {lightbox.category === 'embroidery' ? '🪡' : lightbox.category === 'fabric-painting' ? '🎨' : '✨'}
                </div>
                <h3 className="font-cinzel text-xl font-semibold text-left" style={{ color: '#F5F5F5' }}>{lightbox.title}</h3>
                <p className="text-sm mt-1 text-left" style={{ color: '#B8B8B8' }}>Category: <span style={{ color: accent }}>{lightbox.category}</span> • {lightbox.likes} likes</p>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
