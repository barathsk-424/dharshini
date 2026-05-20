import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { shirtColors, floralStyles } from '../data/mockData';

export default function CustomOrders() {
  const [form, setForm] = useState({ name: '', phone: '', shirtType: 'tshirt', position: 'chest', color: 'White', measurements: '', instructions: '' });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Custom Orders — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Design Your Dream</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Custom Orders</motion.h1>
        </div>
      </section>
      <div className="section-container max-w-3xl mx-auto" style={{ paddingTop: 40 }}>
        {submitted ? (
          <motion.div className="glass-card p-12 text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="text-6xl mb-4">✅</div>
            <h3 className="font-cinzel text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>Order Submitted!</h3>
            <p className="text-sm" style={{ color: '#E5E7EB' }}>We'll review your design and send a quote via WhatsApp within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="btn-primary mt-6 interactive">Submit Another</button>
          </motion.div>
        ) : (
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Your Name</label>
                <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Phone / WhatsApp</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Shirt Type</label>
                <select value={form.shirtType} onChange={e => update('shirtType', e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#E5E7EB', background: 'rgba(20,10,40,0.8)' }}>
                  <option value="tshirt" style={{ background: '#0a0a0a' }}>T-Shirt</option>
                  <option value="shirt" style={{ background: '#0a0a0a' }}>Formal Shirt</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Design Position</label>
                <select value={form.position} onChange={e => update('position', e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#E5E7EB', background: 'rgba(20,10,40,0.8)' }}>
                  {['chest', 'sleeve-left', 'sleeve-right', 'back'].map(p => <option key={p} value={p} style={{ background: '#0a0a0a' }}>{p.replace('-', ' ')}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Shirt Color</label>
              <div className="flex gap-3 flex-wrap">
                {shirtColors.map(c => (
                  <button key={c.name} onClick={() => update('color', c.name)} className="flex items-center gap-2 px-3 py-2 rounded-lg interactive"
                    style={{ background: form.color === c.name ? 'rgba(138,43,226,0.2)' : 'transparent', border: `1px solid ${form.color === c.name ? '#B266FF' : 'rgba(106,13,173,0.2)'}` }}>
                    <div className="w-5 h-5 rounded-full border" style={{ background: c.hex, borderColor: 'rgba(255,255,255,0.2)' }} />
                    <span className="text-xs" style={{ color: '#E5E7EB' }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Reference Images</label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center interactive" style={{ borderColor: '#6A0DAD' }}
                onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); setFiles(p => [...p, ...Array.from(e.dataTransfer.files)]); }}>
                <p className="text-sm mb-2" style={{ color: '#E5E7EB' }}>Drag & drop or <label className="text-purple-400 cursor-pointer interactive">browse<input type="file" multiple accept="image/*" className="hidden" onChange={e => setFiles(p => [...p, ...Array.from(e.target.files)])} /></label></p>
                {files.length > 0 && <p className="text-xs mt-2" style={{ color: '#4ade80' }}>✓ {files.length} file(s) selected</p>}
              </div>
            </div>
            <div className="mb-6">
              <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Measurements</label>
              <input value={form.measurements} onChange={e => update('measurements', e.target.value)} placeholder="Chest, Length, Shoulder (in inches)" className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
            </div>
            <div className="mb-8">
              <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Special Instructions</label>
              <textarea value={form.instructions} onChange={e => update('instructions', e.target.value)} rows={4} placeholder="Any specific details, colors, design preferences..." className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 resize-none" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
            </div>
            <div className="flex gap-4">
              <button className="btn-ghost flex-1 interactive">💾 Save Draft</button>
              <button onClick={() => setSubmitted(true)} className="btn-primary flex-1 interactive">📩 Submit for Quote</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
