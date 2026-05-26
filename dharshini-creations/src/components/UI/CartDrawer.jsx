import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useUserStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const isAuthenticated = useUserStore(s => s.isAuthenticated);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toggleCart();
      navigate('/auth');
      return;
    }
    if (items.length === 0) return;

    let message = `Hi Dharshini Creations! I'd like to place an order for the following items:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Size: ${item.options.size || 'Default'}\n`;
      message += `   - Color: ${item.options.color || 'Default'}\n`;
      if (item.options.customText) {
        message += `   - Customization: "${item.options.customText}"\n`;
      }
      message += `   - Qty: ${item.quantity}\n`;
      message += `   - Price: ₹${(item.basePrice || item.price || 0) * item.quantity}\n\n`;
    });

    message += `*Total Order Value:* ₹${getTotal()}\n\n`;
    message += `Please confirm my order and let me know the payment details. Thanks!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918122459197?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md"
            >
              <div 
                className="h-full flex flex-col shadow-2xl border-l border-white/5"
                style={{
                  background: 'linear-gradient(180deg, #0C0816, #030206)',
                }}
              >
                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
                  <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                    <FiShoppingBag className="text-purple-400" /> YOUR CART
                  </h2>
                  <button
                    onClick={toggleCart}
                    className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all interactive"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <FiShoppingBag size={24} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400 mb-6">Your cart is empty.</p>
                      <button
                        onClick={toggleCart}
                        className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wider text-white interactive"
                        style={{ background: 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))' }}
                      >
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  ) : (
                    items.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col text-left">
                          <h4 className="font-poppins font-semibold text-xs text-white line-clamp-1">
                            {item.name}
                          </h4>
                          
                          {/* Config info */}
                          <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[10px] text-gray-400">
                            {item.options.size && <span>Size: <strong className="text-gray-200">{item.options.size}</strong></span>}
                            {item.options.color && <span>• Color: <strong className="text-gray-200">{item.options.color}</strong></span>}
                            {item.options.customText && (
                              <div className="w-full text-purple-300 truncate mt-0.5">
                                Custom: "{item.options.customText}"
                              </div>
                            )}
                          </div>

                          {/* Price and Adjusters */}
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <span className="font-cinzel text-xs font-bold text-purple-400">
                              ₹{(item.basePrice || item.price || 0) * item.quantity}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              {/* Adjuster */}
                              <div className="flex items-center bg-white/5 rounded-lg overflow-hidden border border-white/5">
                                <button
                                  onClick={() => updateQuantity(idx, item.quantity - 1)}
                                  className="p-1.5 text-gray-400 hover:text-white transition-colors interactive"
                                >
                                  <FiMinus size={10} />
                                </button>
                                <span className="w-6 text-center text-xs font-semibold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(idx, item.quantity + 1)}
                                  className="p-1.5 text-gray-400 hover:text-white transition-colors interactive"
                                >
                                  <FiPlus size={10} />
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(idx)}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors interactive"
                                title="Remove item"
                              >
                                <FiTrash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer / Summary */}
                {items.length > 0 && (
                  <div className="px-6 py-6 border-t border-white/5 bg-black/40 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-cinzel font-bold text-white text-lg">
                        ₹{getTotal()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 text-left">
                      Shipping and customizations are calculated at checkout.
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { toggleCart(); navigate('/checkout'); }}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 text-white transition-transform duration-300 hover:scale-[1.02] interactive"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))',
                          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.25)',
                        }}
                      >
                        <FiShoppingBag size={16} /> DIRECT WEBSITE ORDER
                      </button>
                      <button
                        onClick={handleCheckout}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 text-white transition-transform duration-300 hover:scale-[1.02] interactive"
                        style={{
                          background: 'linear-gradient(135deg, #25D366, #128C7E)',
                          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
                        }}
                      >
                        <FaWhatsapp size={16} /> CHECKOUT VIA WHATSAPP
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
