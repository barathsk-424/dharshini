import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const timeline = [
  { year: '2026', title: 'Start', desc: 'A needle, thread, and a dream — Dharshini began hand-embroidering small pieces for friends and family.' },
  { year: '', title: '', desc: 'Expanded into hand-painted fabric art, blending painting with embroidery for truly unique pieces.' },
  { year: '', title: '', desc: 'Launched the official website with AI custom builder, bringing handcrafted luxury to your fingertips.' },
];

const timelineColors = ['#F472B6', '#38BDF8', '#FB923C', '#34D399', '#818CF8'];



export default function AboutArtist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative gradient-bg overflow-hidden">
      <div className="section-container">
        {/* Header - matches About page hero style */}
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="font-great-vibes text-2xl mb-2" style={{ color: 'var(--color-purple-glow)' }}>Our Story</p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold glow-text mb-4"
            style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            About Dharshini Creations
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--color-gray-dark)' }}>
            Born from a passion for needlework and fabric art, Dharshini Creations transforms ordinary fabric into extraordinary wearable art. Every piece is a labor of love, handcrafted in Tamil Nadu, India.
          </p>
        </motion.div>

        {/* Meet the Artist */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
            <h3 className="font-cinzel text-2xl font-bold mb-6 glow-text text-center" style={{ color: 'var(--color-white)' }}>Meet the Artist</h3>
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



        {/* Our Journey Timeline - matches About page timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <h3 className="section-title glow-text mb-10">Our Journey</h3>
          <div className="space-y-1">
            {timeline.map((item, i) => {
              const color = timelineColors[i % timelineColors.length];
              return (
                <motion.div key={i} className="flex gap-4 items-start" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}>
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

        {/* CTA - matches About page CTA */}
        <div className="text-center glass-card p-12 max-w-2xl mx-auto">
          <h3 className="font-cinzel text-2xl font-bold mb-4 glow-text" style={{ color: 'var(--color-white)' }}>Let's Collaborate</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-gray-dark)' }}>Have a special project in mind? Let's create something beautiful together.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact" className="btn-primary interactive">Start a Project</Link>
            <Link to="/contact" className="btn-ghost interactive">Get in Touch</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
