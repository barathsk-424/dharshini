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
      className="space-y-6 relative"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Product Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => { setPreviewImage(null); setIsModalOpen(true); }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all font-medium whitespace-nowrap shadow-lg shadow-purple-500/20"
          >
            <FiPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 border-b border-gray-700">
                <th className="py-4 px-6 font-medium">Product ID</th>
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium">Price</th>
                <th className="py-4 px-6 font-medium">Stock</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                  <td className="py-4 px-6 font-medium text-purple-400">{product.id}</td>
                  <td className="py-4 px-6 font-medium text-white">{product.name}</td>
                  <td className="py-4 px-6 text-gray-300">{product.category}</td>
                  <td className="py-4 px-6 text-gray-300">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-gray-300">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.status === 'In Stock' ? 'bg-green-500/20 text-green-400' : 
                      product.status === 'Low Stock' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors p-1" title="Edit Product">
                        <FiEdit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1" 
                        title="Delete Product"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-800 border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                <h3 className="text-xl font-bold text-white">Add New Product</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form Left */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
                      <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="e.g., Premium Cotton T-Shirt" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                      <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors">
                        <option>T-Shirts</option>
                        <option>Hoodies</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                        <input type="number" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="0.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Stock</label>
                        <input type="number" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Upload Right */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
                    <div 
                      className="border-2 border-dashed border-gray-600 rounded-xl h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-500 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewImage ? (
                        <>
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium flex items-center gap-2"><FiEdit2 /> Change Image</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <FiImage size={32} className="mx-auto text-gray-500 mb-2 group-hover:text-purple-500 transition-colors" />
                          <p className="text-sm text-gray-400">Click to upload image</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
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
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors h-24 resize-none" placeholder="Enter product description..."></textarea>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-700 bg-gray-800/50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg shadow-purple-500/20"
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