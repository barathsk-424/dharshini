import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiChevronLeft, FiChevronRight, FiUpload, FiImage, FiSave, FiCheckCircle } from 'react-icons/fi';
import { products, shirtColors } from '../data/mockData';
import { useCustomizationStore } from '../store/useStore';

const fonts = [
  { id: 'cursive', name: 'Elegant Cursive', family: 'var(--font-cinzel)' },
  { id: 'sans', name: 'Modern Sans', family: 'var(--font-poppins)' },
  { id: 'serif', name: 'Classic Serif', family: 'serif' },
  { id: 'script', name: 'Playful Script', family: 'cursive' }
];

export default function ProductCustomize() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  const { draft, saveDraft } = useCustomizationStore();

  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    size: '',
    quantity: 1,
    color: '',
    designDescription: '',
    customText: '',
    fontStyle: fonts[0].id,
    notes: '',
    referenceImage: null // Mocking upload with null/string
  });

  useEffect(() => {
    if (product) {
      if (draft && draft.productId === productId) {
        setFormData(draft);
      } else {
        setFormData({
          size: product.sizes?.[0] || 'Free Size',
          quantity: 1,
          color: product.colors?.[0] || 'Default',
          designDescription: '',
          customText: '',
          fontStyle: fonts[0].id,
          notes: '',
          referenceImage: null
        });
      }
      window.scrollTo(0, 0);
    }
  }, [product, productId, draft]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-xl text-red-400">Product Not Found</h2>
      </div>
    );
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveDraft = () => {
    saveDraft(productId, formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReview = () => {
    saveDraft(productId, formData);
    navigate(`/review/${productId}`);
  };

  const handleImageUpload = (e) => {
    // Mock image upload
    if (e.target.files && e.target.files[0]) {
      updateForm('referenceImage', URL.createObjectURL(e.target.files[0]));
    }
  };

  const selectedColorHex = shirtColors.find(c => c.name === formData.color)?.hex || '#ffffff';

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="section-container py-8 lg:py-16"
    >
      <Helmet><title>Customize {product.name} — Dharshini Creations</title></Helmet>

      <div className="flex items-center justify-between mb-8">
        <Link to={`/shop/${product.id}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors interactive">
          <FiChevronLeft size={16} /> Back to Product
        </Link>
        <button 
          onClick={handleSaveDraft}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors interactive"
        >
          {isSaved ? <FiCheckCircle size={16} className="text-emerald-400" /> : <FiSave size={16} />}
          {isSaved ? 'Draft Saved' : 'Save Draft'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
        
        {/* Left Column: Form Wrapper */}
        <div className="lg:col-span-7">
          <div className="glass-card p-4 sm:p-6 md:p-10 relative overflow-hidden min-h-[400px] sm:min-h-[500px] flex flex-col">
            
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -z-10 -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-purple-500 -z-10 -translate-y-1/2 transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-black/50 text-gray-500 border border-white/10'}`}
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-6">Base Configuration</h2>
                    
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <label className="text-xs font-semibold block mb-3 text-gray-300 uppercase tracking-widest">Base Color</label>
                        <div className="flex flex-wrap gap-3">
                          {product.colors.map(col => (
                            <button
                              key={col}
                              onClick={() => updateForm('color', col)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 interactive ${formData.color === col ? 'border-purple-500 bg-purple-500/10 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                            >
                              {col}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <label className="text-xs font-semibold block mb-3 text-gray-300 uppercase tracking-widest">Size</label>
                        <div className="flex flex-wrap gap-3">
                          {product.sizes.map(sz => (
                            <button
                              key={sz}
                              onClick={() => updateForm('size', sz)}
                              className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-300 interactive ${formData.size === sz ? 'border-purple-500 bg-purple-500/10 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-semibold block mb-3 text-gray-300 uppercase tracking-widest">Quantity</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="20" 
                        value={formData.quantity} 
                        onChange={(e) => updateForm('quantity', parseInt(e.target.value) || 1)}
                        className="w-24 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-center"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-6">Artwork & Design</h2>
                    
                    <div>
                      <label className="text-xs font-semibold block mb-2 text-gray-300 uppercase tracking-widest">Design Description</label>
                      <p className="text-[11px] text-gray-500 mb-3">Describe what you want painted or embroidered.</p>
                      <textarea 
                        rows="4" 
                        value={formData.designDescription}
                        onChange={(e) => updateForm('designDescription', e.target.value)}
                        placeholder="e.g. A small sunflower on the left chest, minimalist style..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-2 text-gray-300 uppercase tracking-widest">Reference Image</label>
                      <p className="text-[11px] text-gray-500 mb-3">Upload a design inspiration or reference image.</p>
                      
                      <div className="border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-2xl p-6 text-center transition-colors interactive">
                        {formData.referenceImage ? (
                          <div className="relative inline-block">
                            <img src={formData.referenceImage} alt="Reference" className="h-32 rounded-lg object-cover mx-auto shadow-lg" />
                            <button 
                              onClick={() => updateForm('referenceImage', null)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <input type="file" id="upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            <label htmlFor="upload" className="cursor-pointer flex flex-col items-center justify-center">
                              <FiUpload size={32} className="text-gray-400 mb-3" />
                              <span className="text-sm font-semibold text-purple-400">Click to upload</span>
                              <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-6">Typography</h2>
                    
                    <div>
                      <label className="text-xs font-semibold block mb-2 text-gray-300 uppercase tracking-widest">Custom Text / Name</label>
                      <p className="text-[11px] text-gray-500 mb-3">Text to include in the design (leave empty if none).</p>
                      <input 
                        type="text" 
                        value={formData.customText}
                        onChange={(e) => updateForm('customText', e.target.value)}
                        placeholder="e.g. Priya"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>

                    {formData.customText && (
                      <div>
                        <label className="text-xs font-semibold block mb-3 text-gray-300 uppercase tracking-widest">Font Style</label>
                        <div className="grid grid-cols-2 gap-4">
                          {fonts.map(font => (
                            <button
                              key={font.id}
                              onClick={() => updateForm('fontStyle', font.id)}
                              className={`p-4 rounded-xl border transition-all duration-300 interactive text-center ${formData.fontStyle === font.id ? 'border-purple-500 bg-purple-500/10 text-white shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                            >
                              <span style={{ fontFamily: font.family }} className="text-xl block mb-1">
                                {formData.customText}
                              </span>
                              <span className="text-[10px] uppercase tracking-widest opacity-50">{font.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                    <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-6">Final Details</h2>
                    
                    <div>
                      <label className="text-xs font-semibold block mb-2 text-gray-300 uppercase tracking-widest">Special Instructions / Notes</label>
                      <p className="text-[11px] text-gray-500 mb-3">Any final requests or details for the artist?</p>
                      <textarea 
                        rows="4" 
                        value={formData.notes}
                        onChange={(e) => updateForm('notes', e.target.value)}
                        placeholder="e.g. Make sure the colors are very bright..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                      ></textarea>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center mt-8">
                      <FiCheckCircle size={32} className="text-emerald-400 mx-auto mb-3" />
                      <h3 className="font-cinzel text-lg font-bold text-white mb-2">Ready to Review!</h3>
                      <p className="text-xs text-gray-400">Your custom creation has been configured. Continue to review pricing and select your order method.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
              <button 
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
              >
                <FiChevronLeft size={16} /> Back
              </button>

              {step < 4 ? (
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest bg-white text-black hover:bg-gray-200 transition-colors interactive"
                >
                  Next <FiChevronRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={handleReview}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105 interactive"
                  style={{ background: 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)' }}
                >
                  REVIEW ORDER <FiChevronRight size={16} />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 md:p-8 sticky top-24">
            <h3 className="font-cinzel text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
              Live Preview
              <span className="text-[10px] font-poppins text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md tracking-widest">AUTO-SAVING</span>
            </h3>

            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-2xl mb-6 group">
              {/* Product Background Mock Tint */}
              <div 
                className="absolute inset-0 transition-colors duration-500 mix-blend-color" 
                style={{ backgroundColor: selectedColorHex, opacity: 0.3 }} 
              />
              <img 
                src={product.image} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              {/* Overlay Text */}
              {formData.customText && (
                <div className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-2xl">
                  <span 
                    className="text-white text-3xl font-bold px-4 text-center break-words max-w-full"
                    style={{ 
                      fontFamily: fonts.find(f => f.id === formData.fontStyle)?.family,
                      textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                    }}
                  >
                    {formData.customText}
                  </span>
                </div>
              )}
              
              {/* Mock Overlay Image */}
              {formData.referenceImage && (
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-lg overflow-hidden border-2 border-white/50 shadow-2xl z-20">
                  <img src={formData.referenceImage} alt="Ref" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Product</span>
                <span className="text-white font-semibold">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Color</span>
                <span className="text-white font-semibold flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: selectedColorHex }}></span>
                  {formData.color || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Size</span>
                <span className="text-white font-semibold">{formData.size || 'Not selected'}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-white/10 text-lg">
                <span className="text-white font-bold">Estimated Base</span>
                <span className="font-cinzel font-bold text-purple-400">₹{product.basePrice * formData.quantity}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
