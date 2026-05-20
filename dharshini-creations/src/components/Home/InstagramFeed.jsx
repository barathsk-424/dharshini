import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { instagramPosts } from '../../data/mockData';
import { FiInstagram, FiExternalLink } from 'react-icons/fi';

// Unique gradient per post for visual variety
const postGradients = [
  'linear-gradient(135deg, rgba(131,58,180,0.3), rgba(10,5,20,0.9))',
  'linear-gradient(135deg, rgba(225,48,108,0.3), rgba(10,5,20,0.9))',
  'linear-gradient(135deg, rgba(247,119,55,0.3), rgba(10,5,20,0.9))',
  'linear-gradient(135deg, rgba(252,175,69,0.3), rgba(10,5,20,0.9))',
  'linear-gradient(135deg, rgba(64,93,230,0.3), rgba(10,5,20,0.9))',
  'linear-gradient(135deg, rgba(193,53,132,0.3), rgba(10,5,20,0.9))',
];

const postAccents = ['#833AB4', '#E1306C', '#F77737', '#FCAF45', '#405DE6', '#C13584'];

export default function InstagramFeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative gradient-bg">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#E1306C' }}>Follow Our Journey</p>
          <h2 className="section-title glow-text flex items-center justify-center gap-3">
            <FiInstagram style={{ color: '#E1306C' }} /> Instagram
          </h2>
        </motion.div>
        <div className="overflow-x-auto pb-4 -mx-6 px-6" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-5" style={{ width: 'max-content' }}>
            {instagramPosts.map((post, i) => {
              const accent = postAccents[i % postAccents.length];
              return (
                <motion.a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                  className="glass-card overflow-hidden flex-shrink-0 group interactive" style={{ width: 260 }}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}>
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute inset-0" style={{ background: postGradients[i % postGradients.length] }} />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">📸</div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)' }}>
                      <FiInstagram size={14} color="white" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 rounded-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
                        <FiExternalLink size={20} color="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs line-clamp-2 leading-relaxed text-left" style={{ color: '#B8B8B8' }}>{post.caption}</p>
                    <p className="text-[10px] mt-2 flex items-center gap-1" style={{ color: accent }}>
                      View on Instagram <FiExternalLink size={10} />
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
