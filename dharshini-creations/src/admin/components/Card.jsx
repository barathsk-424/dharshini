import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ title, value, icon, trend, trendUp }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
              {trendUp ? '↑' : '↓'} {trend} since last month
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-700/50 rounded-lg text-purple-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
