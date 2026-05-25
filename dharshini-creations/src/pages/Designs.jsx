import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiPenTool, FiArrowRight, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCustomizationStore } from '../store/useStore';
import { products } from '../data/mockData';

export default function Designs() {
  const { draft, clearDraft } = useCustomizationStore();
  
  // Find associated product if draft exists
  const product = draft ? products.find(p => p.id === draft.productId) || products[0] : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>Saved Designs — Dharshini Creations</title></Helmet>
      
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 mb-8">
          <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back to Profile</Link>
          <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3">
            <FiPenTool className="text-emerald-400" /> Saved Designs
          </h1>
        </motion.div>

        <motion.div className="glass-card p-6 md:p-8 relative overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {!draft ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
                <FiPenTool className="text-gray-400" size={24} />
              </div>
              <h3 className="font-cinzel text-xl text-white mb-2">No Saved Designs</h3>
              <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">You haven't saved any custom designs yet. Try our custom builder to create your own masterpiece.</p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 interactive">
                Start Creating <FiArrowRight />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-black/20 relative">
                {product && <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60" />}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {/* Visual representation of draft */}
                  <div className="text-center">
                    <span className="block text-2xl mb-2">{draft.graphic?.preview || '🎨'}</span>
                    <span className="font-cinzel font-bold text-white shadow-lg">{draft.customText || 'Custom Design'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl text-white font-bold">{product?.name || 'Custom Product'}</h3>
                    <p className="text-xs text-gray-400 mt-1">Last edited: {new Date(draft.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                    Draft
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Color</p>
                    <p className="text-sm font-medium text-white flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: draft.color?.hex || '#fff' }}></span>
                      {draft.color?.name || 'Standard'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Size</p>
                    <p className="text-sm font-medium text-white">{draft.size || 'M'}</p>
                  </div>
                  {draft.customText && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400 mb-1">Custom Text</p>
                      <p className="text-sm font-medium text-white font-great-vibes text-lg">"{draft.customText}"</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <Link to={`/customize/${draft.productId}`} className="btn-primary flex-1 interactive flex items-center justify-center gap-2">
                    <FiEdit2 size={16} /> Resume Editing
                  </Link>
                  <button onClick={clearDraft} className="p-3.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors interactive" title="Delete Draft">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
