import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { reviews } from '../data/mockData';
import { FiStar, FiPlay, FiCamera } from 'react-icons/fi';

const reviewAccents = ['#F472B6', '#38BDF8', '#FB923C', '#2DD4BF', '#818CF8', '#F59E0B'];

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState(reviews);
  const [filterRating, setFilterRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

  const filtered = filterRating === 0 ? reviewsList : reviewsList.filter(r => r.rating === filterRating);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      date: new Date().toISOString().split('T')[0],
      hasVideo: false
    };
    
    setReviewsList([reviewObj, ...reviewsList]);
    setShowForm(false);
    setNewReview({ name: '', comment: '', rating: 5 });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Reviews — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: 'var(--color-purple-glow)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Customer Love</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reviews</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <button onClick={() => setFilterRating(0)} className="px-4 py-2 rounded-full text-sm interactive transition-all"
              style={{ background: filterRating === 0 ? 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))' : 'rgba(124,58,237,0.1)', color: filterRating === 0 ? 'white' : 'var(--color-gray-dark)' }}>All</button>
            {[5, 4, 3, 2, 1].map(r => (
              <button key={r} onClick={() => setFilterRating(r)} className="px-3 py-2 rounded-full text-sm interactive flex items-center gap-1"
                style={{ background: filterRating === r ? 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))' : 'rgba(124,58,237,0.1)', color: filterRating === r ? 'white' : 'var(--color-gray-dark)' }}>
                {r} <FiStar size={10} />
              </button>
            ))}
          </div>
          <button onClick={() => setShowForm(true)} className="btn-ghost text-sm py-2 px-5 interactive flex items-center gap-2"><FiCamera size={14} /> Submit Review</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review, i) => {
            const accent = reviewAccents[i % reviewAccents.length];
            return (
              <motion.div key={review.id} className="glass-card p-6 relative" style={{ borderColor: `${accent}30` }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                {review.hasVideo && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${accent}33`, border: `1px solid ${accent}4d` }}>
                    <FiPlay size={12} color={accent} />
                  </div>
                )}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: accent }}>
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center text-lg font-bold" style="background:linear-gradient(135deg,var(--color-purple-primary),var(--color-purple-glow));color:white">${review.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-poppins font-semibold text-sm" style={{ color: 'var(--color-white)' }}>{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <FiStar key={j} size={12} fill={j < review.rating ? '#F59E0B' : 'none'} color={j < review.rating ? '#F59E0B' : 'var(--color-gray-dark)'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3 text-left" style={{ color: 'var(--color-gray-dark)' }}>"{review.comment}"</p>
                <p className="text-xs text-left" style={{ color: 'var(--color-gray-dark)' }}>{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Submit Review Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-6 w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white interactive">✕</button>
            <h3 className="font-cinzel text-xl font-bold mb-6 text-white text-left">Write a Review</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-2 text-left">Your Name</label>
                <input required value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-2 text-left">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button type="button" key={star} onClick={() => setNewReview({ ...newReview, rating: star })} className="interactive">
                      <FiStar size={24} fill={star <= newReview.rating ? '#F59E0B' : 'none'} color={star <= newReview.rating ? '#F59E0B' : 'var(--color-gray-dark)'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-2 text-left">Your Experience</label>
                <textarea required value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-purple-500 resize-none" placeholder="Tell us what you think..." />
              </div>
              <button type="submit" className="btn-primary w-full interactive mt-2">Submit Review</button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
