import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiChevronLeft, FiShoppingBag, FiEdit2, FiImage, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { products, shirtColors } from '../data/mockData';
import { useCustomizationStore, useCartStore, useUserStore } from '../store/useStore';

export default function OrderReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  const { draft, clearDraft } = useCustomizationStore();
  const { addItem, toggleCart } = useCartStore();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!product || !draft || draft.productId !== productId) {
      navigate('/shop');
    }
    window.scrollTo(0, 0);
  }, [product, draft, productId, navigate]);

  if (!product || !draft || draft.productId !== productId) return null;

  const handleDirectWebsiteOrder = () => {
    // Add complex customized item to cart
    addItem(product, {
      color: draft.color,
      size: draft.size,
      customText: draft.customText,
      quantity: draft.quantity,
      designDescription: draft.designDescription,
      fontStyle: draft.fontStyle,
      notes: draft.notes,
      referenceImage: draft.referenceImage,
      isCustomized: true
    });
    
    // Clear draft and proceed to checkout
    clearDraft();
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {

    // Add to cart for local record tracking as well
    addItem(product, {
      color: draft.color,
      size: draft.size,
      customText: draft.customText,
      quantity: draft.quantity,
      designDescription: draft.designDescription,
      fontStyle: draft.fontStyle,
      notes: draft.notes,
      referenceImage: draft.referenceImage,
      isCustomized: true
    });

    const message = `*NEW CUSTOM ORDER REQUEST*
🛍️ *Product:* ${product.name}
🏷️ *Base Price:* ₹${product.basePrice}
🔢 *Quantity:* ${draft.quantity}
---------------------------
*CUSTOMIZATION DETAILS*
🎨 *Color:* ${draft.color}
📏 *Size:* ${draft.size}
🖌️ *Design:* ${draft.designDescription || 'N/A'}
✍️ *Custom Text:* ${draft.customText ? `"${draft.customText}" (Font: ${draft.fontStyle})` : 'N/A'}
📝 *Notes:* ${draft.notes || 'None'}
🖼️ *Reference Image:* ${draft.referenceImage ? 'Uploaded (Sent separately)' : 'None'}
---------------------------
*TOTAL BASE:* ₹${product.basePrice * draft.quantity}
Please let me know the final quote including shipping!`;

    clearDraft();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918122459197?text=${encoded}`, '_blank');
    navigate('/shop');
  };

  const selectedColorHex = shirtColors.find(c => c.name === draft.color)?.hex || '#ffffff';

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="section-container py-8 lg:py-16 max-w-5xl mx-auto"
    >
      <Helmet><title>Review Order — Dharshini Creations</title></Helmet>

      <div className="flex items-center justify-between mb-8">
        <Link to={`/customize/${product.id}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors interactive">
          <FiChevronLeft size={16} /> Edit Customization
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2 glow-text">Review Your Creation</h1>
        <p className="text-gray-400">Please review your customized details before placing the order.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
                  <div className="absolute inset-0 mix-blend-color opacity-30" style={{ backgroundColor: selectedColorHex }} />
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <h2 className="font-cinzel text-xl font-bold text-white">{product.name}</h2>
                  <p className="text-sm text-purple-400 mt-1">₹{product.basePrice} base price</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">CUSTOMIZED</span>
                </div>
              </div>
              <Link to={`/customize/${product.id}`} className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors interactive">
                <FiEdit2 size={16} />
              </Link>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Configuration Summary</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="block text-gray-500 text-xs mb-1">Color</span>
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: selectedColorHex }}></span>
                  {draft.color}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs mb-1">Size</span>
                <span className="font-semibold text-white">{draft.size}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs mb-1">Quantity</span>
                <span className="font-semibold text-white">{draft.quantity}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
              {draft.designDescription && (
                <div>
                  <span className="block text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Design Description</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{draft.designDescription}</p>
                </div>
              )}

              {draft.customText && (
                <div>
                  <span className="block text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Custom Text ({draft.fontStyle})</span>
                  <p className="text-white text-lg" style={{ fontFamily: draft.fontStyle === 'cursive' ? 'var(--font-cinzel)' : draft.fontStyle === 'sans' ? 'var(--font-poppins)' : 'cursive' }}>
                    "{draft.customText}"
                  </p>
                </div>
              )}

              {draft.notes && (
                <div>
                  <span className="block text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Special Instructions</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{draft.notes}</p>
                </div>
              )}

              {draft.referenceImage && (
                <div>
                  <span className="block text-gray-500 text-xs mb-2 uppercase tracking-wider font-semibold">Reference Image</span>
                  <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
                    <img src={draft.referenceImage} alt="Reference" className="w-12 h-12 rounded object-cover" />
                    <span className="text-xs text-gray-400 pr-4">Image Attached</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Actions */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 md:p-8 sticky top-24">
            <h3 className="font-cinzel text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Pricing Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Base Price</span>
                <span className="text-white">₹{product.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quantity</span>
                <span className="text-white">x {draft.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400">Customization Est.</span>
                <span className="text-emerald-400 text-xs">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-8 flex items-center justify-between">
              <span className="text-white font-bold text-lg">Base Total</span>
              <span className="font-cinzel font-bold text-2xl text-purple-400 glow-text">₹{product.basePrice * draft.quantity}</span>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Select Order Method</h3>

            <div className="space-y-4">
              <button
                onClick={handleDirectWebsiteOrder}
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 text-white transition-transform duration-300 hover:scale-[1.02] interactive"
                style={{ background: 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)' }}
              >
                <FiShoppingBag size={18} /> PLACE DIRECT ORDER
              </button>
              
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 text-white transition-transform duration-300 hover:scale-[1.02] interactive"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)' }}
              >
                <FaWhatsapp size={18} /> ORDER VIA WHATSAPP
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-500 mt-6 leading-relaxed">
              * By placing an order, you agree that customized items cannot be returned. Final shipping and customization complexity charges may apply.
            </p>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
