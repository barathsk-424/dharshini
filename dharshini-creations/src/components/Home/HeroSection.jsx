import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden gradient-mesh">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 1.5 + Math.random() * 3.5,
              height: 1.5 + Math.random() * 3.5,
              background: i % 2 === 0 ? 'rgba(167,139,250,0.25)' : 'rgba(124,58,237,0.15)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="section-container w-full relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <motion.p
              className="font-great-vibes text-2xl md:text-3xl mb-4"
              style={{ color: 'var(--color-purple-glow)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Handcrafted with Love
            </motion.p>

            <h1
              className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 glow-text tracking-wide"
              style={{
                background: 'linear-gradient(135deg, var(--color-white) 0%, var(--color-purple-primary) 50%, var(--color-purple-glow) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dharshini<br />Creations
            </h1>

            <p className="text-base md:text-lg mb-8 max-w-lg leading-relaxed font-normal" style={{ color: 'var(--color-gray-soft)' }}>
              Handcrafted Embroidery & Fabric Art — where every thread is woven with passion and every brushstroke tells a unique story of elegance and luxury.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary interactive">
                <span>✨</span> Explore Designs
              </Link>
              <Link to="/custom-orders" className="btn-ghost interactive">
                <span>🪡</span> Custom Order
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-10 mt-16 pt-8"
              style={{ borderTop: '1px solid var(--color-border-light, var(--color-border-light))' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[
                { num: '500+', label: 'Happy Customers' },
                { num: '1000+', label: 'Designs Crafted' },
                { num: '5★', label: 'Average Rating' },
              ].map(stat => (
                <div key={stat.label} className="text-left">
                  <p className="font-cinzel text-2xl md:text-3xl font-bold tracking-wider" style={{ color: 'var(--color-purple-glow)' }}>{stat.num}</p>
                  <p className="text-xs font-medium uppercase tracking-widest mt-1" style={{ color: 'var(--color-gray-dark)' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Shirt Mockup Area */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[320px] h-[400px] md:w-[420px] md:h-[520px]">
              {/* Glowing ring behind shirt */}
              <div className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                }}
              />

              {/* Shirt SVG with embroidery glow */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                animate={{ rotateY: [0, 8, -8, 0], y: [0, -6, 6, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 300 380" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  {/* T-shirt shape with premium luxury styling */}
                  <path
                    d="M75 80 L40 120 L70 140 L70 340 L230 340 L230 140 L260 120 L225 80 L190 100 Q150 120 110 100 Z"
                    fill="var(--color-bg-secondary)"
                    stroke="rgba(167, 139, 250, 0.3)"
                    strokeWidth="1.5"
                  />
                  {/* Collar */}
                  <path
                    d="M110 100 Q150 120 190 100 Q165 110 150 112 Q135 110 110 100"
                    fill="none"
                    stroke="rgba(167, 139, 250, 0.6)"
                    strokeWidth="1.2"
                  />
                  {/* Embroidery design - floral */}
                  <motion.g
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <circle cx="150" cy="200" r="50" fill="none" stroke="var(--color-purple-glow)" strokeWidth="1" opacity="0.4" />
                    <circle cx="150" cy="200" r="35" fill="none" stroke="var(--color-purple-primary)" strokeWidth="1" opacity="0.6" />
                    <circle cx="150" cy="200" r="20" fill="none" stroke="var(--color-purple-glow)" strokeWidth="0.8" opacity="0.4" />
                    {/* Petals */}
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * Math.PI * 2) / 8;
                      const x1 = 150 + Math.cos(angle) * 25;
                      const y1 = 200 + Math.sin(angle) * 25;
                      const x2 = 150 + Math.cos(angle) * 55;
                      const y2 = 200 + Math.sin(angle) * 55;
                      return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="var(--color-purple-glow)" strokeWidth="1" opacity="0.4" />
                      );
                    })}
                    {/* Center flower */}
                    <circle cx="150" cy="200" r="8" fill="var(--color-purple-glow)" opacity="0.3" />
                    <text x="150" y="285" textAnchor="middle" fill="var(--color-purple-glow)" fontSize="24"
                      fontFamily="Great Vibes, cursive" opacity="0.95" filter="drop-shadow(0 0 4px rgba(167,139,250,0.6))">
                      Dharshini
                    </text>
                  </motion.g>

                  {/* Shine sweep effect */}
                  <motion.rect
                    x="70" y="80" width="30" height="260"
                    fill="url(#shineGrad)"
                    animate={{ x: [70, 230] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="rgba(167,139,250,0.12)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div className="absolute top-8 right-8 text-2xl"
                animate={{ y: [0, -12, 0], rotate: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >✨</motion.div>
              <motion.div className="absolute bottom-16 left-4 text-xl"
                animate={{ y: [0, -10, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
              >🌸</motion.div>
              <motion.div className="absolute top-24 left-0 text-lg"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
              >🪡</motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-gray-dark)', fontSize: '9px' }}>Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border flex justify-center pt-1.5" style={{ borderColor: 'rgba(124, 58, 237, 0.4)' }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--color-purple-glow)' }}
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
