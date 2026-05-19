import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-masonry-css';
import { galleryImages } from '../data/mockData';
import { FiHeart, FiFilter, FiUpload, FiX } from 'react-icons/fi';

const filters = ['All', 'Embroidery', 'Fabric Painting', 'Combo', 'Customer Orders'];
const filterMap = { 'All': 'all', 'Embroidery': 'embroidery', 'Fabric Painting': 'fabric-painting', 'Combo': 'combo', 'Customer Orders': 'customer' };

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [likes, setLikes] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filterMap[activeFilter]);
  const heights = [260, 340, 220, 380, 280, 300, 350, 240, 320, 260, 230, 360];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Gallery — Dharshini Creations</title></Helmet>

      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Portfolio</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gallery</motion.h1>
        </div>
      </section>

      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="px-4 py-2 rounded-full text-sm font-poppins interactive transition-all"
                style={{ background: activeFilter === f ? 'linear-gradient(135deg, #8A2BE2, #B266FF)' : 'rgba(138,43,226,0.1)', color: activeFilter === f ? 'white' : '#B8B8B8', border: `1px solid ${activeFilter === f ? '#B266FF' : 'rgba(106,13,173,0.2)'}` }}>
                {f}
              </button>
            ))}
          </div>
          <button className="btn-ghost text-sm py-2 px-5 interactive flex items-center gap-2"><FiUpload size={14} /> Upload Your Creation</button>
        </div>

        <Masonry breakpointCols={{ default: 3, 768: 2, 480: 1 }} className="masonry-grid" columnClassName="masonry-grid_column">
          {filtered.map((img, i) => (
            <motion.div key={img.id} className="mb-4 group relative rounded-2xl overflow-hidden interactive"
              style={{ height: heights[i % heights.length] }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              onClick={() => setLightbox(img)} whileHover={{ scale: 1.02 }}>
              <div className="absolute inset-0" style={{ background: `linear-gradient(${135 + i * 30}deg, rgba(138,43,226,${0.12 + (i % 4) * 0.08}), rgba(20,10,40,0.85))` }} />
              <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-50">
                {img.category === 'embroidery' ? '🪡' : img.category === 'fabric-painting' ? '🎨' : img.category === 'combo' ? '✨' : '💜'}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-semibold mb-1" style={{ color: '#F5F5F5' }}>{img.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs capitalize" style={{ color: '#B8B8B8' }}>{img.category}</span>
                  <button onClick={e => { e.stopPropagation(); setLikes(p => ({ ...p, [img.id]: !p[img.id] })); }} className="flex items-center gap-1 interactive">
                    <FiHeart size={14} fill={likes[img.id] ? '#B266FF' : 'none'} color={likes[img.id] ? '#B266FF' : '#B8B8B8'} />
                    <span className="text-xs" style={{ color: '#B8B8B8' }}>{img.likes + (likes[img.id] ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {lightbox && (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}>
          <div className="glass-card p-6 max-w-2xl w-full mx-4 relative" style={{ background: 'rgba(10,5,20,0.95)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 interactive"><FiX size={20} color="#B8B8B8" /></button>
            <div className="aspect-video rounded-xl mb-4 flex items-center justify-center text-7xl" style={{ background: 'rgba(138,43,226,0.1)' }}>
              {lightbox.category === 'embroidery' ? '🪡' : lightbox.category === 'fabric-painting' ? '🎨' : '✨'}
            </div>
            <h3 className="font-cinzel text-xl font-semibold" style={{ color: '#F5F5F5' }}>{lightbox.title}</h3>
            <p className="text-sm mt-1" style={{ color: '#B8B8B8' }}>Category: {lightbox.category} • {lightbox.likes} likes</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
