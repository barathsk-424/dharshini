import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth < 768) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .interactive');
      setIsHovering(!!target);
    };

    const handleLeave = () => setIsVisible(false);

    const handleClick = (e) => {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / 6,
      }));
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.includes(p)));
      }, 800);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: pos.x - (isHovering ? 24 : 12),
          y: pos.y - (isHovering ? 24 : 12),
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
        style={{
          top: 0,
          left: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,102,255,0.6) 0%, rgba(138,43,226,0.3) 50%, transparent 70%)',
          mixBlendMode: 'screen',
          filter: 'blur(1px)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500 }}
        style={{
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#B266FF',
          boxShadow: '0 0 10px rgba(178,102,255,0.8)',
        }}
      />

      {/* Click heart particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="fixed pointer-events-none z-[9998] text-xs"
            initial={{ x: p.x - 6, y: p.y - 6, opacity: 1, scale: 1 }}
            animate={{
              x: p.x - 6 + Math.cos(p.angle) * 40,
              y: p.y - 6 + Math.sin(p.angle) * 40 - 20,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            💜
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
