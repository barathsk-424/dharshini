import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiImage, FiX, FiSave } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/supabase';

const EMPTY_FORM = {
  name: '', description: '', base_price: '', category_id: '',
  is_customizable: false, image_url: '', tags: '', colors: '', sizes: '',
};

export default function Products() {
  const [searchTerm, setSearchTerm]   = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = add, object = edit
  const [form, setForm]               = useState(EMPTY_FORM);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories]   = useState([]);
  const [products, setProducts]       = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [isSaving, setIsSaving]       = useState(false);
  const fileInputRef = useRef(null);

  // ── Load data ──────────────────────────────────────────────
  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).then(([prods, cats]) => {
      if (prods) setProducts(prods);
      if (cats)  setCategories(cats);
      setIsLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categories?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Open modal ─────────────────────────────────────────────
  const openAdd = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name:            product.name || '',
      description:     product.description || '',
      base_price:      product.base_price || product.basePrice || '',
      category_id:     product.category_id || product.categoryId || '',
      is_customizable: product.is_customizable || product.isCustomizable || false,
      image_url:       product.image || '',
      tags:            Array.isArray(product.tags) ? product.tags.join(', ') : '',
      colors:          Array.isArray(product.colors) ? product.colors.join(', ') : '',
      sizes:           Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
    });
    setPreviewImage(product.image || null);
    setIsModalOpen(true);
  };

  // ── Save (add or edit) ─────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim() || !form.base_price || !form.category_id) {
      alert('Please fill in Name, Price, and Category.');
      return;
    }
    setIsSaving(true);
    const payload = {
      name:            form.name.trim(),
      description:     form.description.trim(),
      base_price:      parseFloat(form.base_price),
      category_id:     parseInt(form.category_id),
      is_customizable: form.is_customizable,
      image_url:       form.image_url.trim(),
      tags:            form.tags.split(',').map(t => t.trim()).filter(Boolean),
      colors:          form.colors.split(',').map(c => c.trim()).filter(Boolean),
      sizes:           form.sizes.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editingProduct) {
      const ok = await updateProduct(editingProduct.id, payload);
      if (ok) {
        const refreshed = await fetchProducts();
        if (refreshed) setProducts(refreshed);
      } else {
        alert('Failed to update product.');
      }
    } else {
      const result = await createProduct(payload);
      if (result.success) {
        const refreshed = await fetchProducts();
        if (refreshed) setProducts(refreshed);
      } else {
        alert('Failed to create product: ' + result.error);
      }
    }
    setIsSaving(false);
    setIsModalOpen(false);
  };

  // ── Delete ─────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    const ok = await deleteProduct(id);
    if (ok) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert('Failed to delete product.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      // For now store the object URL; in production you'd upload to Supabase Storage
      setForm(f => ({ ...f, image_url: url }));
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || '—';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 relative"
    >
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold font-cinzel text-white mb-2 tracking-wider">Product Management</h2>
          <p className="text-sm text-gray-400 font-poppins">
            {isLoading ? 'Loading...' : `${products.length} products from Supabase`}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white/[0.02] border border-white/[0.05] text-white rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all font-poppins placeholder-gray-500 shadow-lg"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-2xl hover:from-violet-500 hover:to-fuchsia-500 transition-all font-bold tracking-wider font-cinzel whitespace-nowrap shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
          >
            <FiPlus size={20} /> Add Product
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="overflow-x-auto p-4 relative z-10">
          <table className="w-full text-left border-collapse min-w-[900px] font-poppins">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="py-5 px-4 font-semibold">Image</th>
                <th className="py-5 px-4 font-semibold">Name</th>
                <th className="py-5 px-4 font-semibold">Category</th>
                <th className="py-5 px-4 font-semibold">Customizable</th>
                <th className="py-5 px-4 font-semibold text-right">Price (₹)</th>
                <th className="py-5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="6" className="py-16 text-center text-gray-500">
                  <div className="w-8 h-8 mx-auto rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin mb-3" />
                  Loading products from Supabase...
                </td></tr>
              ) : filteredProducts.length > 0 ? filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-white/[0.04] transition-colors group/row border-t border-white/[0.03]">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                      {product.image && product.image !== 'https://via.placeholder.com/300?text=No+Image' ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg">🎨</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-white group-hover/row:text-fuchsia-300 transition-colors">{product.name}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{getCategoryName(product.category_id || product.categoryId)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                      (product.is_customizable || product.isCustomizable)
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-white/[0.05] text-gray-500 border border-white/10'
                    }`}>
                      {(product.is_customizable || product.isCustomizable) ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white font-bold text-right">₹{product.base_price || product.basePrice}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all shadow-lg"
                        title="Edit Product"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-rose-500/50 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-all shadow-lg"
                        title="Delete Product"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FiSearch size={40} className="mb-4 opacity-20" />
                    <p className="text-lg font-cinzel">No products found.</p>
                    <p className="text-sm font-poppins mt-1 opacity-60">Add your first product using the button above.</p>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 font-poppins">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                <h3 className="text-2xl font-bold font-cinzel text-white tracking-wider">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Form fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all"
                        placeholder="e.g., Custom T-shirt Painting"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Category *</label>
                      <select
                        value={form.category_id}
                        onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
                        className="w-full bg-[#0f1019] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select category...</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id} className="bg-[#0f1019] text-white">{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Price (₹) *</label>
                      <input
                        type="number"
                        value={form.base_price}
                        onChange={e => setForm(f => ({ ...f, base_price: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Image URL</label>
                      <input
                        type="text"
                        value={form.image_url}
                        onChange={e => { setForm(f => ({ ...f, image_url: e.target.value })); setPreviewImage(e.target.value); }}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Colors (comma-separated)</label>
                      <input
                        type="text"
                        value={form.colors}
                        onChange={e => setForm(f => ({ ...f, colors: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all"
                        placeholder="White, Black, Navy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Sizes (comma-separated)</label>
                      <input
                        type="text"
                        value={form.sizes}
                        onChange={e => setForm(f => ({ ...f, sizes: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all"
                        placeholder="S, M, L, XL"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="customizable"
                        checked={form.is_customizable}
                        onChange={e => setForm(f => ({ ...f, is_customizable: e.target.checked }))}
                        className="w-4 h-4 accent-violet-500 cursor-pointer"
                      />
                      <label htmlFor="customizable" className="text-sm font-semibold text-gray-300 cursor-pointer">Customizable product</label>
                    </div>
                  </div>

                  {/* Right: Image preview + upload */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Image Preview</label>
                      <div
                        className="border-2 border-dashed border-white/[0.1] bg-white/[0.01] rounded-2xl h-[200px] flex flex-col items-center justify-center relative overflow-hidden group hover:border-fuchsia-500/50 hover:bg-white/[0.03] transition-all cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {previewImage ? (
                          <>
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" onError={() => setPreviewImage(null)} />
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white font-bold tracking-wider flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl"><FiEdit2 size={14} /> Change</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-6">
                            <FiImage size={28} className="text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-300">Click to upload or paste URL above</p>
                          </div>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={form.tags}
                        onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all"
                        placeholder="fabric-painting, trending"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Description</label>
                      <textarea
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all h-24 resize-none"
                        placeholder="Product description..."
                      />
                    </div>
                  </div>
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
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-2.5 rounded-xl font-bold tracking-wider bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-60 flex items-center gap-2"
                >
                  {isSaving ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving...</>
                  ) : (
                    <><FiSave size={16} /> {editingProduct ? 'Update Product' : 'Save Product'}</>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
