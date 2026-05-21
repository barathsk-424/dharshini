import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/mockData';
import { useCartStore, useUserStore } from '../store/useStore';
import { FiShoppingBag, FiHeart, FiChevronLeft, FiPlus, FiMinus, FiInfo, FiTruck, FiRefreshCw } from 'react-icons/fi';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  // Default selections
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [customText, setCustomText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('description');

  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  const { wishlist, toggleWishlist } = useUserStore();

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || 'Default');
      setSelectedSize(product.sizes?.[0] || 'Free Size');
      setQuantity(1);
      setCustomText('');
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-cinzel text-2xl font-bold text-red-400 mb-4">Product Not Found</h2>
        <p className="text-gray-400 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn-primary px-6 py-3 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, { color: selectedColor, size: selectedSize, customText });
    toggleCart(); // Open cart drawer for feedback
  };

  const handleBuyNow = () => {
    // Add to cart first
    addItem(product, { color: selectedColor, size: selectedSize, customText });
    
    // Construct WhatsApp message
    const message = `Hi! I would like to buy this product:
🛍️ *Product:* ${product.name}
🏷️ *Price:* ₹${product.basePrice}
🎨 *Color:* ${selectedColor}
📏 *Size:* ${selectedSize}
${customText ? `✍️ *Customization:* "${customText}"` : ''}
🔢 *Quantity:* ${quantity}

Please let me know how to proceed with my order!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  // Filter out current product for related items
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="section-container py-8 lg:py-16"
    >
      <Helmet>
        <title>{product.name} — Dharshini Creations</title>
        <meta name="description" content={product.description} />
      </Helmet>

      {/* Back button */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-8 interactive">
        <FiChevronLeft size={16} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image */}
        <div className="relative rounded-3xl overflow-hidden glass-card p-2 border border-white/5">
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {product.tags?.map((tag, idx) => (
              <span 
                key={tag} 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-600/90 text-white backdrop-blur-sm shadow-lg border border-purple-500/30"
                style={{ left: idx > 0 ? `${idx * 80 + 16}px` : '16px' }}
              >
                {tag}
              </span>
            ))}
            <button 
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center interactive"
              style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
            >
              <FiHeart size={18} fill={wishlist.includes(product.id) ? '#A78BFA' : 'none'} color={wishlist.includes(product.id) ? '#A78BFA' : 'white'} />
            </button>
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
            {product.categoryId === 1 ? 'Fabric Painting' : product.categoryId === 2 ? 'Embroidery Works' : 'Combo Works'}
          </span>
          <h1 className="font-cinzel text-3xl lg:text-4xl font-black mb-4 tracking-wide" style={{ color: '#FAFAFA' }}>
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-cinzel text-3xl font-bold" style={{ color: '#A78BFA' }}>
              ₹{product.basePrice * quantity}
            </span>
            {product.isCustomizable && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                CUSTOMIZABLE
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-8" style={{ color: '#9CA3AF' }}>
            {product.description}
          </p>

          {/* Configuration Options */}
          <div className="space-y-6 mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs font-bold tracking-wider text-gray-400 block mb-3 uppercase">Select Color</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className="px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-300 interactive"
                      style={{
                        borderColor: selectedColor === col ? '#A78BFA' : 'rgba(255,255,255,0.05)',
                        background: selectedColor === col ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
                        color: selectedColor === col ? '#A78BFA' : '#9CA3AF'
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="text-xs font-bold tracking-wider text-gray-400 block mb-3 uppercase">Select Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 interactive"
                      style={{
                        borderColor: selectedSize === sz ? '#A78BFA' : 'rgba(255,255,255,0.05)',
                        background: selectedSize === sz ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
                        color: selectedSize === sz ? '#A78BFA' : '#9CA3AF'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom text input */}
            {product.isCustomizable && (
              <div>
                <span className="text-xs font-bold tracking-wider text-gray-400 block mb-2 uppercase">Customization Text (Optional)</span>
                <p className="text-[11px] text-gray-500 mb-2">Enter the name, quote or phrase you want embroidered or painted.</p>
                <input
                  type="text"
                  placeholder="e.g. Priya, Believe in Yourself, etc."
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 text-white transition-colors"
                />
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-xs font-bold tracking-wider text-gray-400 block mb-3 uppercase">Quantity</span>
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 w-fit rounded-xl overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 text-gray-400 hover:text-white transition-colors interactive"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-white">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 text-gray-400 hover:text-white transition-colors interactive"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 border border-purple-500/30 text-purple-300 bg-purple-500/5 hover:bg-purple-500/10 transition-colors interactive"
            >
              <FiShoppingBag size={16} /> ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 text-white transition-transform duration-300 hover:scale-[1.02] interactive"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)' }}
            >
              BUY NOW via WhatsApp
            </button>
          </div>

          {/* Details Accordion */}
          <div className="border-t border-white/5 divide-y divide-white/5">
            {[
              { id: 'description', label: 'Product Details', icon: FiInfo, content: 'This unique piece is handcrafted to order. Since every design is hand-painted or hand-stitched individually, minor variations may occur, making your product truly one-of-a-kind. We use premium non-toxic fabric paints and durable embroidery threads designed to withstand regular wear and washing.' },
              { id: 'shipping', label: 'Shipping & Delivery', icon: FiTruck, content: 'As each piece is made to order, please allow 5-10 business days for crafting plus shipping time. We deliver all across India. Tracking link will be sent to you as soon as the package is dispatched.' },
              { id: 'care', label: 'Care Instructions', icon: FiRefreshCw, content: 'Hand wash gently in cold water with mild detergent. Turn the garment inside out before washing and ironing. Do not scrub directly on the painted or embroidered areas. Dry inside out in shade. Do not bleach or tumble dry.' }
            ].map(sec => (
              <div key={sec.id} className="py-4">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === sec.id ? '' : sec.id)}
                  className="w-full flex items-center justify-between font-poppins text-sm font-semibold text-gray-300 hover:text-white transition-colors py-1 text-left"
                >
                  <span className="flex items-center gap-2"><sec.icon size={16} className="text-purple-400" /> {sec.label}</span>
                  <span className="text-lg">{activeAccordion === sec.id ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccordion === sec.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs leading-relaxed text-gray-400 mt-3 pl-6">
                        {sec.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 border-t border-white/5 pt-16">
          <h3 className="font-cinzel text-2xl font-bold mb-8 text-left" style={{ color: '#FAFAFA' }}>
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link 
                to={`/shop/${p.id}`} 
                key={p.id} 
                className="glass-card overflow-hidden group interactive block"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="font-cinzel font-bold text-lg absolute bottom-4 left-4" style={{ color: '#A78BFA' }}>
                    ₹{p.basePrice}
                  </span>
                </div>
                <div className="p-4 text-left">
                  <h4 className="font-poppins font-semibold text-sm mb-1 truncate text-gray-200 group-hover:text-purple-400 transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
