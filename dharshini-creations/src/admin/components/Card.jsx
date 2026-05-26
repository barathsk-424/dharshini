import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ title, value, icon, trend, trendUp, gradient = 'violet' }) {
  
  // Dynamic gradient mapping
  const gradients = {
    violet: 'from-violet-600 to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    rose: 'from-rose-500 to-pink-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]',
    fuchsia: 'from-fuchsia-600 to-pink-500 shadow-[0_0_20px_rgba(192,38,211,0.2)]',
    emerald: 'from-emerald-500 to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    amber: 'from-amber-500 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    blue: 'from-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
  };

  const bgClasses = gradients[gradient] || gradients.violet;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-6 relative overflow-hidden group transition-all duration-300 shadow-2xl"
    >
      {/* Top Gradient Line */}
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${bgClasses.split(' ')[0]} ${bgClasses.split(' ')[1]} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Subtle Glow Effect on Hover */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${bgClasses.split(' ')[0]} ${bgClasses.split(' ')[1]} opacity-0 group-hover:opacity-[0.05] blur-xl transition-opacity duration-500 pointer-events-none`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${bgClasses.split(' ')[0]} ${bgClasses.split(' ')[1]} text-white text-2xl ${bgClasses.split(' ')[2]}`}>
            {icon}
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold font-poppins tracking-wide ${
              trendUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
            }`}>
              {trendUp ? '↑' : '↓'} {trend}
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <h3 className="text-4xl font-bold font-cinzel text-white tracking-wider mb-2">{value}</h3>
          <p className="text-gray-400 font-poppins text-sm font-medium tracking-wide">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
