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
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              background: i % 2 === 0 ? 'rgba(178,102,255,0.3)' : 'rgba(138,43,226,0.2)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="font-great-vibes text-xl md:text-2xl mb-4"
              style={{ color: '#B266FF' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Handcrafted with Love
            </motion.p>

            <h1
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 glow-text"
              style={{
                background: 'linear-gradient(135deg, #F5F5F5 0%, #8A2BE2 50%, #B266FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dharshini<br />Creations
            </h1>

            <p className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed" style={{ color: '#B8B8B8' }}>
              Handcrafted Embroidery & Fabric Art — where every thread is woven with passion and every brushstroke tells a unique story.
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
              className="flex gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { num: '500+', label: 'Happy Customers' },
                { num: '1000+', label: 'Designs Crafted' },
                { num: '5★', label: 'Average Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-cinzel text-2xl font-bold" style={{ color: '#B266FF' }}>{stat.num}</p>
                  <p className="text-xs" style={{ color: '#666' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Shirt Mockup Area */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px]">
              {/* Glowing ring behind shirt */}
              <div className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Shirt SVG with embroidery glow */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                animate={{ rotateY: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 300 380" className="w-full h-full drop-shadow-2xl">
                  {/* T-shirt shape */}
                  <path
                    d="M75 80 L40 120 L70 140 L70 340 L230 340 L230 140 L260 120 L225 80 L190 100 Q150 120 110 100 Z"
                    fill="#1a1a1a"
                    stroke="rgba(138,43,226,0.4)"
                    strokeWidth="1.5"
                  />
                  {/* Collar */}
                  <path
                    d="M110 100 Q150 120 190 100 Q165 110 150 112 Q135 110 110 100"
                    fill="none"
                    stroke="rgba(178,102,255,0.6)"
                    strokeWidth="1"
                  />
                  {/* Embroidery design - floral */}
                  <motion.g
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <circle cx="150" cy="200" r="50" fill="none" stroke="#B266FF" strokeWidth="1" opacity="0.6" />
                    <circle cx="150" cy="200" r="35" fill="none" stroke="#8A2BE2" strokeWidth="1" opacity="0.8" />
                    <circle cx="150" cy="200" r="20" fill="none" stroke="#B266FF" strokeWidth="0.8" opacity="0.5" />
                    {/* Petals */}
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * Math.PI * 2) / 8;
                      const x1 = 150 + Math.cos(angle) * 25;
                      const y1 = 200 + Math.sin(angle) * 25;
                      const x2 = 150 + Math.cos(angle) * 55;
                      const y2 = 200 + Math.sin(angle) * 55;
                      return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="#B266FF" strokeWidth="1" opacity="0.5" />
                      );
                    })}
                    {/* Center flower */}
                    <circle cx="150" cy="200" r="8" fill="#B266FF" opacity="0.4" />
                    <text x="150" y="285" textAnchor="middle" fill="#B266FF" fontSize="24"
                      fontFamily="Great Vibes, cursive" opacity="0.9" filter="drop-shadow(0 0 2px rgba(178,102,255,0.5))">
                      Dharshini
                    </text>
                  </motion.g>

                  {/* Shine sweep effect */}
                  <motion.rect
                    x="70" y="80" width="30" height="260"
                    fill="url(#shineGrad)"
                    animate={{ x: [70, 230] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="rgba(178,102,255,0.08)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div className="absolute top-8 right-8 text-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >✨</motion.div>
              <motion.div className="absolute bottom-16 left-4 text-xl"
                animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >🌸</motion.div>
              <motion.div className="absolute top-24 left-0 text-lg"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
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
        <span className="text-xs font-poppins" style={{ color: '#666' }}>Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: '#6A0DAD' }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#B266FF' }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
