import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { galleryImages } from '../data/mockData';
import { FiHeart, FiUpload, FiX } from 'react-icons/fi';

const filters = ['All', 'Embroidery', 'Fabric Painting', 'Combo', 'Customer Orders'];
const filterMap = { 'All': 'all', 'Embroidery': 'embroidery', 'Fabric Painting': 'fabric-painting', 'Combo': 'combo', 'Customer Orders': 'customer' };
const categoryAccent = { 'embroidery': '#2DD4BF', 'fabric-painting': '#FB923C', 'combo': '#818CF8', 'customer': '#F472B6' };

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [likes, setLikes] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filterMap[activeFilter]);
  const heights = [260, 340, 220, 380, 280, 300, 350, 240, 320, 260, 230, 360];

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    const fb = e.target.parentElement.querySelector('.img-fallback');
    if (fb) fb.classList.remove('hidden');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Gallery — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center px-4">
        <div className="text-center w-full max-w-lg">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: 'var(--color-purple-glow)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Portfolio</motion.p>
          <motion.h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gallery</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="px-4 py-2 rounded-full text-sm font-poppins interactive transition-all"
                style={{ background: activeFilter === f ? 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))' : 'rgba(124,58,237,0.1)', color: activeFilter === f ? 'white' : 'var(--color-gray-dark)', border: `1px solid ${activeFilter === f ? 'var(--color-purple-glow)' : 'var(--color-border-light, var(--color-border-light))'}` }}>
                {f}
              </button>
            ))}
          </div>
          <button className="btn-ghost text-sm py-2 px-5 interactive flex items-center gap-2"><FiUpload size={14} /> Upload Your Creation</button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((img, i) => {
            const accent = categoryAccent[img.category] || 'var(--color-purple-glow)';
            return (
              <motion.div key={img.id} className="mb-4 group relative rounded-2xl overflow-hidden interactive break-inside-avoid"
                style={{ height: heights[i % heights.length] }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                onClick={() => setLightbox(img)} whileHover={{ scale: 1.02 }}>
                <img src={img.src} alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy" onError={handleImgError} />
                <div className="img-fallback hidden absolute inset-0 flex items-center justify-center text-5xl opacity-50"
                  style={{ background: `linear-gradient(135deg, ${accent}33, rgba(12,8,22,0.85))` }}>
                  {img.category === 'embroidery' ? '🪡' : img.category === 'fabric-painting' ? '🎨' : img.category === 'combo' ? '✨' : '💜'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm border-t border-white/5">
                  <p className="text-sm font-semibold mb-1 text-left" style={{ color: 'var(--color-white)' }}>{img.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs capitalize font-semibold" style={{ color: accent }}>{img.category.replace('-', ' ')}</span>
                    <button onClick={e => { e.stopPropagation(); setLikes(p => ({ ...p, [img.id]: !p[img.id] })); }} className="flex items-center gap-1 interactive">
                      <FiHeart size={14} fill={likes[img.id] ? accent : 'none'} color={likes[img.id] ? accent : 'var(--color-gray-dark)'} />
                      <span className="text-xs" style={{ color: 'var(--color-gray-dark)' }}>{img.likes + (likes[img.id] ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {lightbox && (() => {
        const accent = categoryAccent[lightbox.category] || 'var(--color-purple-glow)';
        return (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}>
            <div className="glass-card p-6 max-w-2xl w-full mx-4 relative" style={{ background: 'rgba(10,5,20,0.95)' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 interactive z-10"><FiX size={20} color="var(--color-gray-dark)" /></button>
              <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-white/10">
                <img src={lightbox.src} alt={lightbox.title} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
              </div>
              <h3 className="font-cinzel text-xl font-semibold text-left" style={{ color: 'var(--color-white)' }}>{lightbox.title}</h3>
              <p className="text-sm mt-1 text-left" style={{ color: 'var(--color-gray-dark)' }}>Category: <span style={{ color: accent }}>{lightbox.category}</span> • {lightbox.likes} likes</p>
            </div>
          </motion.div>
        );
      })()}
    </motion.div>
  );
}
