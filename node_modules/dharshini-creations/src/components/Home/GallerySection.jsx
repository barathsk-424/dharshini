import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { galleryImages } from '../../data/mockData';
import { FiHeart, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Masonry from 'react-masonry-css';

const filters = ['All', 'Embroidery', 'Fabric Painting', 'Combo', 'Customer Orders'];
const filterMap = { 'All': 'all', 'Embroidery': 'embroidery', 'Fabric Painting': 'fabric-painting', 'Combo': 'combo', 'Customer Orders': 'customer' };

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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle">Our Portfolio</p>
          <h2 className="section-title glow-text">Gallery</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-poppins interactive transition-all"
              style={{ background: activeFilter === f ? 'linear-gradient(135deg, #8A2BE2, #B266FF)' : 'rgba(138,43,226,0.1)', color: activeFilter === f ? 'white' : '#B8B8B8', border: `1px solid ${activeFilter === f ? '#B266FF' : 'rgba(106,13,173,0.2)'}` }}>
              {f}
            </button>
          ))}
        </div>

        <Masonry breakpointCols={{ default: 3, 768: 2, 480: 1 }} className="masonry-grid" columnClassName="masonry-grid_column">
          {filtered.map((img, i) => (
            <motion.div key={img.id} className="mb-4 group relative rounded-2xl overflow-hidden interactive"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              style={{ height: heights[i % heights.length] }}
              onClick={() => setLightbox(img)} whileHover={{ scale: 1.02 }}>
              <div className="absolute inset-0" style={{ background: `linear-gradient(${135 + i * 30}deg, rgba(138,43,226,${0.15 + (i % 3) * 0.1}), rgba(20,10,40,0.85))` }} />
              <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-60">
                {img.category === 'embroidery' ? '🪡' : img.category === 'fabric-painting' ? '🎨' : img.category === 'combo' ? '✨' : '💜'}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-poppins font-semibold mb-1" style={{ color: '#F5F5F5' }}>{img.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#B8B8B8' }}>{img.category}</span>
                  <button onClick={e => { e.stopPropagation(); toggleLike(img.id); }}
                    className="flex items-center gap-1 text-xs interactive">
                    <FiHeart size={14} fill={likes[img.id] ? '#B266FF' : 'none'} color={likes[img.id] ? '#B266FF' : '#B8B8B8'} />
                    <span style={{ color: '#B8B8B8' }}>{img.likes + (likes[img.id] ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {lightbox && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}>
            <div className="relative max-w-2xl w-full mx-4 glass-card p-6" onClick={e => e.stopPropagation()}>
              <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 interactive z-10"><FiX size={20} color="#B8B8B8" /></button>
              <div className="aspect-video rounded-xl mb-4 flex items-center justify-center text-6xl" style={{ background: 'rgba(138,43,226,0.1)' }}>
                {lightbox.category === 'embroidery' ? '🪡' : lightbox.category === 'fabric-painting' ? '🎨' : '✨'}
              </div>
              <h3 className="font-cinzel text-xl font-semibold" style={{ color: '#F5F5F5' }}>{lightbox.title}</h3>
              <p className="text-sm mt-1" style={{ color: '#B8B8B8' }}>Category: {lightbox.category} • {lightbox.likes} likes</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
