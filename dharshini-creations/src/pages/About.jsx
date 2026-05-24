import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const artistImage = 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80';

const timeline = [
  { year: '2026', title: 'Start', desc: 'A needle, thread, and a dream — Dharshini began hand-embroidering small pieces for friends and family.' },
  { year: '', title: '', desc: 'Expanded into hand-painted fabric art, blending painting with embroidery for truly unique pieces.' },
  { year: '', title: '', desc: 'Launched the official website with AI custom builder, bringing handcrafted luxury to your fingertips.' },
];

const timelineColors = ['#F472B6', '#38BDF8', '#FB923C', '#34D399', '#818CF8'];

const values = [
  { emoji: '🪡', title: 'Handcrafted', desc: 'Every stitch is made by hand with meticulous attention to detail.', image: 'https://images.unsplash.com/photo-1617058998014-a13b69286e9f?auto=format&fit=crop&w=400&q=80' },
  { emoji: '🎨', title: 'Creative', desc: 'Unique designs that blend traditional art with modern aesthetics.', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
  { emoji: '💜', title: 'Passionate', desc: 'Born from a deep love for textile art and creative expression.', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80' },
  { emoji: '✨', title: 'Premium', desc: 'Only the finest materials — premium threads, fabrics, and paints.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>About — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[50vh] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: 'var(--color-purple-glow)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Story</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>About Dharshini Creations</motion.h1>
          <motion.p className="text-base leading-relaxed" style={{ color: 'var(--color-gray-dark)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Born from a passion for needlework and fabric art, Dharshini Creations transforms ordinary fabric into extraordinary wearable art. Every piece is a labor of love, handcrafted in Tamil Nadu, India.
          </motion.p>
        </div>
      </section>

      <div ref={ref} className="section-container" style={{ paddingTop: 40 }}>
        {/* Artist Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
            <h2 className="font-cinzel text-3xl font-bold mb-6 glow-text text-center" style={{ color: 'var(--color-white)' }}>Meet the Artist</h2>
            <blockquote className="text-lg italic leading-relaxed mb-6 pl-6 text-left" style={{ color: 'var(--color-gray-dark)', borderLeft: '3px solid var(--color-purple-primary)' }}>
              "I believe that every piece of fabric holds a story waiting to be told through art. My mission is to bring your imagination to life, one stitch at a time."
            </blockquote>
            <p className="text-sm leading-relaxed mb-4 text-left" style={{ color: 'var(--color-gray-dark)' }}>
              Dharshini is a self-taught textile artist from Tamil Nadu who discovered her passion for embroidery at a young age. What started as a hobby creating small pieces for friends has grown into a thriving brand that serves customers across India.
            </p>
            <p className="text-sm leading-relaxed text-left" style={{ color: 'var(--color-gray-dark)' }}>
              Specializing in hand embroidery, fabric painting, and custom designs, Dharshini combines traditional techniques with modern aesthetics to create pieces that are truly one-of-a-kind.
            </p>
            <div className="mt-6 p-4 rounded-xl text-center" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}>
              <p className="font-great-vibes text-2xl" style={{ color: 'var(--color-purple-glow)' }}>— Dharshini</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="section-title glow-text mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} className="glass-card overflow-hidden group" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
                <div className="relative h-36 overflow-hidden">
                  <img src={v.image} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-3xl">{v.emoji}</div>
                </div>
                <div className="p-5 text-center">
                  <h4 className="font-cinzel font-bold mb-2" style={{ color: 'var(--color-white)' }}>{v.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-gray-dark)' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="section-title glow-text mb-10">Our Journey</h2>
          <div className="space-y-1">
            {timeline.map((item, i) => {
              const color = timelineColors[i % timelineColors.length];
              return (
                <motion.div key={item.year} className="flex gap-4 items-start" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}>
                  <div className="flex-shrink-0 w-16 text-right pt-1"><span className="font-cinzel font-bold text-sm" style={{ color }}>{item.year}</span></div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}80` }} />
                    {i < timeline.length - 1 && <div className="w-px flex-1 min-h-[50px]" style={{ background: `${color}4d` }} />}
                  </div>
                  <div className="pb-6 text-left">
                    <p className="font-poppins font-semibold text-sm" style={{ color: 'var(--color-white)' }}>{item.title}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-gray-dark)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-card p-12 max-w-2xl mx-auto">
          <h3 className="font-cinzel text-2xl font-bold mb-4 glow-text" style={{ color: 'var(--color-white)' }}>Let's Collaborate</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-gray-dark)' }}>Have a special project in mind? Let's create something beautiful together.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/custom-orders" className="btn-primary interactive">Start a Project</Link>
            <Link to="/contact" className="btn-ghost interactive">Get in Touch</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
