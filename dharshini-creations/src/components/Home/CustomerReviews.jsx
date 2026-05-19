import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { reviews } from '../../data/mockData';
import { FiStar, FiPlay } from 'react-icons/fi';

export default function CustomerReviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle">What They Say</p>
          <h2 className="section-title glow-text">Customer Reviews</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {reviews.map((review, i) => (
            <motion.div key={review.id} className="glass-card p-6 relative"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}>
              {review.hasVideo && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center interactive"
                  style={{ background: 'rgba(138,43,226,0.3)', border: '1px solid rgba(178,102,255,0.4)' }}>
                  <FiPlay size={12} color="#B266FF" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)', color: 'white' }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-poppins font-semibold text-sm" style={{ color: '#F5F5F5' }}>{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <FiStar key={j} size={12} fill={j < review.rating ? '#D4AF37' : 'none'} color={j < review.rating ? '#D4AF37' : '#666'} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#B8B8B8' }}>"{review.comment}"</p>
              <p className="text-xs" style={{ color: '#666' }}>{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
