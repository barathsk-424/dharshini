import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { FiCreditCard, FiTruck, FiCheckCircle, FiCopy, FiChevronLeft } from 'react-icons/fi';
import { useCartStore, useOrderStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/supabase';

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const { placeOrder, checkoutForm, setCheckoutForm } = useOrderStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Form state is now managed globally to persist across reloads
  const form = checkoutForm;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = getTotal();
  const shipping = subtotal > 1000 ? 0 : 80;
  const grandTotal = subtotal + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const update = (field, value) => {
    setCheckoutForm({ ...form, [field]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);

    // Place order in local store first (optimistic)
    const newOrder = placeOrder({
      shippingAddress: form,
      items,
      subtotal,
      shipping,
      total: grandTotal,
      paymentMethod,
    });

    // Persist to Supabase unconditionally (guest or logged in)
    const result = await createOrder({
      id:               newOrder.id,
      user_id:          currentUser ? currentUser.id : null,
      items:            items,
      subtotal:         subtotal,
      shipping:         shipping,
      total:            grandTotal,
      payment_method:   paymentMethod,
      status:           'pending',
      shipping_address: form,
    });
    if (!result.success) {
      console.warn('Order saved locally but Supabase sync failed:', result.error);
    }

    clearCart();
    setIsProcessing(false);
    setOrderSuccess(newOrder);
  };

  if (orderSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-[80vh] flex items-center justify-center section-container py-16"
      >
        <Helmet><title>Order Successful — Dharshini Creations</title></Helmet>
        <div className="glass-card p-6 sm:p-10 md:p-16 max-w-2xl w-full text-center relative overflow-hidden">
          {/* Confetti/Sparkles decorative background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
          >
            <FiCheckCircle size={48} className="text-emerald-400" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-3xl md:text-4xl font-bold mb-4 text-white glow-text"
          >
            Order Placed Successfully!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-8"
          >
            Thank you for choosing Dharshini Creations. Your handmade luxury is being prepared.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 inline-block text-left"
          >
            <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-2">Order Tracking ID</p>
            <div className="flex items-center gap-4">
              <span className="font-cinzel text-2xl font-bold text-white">{orderSuccess.id}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(orderSuccess.id)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors interactive"
                title="Copy Order ID"
              >
                <FiCopy size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/track-order" className="btn-primary w-full sm:w-auto">
              Track Your Order
            </Link>
            <Link to="/shop" className="btn-ghost w-full sm:w-auto">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <Helmet><title>Checkout — Dharshini Creations</title></Helmet>
        <h2 className="font-cinzel text-2xl font-bold text-gray-400 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some beautiful handmade items to your cart before checking out.</p>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="section-container py-8 lg:py-16"
    >
      <Helmet><title>Checkout — Dharshini Creations</title></Helmet>

      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-8 interactive">
        <FiChevronLeft size={16} /> Back to Shop
      </Link>

      <div className="text-center mb-8 sm:mb-12">
        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-2 glow-text">Secure Checkout</h1>
        <p className="text-gray-400 font-poppins">Complete your order directly through our website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="glass-card p-6 md:p-10">
            <h3 className="font-cinzel text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Shipping Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold block mb-2 text-gray-300">Full Name</label>
                  <input required type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Enter your full name" className="w-full" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-2 text-gray-300">Phone Number</label>
                  <input required type="text" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-2 text-gray-300">Email Address</label>
                <input required type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your.email@example.com" className="w-full" />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-2 text-gray-300">Street Address</label>
                <input required type="text" value={form.address} onChange={e => update('address', e.target.value)} placeholder="House/Flat No., Street Name, Landmark" className="w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold block mb-2 text-gray-300">City</label>
                  <input required type="text" value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" className="w-full" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-2 text-gray-300">State</label>
                  <input required type="text" value={form.state} onChange={e => update('state', e.target.value)} placeholder="State" className="w-full" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-2 text-gray-300">Pincode</label>
                  <input required type="text" value={form.pincode} onChange={e => update('pincode', e.target.value)} placeholder="XXXXXX" className="w-full" />
                </div>
              </div>
            </div>

            <h3 className="font-cinzel text-xl font-bold text-white mb-6 mt-12 border-b border-white/10 pb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label 
                className={`relative p-4 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col items-center justify-center gap-3 interactive ${paymentMethod === 'card' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                <FiCreditCard size={24} className={paymentMethod === 'card' ? 'text-purple-400' : 'text-gray-400'} />
                <span className={`text-sm font-semibold ${paymentMethod === 'card' ? 'text-purple-300' : 'text-gray-400'}`}>Card / NetBanking</span>
              </label>

              <label 
                className={`relative p-4 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col items-center justify-center gap-3 interactive ${paymentMethod === 'upi' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="sr-only" />
                <div className="w-6 h-6 flex items-center justify-center text-lg font-bold">UPI</div>
                <span className={`text-sm font-semibold ${paymentMethod === 'upi' ? 'text-purple-300' : 'text-gray-400'}`}>UPI / QR</span>
              </label>

              <label 
                className={`relative p-4 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col items-center justify-center gap-3 interactive ${paymentMethod === 'cod' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
                <FiTruck size={24} className={paymentMethod === 'cod' ? 'text-purple-400' : 'text-gray-400'} />
                <span className={`text-sm font-semibold text-center ${paymentMethod === 'cod' ? 'text-purple-300' : 'text-gray-400'}`}>Cash on Delivery</span>
              </label>
            </div>
          </form>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 md:p-8 sticky top-24">
            <h3 className="font-cinzel text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0 border border-white/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <span className="font-cinzel text-sm font-bold text-purple-300">
                      ₹{(item.basePrice || item.price || 0) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-semibold">₹{subtotal}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? "text-emerald-400 font-semibold" : "text-white font-semibold"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              
              {shipping > 0 && (
                <p className="text-[10px] text-emerald-500 text-right">
                  Add ₹{1000 - subtotal} more for free shipping
                </p>
              )}

              <div className="flex items-center justify-between text-lg pt-4 border-t border-white/10">
                <span className="text-white font-bold">Total</span>
                <span className="font-cinzel font-bold text-purple-400 glow-text">₹{grandTotal}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="w-full mt-8 btn-primary flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  PROCESSING...
                </span>
              ) : (
                `PLACE ORDER • ₹${grandTotal}`
              )}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
