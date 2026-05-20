import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi%20Dharshini!%20I'm%20interested%20in%20your%20creations."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 lg:left-6 lg:right-auto lg:bottom-8 z-50 w-14 h-14 rounded-full flex items-center justify-center interactive"
      style={{
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
      }}
      whileHover={{ scale: 1.1, boxShadow: '0 6px 30px rgba(37, 211, 102, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} color="white" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#25D366' }} />
    </motion.a>
  );
}
