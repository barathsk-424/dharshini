import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { shirtColors, floralStyles } from '../../data/mockData';
import { useCartStore } from '../../store/useStore';

const positions = [
  { id: 'chest', label: 'Chest', x: 45, y: 42, w: 30, h: 20 },
  { id: 'sleeve-left', label: 'Left Sleeve', x: 12, y: 30, w: 18, h: 15 },
  { id: 'sleeve-right', label: 'Right Sleeve', x: 70, y: 30, w: 18, h: 15 },
  { id: 'back', label: 'Back', x: 45, y: 65, w: 30, h: 20 },
];

export default function AIDesignBuilder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [step, setStep] = useState(1);
  const [designText, setDesignText] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('chest');
  const [selectedColor, setSelectedColor] = useState(shirtColors[0]);
  const [selectedFloral, setSelectedFloral] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const addItem = useCartStore(s => s.addItem);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `custom-${Date.now()}`,
      name: 'Custom Design Order',
      basePrice: 499,
      isCustom: true,
      customDetails: { designText, selectedPosition, selectedColor, selectedFloral, uploadedImage },
    });
    setStep(1);
    setDesignText('');
    setUploadedImage(null);
  };

  const steps = [
    { num: 1, title: 'Upload Design' },
    { num: 2, title: 'Add Text' },
    { num: 3, title: 'Position' },
    { num: 4, title: 'Color' },
    { num: 5, title: 'Floral Style' },
  ];

  return (
    <section ref={ref} className="relative gradient-bg">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-subtitle">Design Your Dream</p>
          <h2 className="section-title glow-text">AI Custom Design Builder</h2>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-10">
            {steps.map(s => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-poppins interactive transition-all"
                style={{
                  background: step === s.num ? 'linear-gradient(135deg, #8A2BE2, #B266FF)' : 'rgba(138,43,226,0.1)',
                  color: step === s.num ? 'white' : '#B8B8B8',
                  border: `1px solid ${step === s.num ? '#B266FF' : 'rgba(106,13,173,0.3)'}`,
                }}
              >
                <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: step === s.num ? 'rgba(255,255,255,0.2)' : 'rgba(138,43,226,0.2)' }}>
                  {s.num}
                </span>
                <span className="hidden md:inline">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Step content */}
            <div className="glass-card p-8" style={{ minHeight: 350 }}>
              {step === 1 && (
                <div>
                  <h3 className="font-cinzel text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Upload Your Design</h3>
                  <div
                    className="border-2 border-dashed rounded-2xl p-12 text-center transition-colors interactive"
                    style={{ borderColor: uploadedImage ? '#B266FF' : '#6A0DAD' }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) { const r = new FileReader(); r.onload = () => setUploadedImage(r.result); r.readAsDataURL(file); } }}
                  >
                    {uploadedImage ? (
                      <div>
                        <img src={uploadedImage} alt="Uploaded" className="max-h-40 mx-auto rounded-lg mb-3" />
                        <p className="text-sm" style={{ color: '#4ade80' }}>✓ Design uploaded!</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-5xl mb-4">📁</div>
                        <p className="text-sm mb-2" style={{ color: '#B8B8B8' }}>Drag & drop your design here</p>
                        <p className="text-xs mb-4" style={{ color: '#666' }}>PNG, JPG supported</p>
                        <label className="btn-ghost text-sm py-2 px-6 interactive cursor-pointer">
                          Browse Files
                          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-cinzel text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Add Name / Text</h3>
                  <input
                    type="text"
                    value={designText}
                    onChange={e => setDesignText(e.target.value)}
                    placeholder="Enter name or text for embroidery..."
                    className="w-full px-5 py-4 rounded-xl text-base bg-white/5 border outline-none focus:border-purple-500 transition-colors font-poppins"
                    style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }}
                  />
                  <p className="text-xs mt-3" style={{ color: '#B8B8B8' }}>This text will be embroidered on your shirt</p>
                  <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(138,43,226,0.1)' }}>
                    <p className="text-xs mb-2" style={{ color: '#B266FF' }}>Preview:</p>
                    <p className="font-great-vibes text-3xl" style={{ color: '#B266FF' }}>
                      {designText || 'Your text here'}
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-cinzel text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Select Position</h3>
                  <p className="text-sm mb-6" style={{ color: '#B8B8B8' }}>Click on the shirt to place your design</p>
                  <div className="grid grid-cols-2 gap-3">
                    {positions.map(pos => (
                      <button
                        key={pos.id}
                        onClick={() => setSelectedPosition(pos.id)}
                        className="p-4 rounded-xl text-sm font-poppins interactive transition-all"
                        style={{
                          background: selectedPosition === pos.id ? 'rgba(138,43,226,0.3)' : 'rgba(138,43,226,0.08)',
                          border: `1px solid ${selectedPosition === pos.id ? '#B266FF' : 'rgba(106,13,173,0.2)'}`,
                          color: selectedPosition === pos.id ? '#B266FF' : '#B8B8B8',
                        }}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="font-cinzel text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Choose Shirt Color</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {shirtColors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl interactive transition-all"
                        style={{
                          background: selectedColor.name === color.name ? 'rgba(138,43,226,0.2)' : 'transparent',
                          border: `2px solid ${selectedColor.name === color.name ? '#B266FF' : 'rgba(106,13,173,0.2)'}`,
                        }}
                      >
                        <div className="w-10 h-10 rounded-full border-2"
                          style={{ background: color.hex, borderColor: selectedColor.name === color.name ? '#B266FF' : 'rgba(255,255,255,0.2)' }} />
                        <span className="text-[10px]" style={{ color: '#B8B8B8' }}>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="font-cinzel text-xl font-semibold mb-4" style={{ color: '#F5F5F5' }}>Pick Floral Style</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {floralStyles.map(style => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedFloral(style)}
                        className="p-4 rounded-xl text-center interactive transition-all"
                        style={{
                          background: selectedFloral?.id === style.id ? 'rgba(138,43,226,0.3)' : 'rgba(138,43,226,0.08)',
                          border: `1px solid ${selectedFloral?.id === style.id ? '#B266FF' : 'rgba(106,13,173,0.2)'}`,
                        }}
                      >
                        <div className="text-3xl mb-2">{style.preview}</div>
                        <span className="text-xs" style={{ color: '#B8B8B8' }}>{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  className="btn-ghost text-sm py-2 px-6 interactive"
                  disabled={step === 1}
                  style={{ opacity: step === 1 ? 0.5 : 1 }}
                >← Back</button>
                {step < 5 ? (
                  <button onClick={() => setStep(step + 1)} className="btn-primary text-sm py-2 px-6 interactive">
                    Next →
                  </button>
                ) : (
                  <button onClick={handleAddToCart} className="btn-primary text-sm py-2 px-6 interactive">
                    🛒 Add to Cart (Custom Order)
                  </button>
                )}
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="glass-card p-8 flex items-center justify-center">
              <div className="relative">
                <svg viewBox="0 0 240 300" className="w-full max-w-[280px]">
                  {/* T-shirt */}
                  <path
                    d="M60 65 L30 95 L55 110 L55 270 L185 270 L185 110 L210 95 L180 65 L155 80 Q120 97 85 80 Z"
                    fill={selectedColor.hex}
                    stroke="rgba(138,43,226,0.3)"
                    strokeWidth="1"
                  />
                  {/* Collar */}
                  <path d="M85 80 Q120 97 155 80 Q135 88 120 90 Q105 88 85 80" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />

                  {/* Design placement indicator */}
                  {positions.map(pos => (
                    <g key={pos.id}>
                      <rect
                        x={`${pos.x - pos.w / 2}%`} y={`${pos.y - pos.h / 2}%`}
                        width={`${pos.w}%`} height={`${pos.h}%`}
                        fill={selectedPosition === pos.id ? 'rgba(178,102,255,0.15)' : 'transparent'}
                        stroke={selectedPosition === pos.id ? '#B266FF' : 'transparent'}
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        rx="4"
                      />
                    </g>
                  ))}

                  {/* Show design text */}
                  {designText && selectedPosition === 'chest' && (
                    <text x="120" y="140" textAnchor="middle" fill="#B266FF" fontSize="12" fontFamily="Great Vibes, cursive">
                      {designText}
                    </text>
                  )}

                  {/* Floral decoration */}
                  {selectedFloral && (
                    <text x="120" y="165" textAnchor="middle" fontSize="24">{selectedFloral.preview}</text>
                  )}
                </svg>

                <p className="text-center text-xs mt-4 font-poppins" style={{ color: '#666' }}>
                  Live Preview • {selectedColor.name} • {selectedPosition.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
