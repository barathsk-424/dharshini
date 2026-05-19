import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { reviews } from '../data/mockData';
import { FiStar, FiPlay, FiCamera } from 'react-icons/fi';

export default function Reviews() {
  const [filterRating, setFilterRating] = useState(0);
  const filtered = filterRating === 0 ? reviews : reviews.filter(r => r.rating === filterRating);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Reviews — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Customer Love</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reviews</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <button onClick={() => setFilterRating(0)} className="px-4 py-2 rounded-full text-sm interactive transition-all"
              style={{ background: filterRating === 0 ? 'linear-gradient(135deg, #8A2BE2, #B266FF)' : 'rgba(138,43,226,0.1)', color: filterRating === 0 ? 'white' : '#B8B8B8' }}>All</button>
            {[5, 4, 3, 2, 1].map(r => (
              <button key={r} onClick={() => setFilterRating(r)} className="px-3 py-2 rounded-full text-sm interactive flex items-center gap-1"
                style={{ background: filterRating === r ? 'linear-gradient(135deg, #8A2BE2, #B266FF)' : 'rgba(138,43,226,0.1)', color: filterRating === r ? 'white' : '#B8B8B8' }}>
                {r} <FiStar size={10} />
              </button>
            ))}
          </div>
          <button className="btn-ghost text-sm py-2 px-5 interactive flex items-center gap-2"><FiCamera size={14} /> Submit Review</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review, i) => (
            <motion.div key={review.id} className="glass-card p-6 relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
              {review.hasVideo && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(138,43,226,0.3)', border: '1px solid rgba(178,102,255,0.4)' }}>
                  <FiPlay size={12} color="#B266FF" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)', color: 'white' }}>{review.name.charAt(0)}</div>
                <div>
                  <p className="font-poppins font-semibold text-sm" style={{ color: '#F5F5F5' }}>{review.name}</p>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <FiStar key={j} size={12} fill={j < review.rating ? '#D4AF37' : 'none'} color={j < review.rating ? '#D4AF37' : '#666'} />)}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#B8B8B8' }}>"{review.comment}"</p>
              <p className="text-xs" style={{ color: '#666' }}>{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
