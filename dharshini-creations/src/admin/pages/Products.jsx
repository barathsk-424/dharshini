import React, { useState, useRef } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiImage, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Mock Data
  const [products, setProducts] = useState([
    { id: 'PROD-001', name: 'Classic Black Hoodie', category: 'Hoodies', price: 45.00, stock: 120, status: 'In Stock' },
    { id: 'PROD-002', name: 'White Signature T-Shirt', category: 'T-Shirts', price: 25.00, stock: 0, status: 'Out of Stock' },
    { id: 'PROD-003', name: 'Ceramic Coffee Mug', category: 'Accessories', price: 15.00, stock: 45, status: 'In Stock' },
    { id: 'PROD-004', name: 'Embroidered Cap', category: 'Hats', price: 20.00, stock: 12, status: 'Low Stock' },
  ]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold font-cinzel text-white mb-2 tracking-wider">Product Management</h2>
          <p className="text-sm text-gray-400 font-poppins">Add, edit, and track inventory levels.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] text-white rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all duration-300 font-poppins placeholder-gray-500 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => { setPreviewImage(null); setIsModalOpen(true); }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-2xl hover:from-violet-500 hover:to-fuchsia-500 transition-all font-bold tracking-wider font-cinzel whitespace-nowrap shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
          >
            <FiPlus size={20} /> Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="overflow-x-auto p-4 relative z-10">
          <table className="w-full text-left border-collapse min-w-[900px] font-poppins">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="py-5 px-6 font-semibold">Product ID</th>
                <th className="py-5 px-6 font-semibold">Name</th>
                <th className="py-5 px-6 font-semibold">Category</th>
                <th className="py-5 px-6 font-semibold text-right">Price</th>
                <th className="py-5 px-6 font-semibold text-right">Stock</th>
                <th className="py-5 px-6 font-semibold">Status</th>
                <th className="py-5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.04] transition-colors rounded-2xl group/row">
                  <td className="py-4 px-6 font-semibold font-cinzel text-lg text-violet-400 group-hover/row:text-violet-300 transition-colors tracking-wide">{product.id}</td>
                  <td className="py-4 px-6 font-medium text-white group-hover/row:text-fuchsia-300 transition-colors">{product.name}</td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{product.category}</td>
                  <td className="py-4 px-6 text-white font-bold text-right">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-white font-bold text-right">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${
                      product.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      product.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all shadow-lg" title="Edit Product">
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-rose-500/50 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-all shadow-lg" 
                        title="Delete Product"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiSearch size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-cinzel">No products found.</p>
                      <p className="text-sm font-poppins mt-1 opacity-60">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 font-poppins">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0f1019] border border-white/[0.08] w-full max-w-3xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                <h3 className="text-2xl font-bold font-cinzel text-white tracking-wider">Add New Product</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Form Left */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Product Name</label>
                      <input type="text" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner" placeholder="e.g., Premium Cotton T-Shirt" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Category</label>
                      <select className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:bg-white/[0.05] transition-all shadow-inner appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239CA3AF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}>
                        <option className="bg-[#0f1019] text-white">T-Shirts</option>
                        <option className="bg-[#0f1019] text-white">Hoodies</option>
                        <option className="bg-[#0f1019] text-white">Accessories</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Price ($)</label>
                        <input type="number" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner" placeholder="0.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Stock</label>
                        <input type="number" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Upload Right */}
                  <div>
                    <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Product Image</label>
                    <div 
                      className="border-2 border-dashed border-white/[0.1] bg-white/[0.01] rounded-2xl h-[240px] flex flex-col items-center justify-center relative overflow-hidden group hover:border-fuchsia-500/50 hover:bg-white/[0.03] transition-all cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewImage ? (
                        <>
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white font-bold tracking-wider flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl"><FiEdit2 /> Change Image</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 transition-colors shadow-lg">
                            <FiImage size={28} className="text-gray-400 group-hover:text-fuchsia-400 transition-colors" />
                          </div>
                          <p className="text-sm font-medium text-gray-300">Click to upload image</p>
                          <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-semibold">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Description</label>
                  <textarea className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner h-28 resize-none custom-scrollbar" placeholder="Enter detailed product description..."></textarea>
                </div>
              </div>
              
              <div className="p-6 border-t border-white/[0.05] bg-white/[0.01] flex justify-end gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold tracking-wider text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2.5 rounded-xl font-bold tracking-wider bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                >
                  Save Product
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}