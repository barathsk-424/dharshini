import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { reviews } from '../../data/mockData';
import { FiStar, FiPlay } from 'react-icons/fi';

// Unique accent color per review card for visual variety
const reviewAccents = ['#F472B6', '#38BDF8', '#FB923C', '#2DD4BF', '#818CF8', '#F59E0B'];

export default function CustomerReviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#F59E0B' }}>What They Say</p>
          <h2 className="section-title glow-text">Customer Reviews</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {reviews.map((review, i) => {
            const accent = reviewAccents[i % reviewAccents.length];
            return (
              <motion.div key={review.id} className="glass-card p-6 relative"
                style={{ borderColor: `${accent}40` }}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}>
                {review.hasVideo && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center interactive"
                    style={{ background: `${accent}4d`, border: `1px solid ${accent}66` }}>
                    <FiPlay size={12} color={accent} />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: 'white' }}>
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-poppins font-semibold text-sm" style={{ color: '#F5F5F5' }}>{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <FiStar key={j} size={12} fill={j < review.rating ? '#D4AF37' : 'none'} color={j < review.rating ? '#D4AF37' : '#666'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3 text-left" style={{ color: '#B8B8B8' }}>"{review.comment}"</p>
                <p className="text-xs text-left" style={{ color: '#666' }}>{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
