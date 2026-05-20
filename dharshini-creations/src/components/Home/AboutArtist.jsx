import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Artist portrait from Unsplash
const artistImage = 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80';

// Unique color per timeline milestone
const timelineColors = ['#F472B6', '#38BDF8', '#FB923C', '#34D399', '#818CF8'];

export default function AboutArtist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const timeline = [
    { year: '2020', title: 'The Beginning', desc: 'Started with a passion for handmade art and a single needle.' },
    { year: '2021', title: 'First 100 Orders', desc: 'Grew from Instagram hobby to a recognized brand.' },
    { year: '2022', title: 'Fabric Painting Added', desc: 'Expanded into hand-painted fabric art and custom designs.' },
    { year: '2023', title: 'Brand Recognition', desc: '500+ happy customers and a growing community of art lovers.' },
    { year: '2024', title: 'Going Digital', desc: 'Launched the official Dharshini Creations website.' },
  ];

  return (
    <section ref={ref} className="relative gradient-bg overflow-hidden">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#F59E0B' }}>The Heart Behind the Art</p>
          <h2 className="section-title glow-text">About the Artist</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-8 items-center">
          {/* Artist image area */}
          <motion.div className="relative" initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden border border-white/10"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <img
                src={artistImage}
                alt="Dharshini — Artist & Founder"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.querySelector('.img-fallback')?.classList.remove('hidden');
                }}
              />
              <div className="img-fallback hidden absolute inset-0 flex items-center justify-center flex-col gap-4"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(20,10,40,0.9))' }}>
                <div className="w-32 h-32 rounded-full flex items-center justify-center text-5xl"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>
                  🪡
                </div>
                <p className="font-great-vibes text-3xl" style={{ color: '#FBBF24' }}>Dharshini</p>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>Artist & Founder</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="font-great-vibes text-3xl" style={{ color: '#FBBF24' }}>Dharshini</p>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>Artist & Founder</p>
              </div>
            </div>
            {/* Decorative elements */}
            <motion.div className="absolute -top-6 -right-6 text-4xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>🌸</motion.div>
            <motion.div className="absolute -bottom-4 -left-4 text-3xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>✨</motion.div>
          </motion.div>

          {/* Story & Timeline */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <blockquote className="text-lg italic leading-relaxed mb-8 pl-6 text-left" style={{ color: '#9CA3AF', borderLeft: '3px solid #F59E0B' }}>
              "Started with passion and handmade creativity, Dharshini Creations was born from a love for needlework and fabric art. Every piece we create carries a piece of our heart and soul."
            </blockquote>

            <div className="space-y-4">
              {timeline.map((item, i) => {
                const color = timelineColors[i % timelineColors.length];
                return (
                  <motion.div key={item.year} className="flex gap-4 items-start"
                    initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}>
                    <div className="flex-shrink-0 w-16 text-right">
                      <span className="font-cinzel font-bold text-sm" style={{ color }}>{item.year}</span>
                    </div>
                    <div className="relative flex-shrink-0 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}80` }} />
                      {i < timeline.length - 1 && <div className="w-px flex-1 min-h-[30px]" style={{ background: `${color}4d` }} />}
                    </div>
                    <div className="pb-4 text-left">
                      <p className="font-poppins font-semibold text-sm" style={{ color: '#FAFAFA' }}>{item.title}</p>
                      <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 p-4 rounded-xl text-center" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <p className="font-great-vibes text-2xl" style={{ color: '#FBBF24' }}>— Dharshini</p>
              <p className="text-xs mt-1" style={{ color: '#4B5563' }}>Founder & Lead Artist</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
