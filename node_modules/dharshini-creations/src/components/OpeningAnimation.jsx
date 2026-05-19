import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/useStore';

export default function OpeningAnimation() {
  const [phase, setPhase] = useState(0);
  const { markVisited } = useUIStore();

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => markVisited(), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [markVisited]);

  const handleSkip = () => markVisited();

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-sm font-poppins text-gray-500 hover:text-purple-400 transition-colors z-10"
        style={{ cursor: 'pointer' }}
      >
        Skip →
      </button>

      {/* Phase 1: Needle drawing thread */}
      <AnimatePresence>
        {phase >= 1 && phase < 4 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="400" height="200" viewBox="0 0 400 200" className="absolute">
              {/* Thread line */}
              <motion.path
                d="M 50 100 Q 100 50, 150 100 Q 200 150, 250 100 Q 300 50, 350 100"
                fill="none"
                stroke="url(#threadGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Needle */}
              <motion.g
                initial={{ x: 50, y: 100, opacity: 0 }}
                animate={{ x: 350, y: 100, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                <line x1="-5" y1="-5" x2="15" y2="-15" stroke="#B266FF" strokeWidth="2" />
                <circle cx="15" cy="-15" r="2" fill="#B266FF" />
              </motion.g>
              <defs>
                <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8A2BE2" />
                  <stop offset="100%" stopColor="#B266FF" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Brand Logo */}
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h1
              className="font-cinzel text-5xl md:text-7xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #8A2BE2, #B266FF, #F5F5F5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(138,43,226,0.5))',
              }}
            >
              Dharshini
            </motion.h1>
            <motion.h2
              className="font-cinzel text-2xl md:text-3xl tracking-[0.3em]"
              style={{ color: '#B266FF' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              CREATIONS
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Sparkle particles around logo */}
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 12) * (120 + Math.random() * 60),
                  y: Math.sin((i * Math.PI * 2) / 12) * (80 + Math.random() * 40),
                }}
                transition={{
                  duration: 1,
                  delay: 0.1 * i,
                  ease: 'easeOut',
                }}
                style={{
                  width: 4 + Math.random() * 4,
                  height: 4 + Math.random() * 4,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#B266FF' : '#8A2BE2',
                  boxShadow: `0 0 ${10 + Math.random() * 10}px ${i % 2 === 0 ? '#B266FF' : '#8A2BE2'}`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Phase 3: Tagline */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.p
            className="absolute font-great-vibes text-2xl md:text-4xl"
            style={{
              color: '#B266FF',
              textShadow: '0 0 20px rgba(178,102,255,0.5)',
              bottom: '35%',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Every Stitch Tells A Story
          </motion.p>
        )}
      </AnimatePresence>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(138,43,226,0.08) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  );
}
