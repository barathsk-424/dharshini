import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const timeline = [
  { year: '2020', title: 'The Spark', desc: 'A needle, thread, and a dream — Dharshini began hand-embroidering small pieces for friends and family.' },
  { year: '2021', title: 'First 100 Orders', desc: 'Word spread through Instagram. The first 100 orders poured in, each more creative than the last.' },
  { year: '2022', title: 'Fabric Painting', desc: 'Expanded into hand-painted fabric art, blending painting with embroidery for truly unique pieces.' },
  { year: '2023', title: '500+ Happy Customers', desc: 'Reached 500+ satisfied customers, featured in local exhibitions and craft fairs across Tamil Nadu.' },
  { year: '2024', title: 'Going Digital', desc: 'Launched the official website with AI custom builder, bringing handcrafted luxury to your fingertips.' },
];

const values = [
  { emoji: '🪡', title: 'Handcrafted', desc: 'Every stitch is made by hand with meticulous attention to detail.' },
  { emoji: '🎨', title: 'Creative', desc: 'Unique designs that blend traditional art with modern aesthetics.' },
  { emoji: '💜', title: 'Passionate', desc: 'Born from a deep love for textile art and creative expression.' },
  { emoji: '✨', title: 'Premium', desc: 'Only the finest materials — premium threads, fabrics, and paints.' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>About — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[50vh] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Story</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>About Dharshini Creations</motion.h1>
          <motion.p className="text-base leading-relaxed" style={{ color: '#B8B8B8' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Born from a passion for needlework and fabric art, Dharshini Creations transforms ordinary fabric into extraordinary wearable art. Every piece is a labor of love, handcrafted in Tamil Nadu, India.
          </motion.p>
        </div>
      </section>

      <div ref={ref} className="section-container" style={{ paddingTop: 40 }}>
        {/* Artist Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div className="relative" initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(138,43,226,0.2), rgba(20,10,40,0.9))' }}>
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <div className="w-36 h-36 rounded-full flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)', boxShadow: '0 0 50px rgba(138,43,226,0.4)' }}>🪡</div>
                <p className="font-great-vibes text-4xl" style={{ color: '#B266FF' }}>Dharshini</p>
                <p className="text-sm" style={{ color: '#B8B8B8' }}>Artist & Founder</p>
              </div>
            </div>
            <motion.div className="absolute -top-4 -right-4 text-3xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>🌸</motion.div>
            <motion.div className="absolute -bottom-4 -left-4 text-3xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>✨</motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <h2 className="font-cinzel text-3xl font-bold mb-6 glow-text" style={{ color: '#F5F5F5' }}>Meet the Artist</h2>
            <blockquote className="text-lg italic leading-relaxed mb-6 pl-6" style={{ color: '#B8B8B8', borderLeft: '3px solid #8A2BE2' }}>
              "I believe that every piece of fabric holds a story waiting to be told through art. My mission is to bring your imagination to life, one stitch at a time."
            </blockquote>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#B8B8B8' }}>
              Dharshini is a self-taught textile artist from Tamil Nadu who discovered her passion for embroidery at a young age. What started as a hobby creating small pieces for friends has grown into a thriving brand that serves customers across India.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#B8B8B8' }}>
              Specializing in hand embroidery, fabric painting, and custom designs, Dharshini combines traditional techniques with modern aesthetics to create pieces that are truly one-of-a-kind.
            </p>
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(138,43,226,0.08)', border: '1px solid rgba(106,13,173,0.2)' }}>
              <p className="font-great-vibes text-2xl" style={{ color: '#B266FF' }}>— Dharshini</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="section-title glow-text mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h4 className="font-cinzel font-bold mb-2" style={{ color: '#F5F5F5' }}>{v.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#B8B8B8' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="section-title glow-text mb-10">Our Journey</h2>
          <div className="space-y-1">
            {timeline.map((item, i) => (
              <motion.div key={item.year} className="flex gap-4 items-start" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}>
                <div className="flex-shrink-0 w-16 text-right pt-1"><span className="font-cinzel font-bold text-sm" style={{ color: '#B266FF' }}>{item.year}</span></div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#8A2BE2', boxShadow: '0 0 10px rgba(138,43,226,0.5)' }} />
                  {i < timeline.length - 1 && <div className="w-px flex-1 min-h-[50px]" style={{ background: 'rgba(106,13,173,0.3)' }} />}
                </div>
                <div className="pb-6">
                  <p className="font-poppins font-semibold text-sm" style={{ color: '#F5F5F5' }}>{item.title}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: '#B8B8B8' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-card p-12 max-w-2xl mx-auto">
          <h3 className="font-cinzel text-2xl font-bold mb-4 glow-text" style={{ color: '#F5F5F5' }}>Let's Collaborate</h3>
          <p className="text-sm mb-6" style={{ color: '#B8B8B8' }}>Have a special project in mind? Let's create something beautiful together.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/custom-orders" className="btn-primary interactive">Start a Project</Link>
            <Link to="/contact" className="btn-ghost interactive">Get in Touch</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
