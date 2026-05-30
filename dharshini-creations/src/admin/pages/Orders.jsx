import React, { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fetchAllOrders, updateOrderStatus } from '../../services/supabase';
import { supabase } from '../../lib/supabase';

const STATUS_COLORS = {
  'Delivered': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Processing': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Shipped': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  'Pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Cancelled': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let mounted = true;
    const loadOrders = async () => {
      const data = await fetchAllOrders();
      if (mounted) {
        setOrders(data || []);
      }
    };

    loadOrders();

    const channel = supabase
      .channel('admin-orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        loadOrders();
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    await updateOrderStatus(id, newStatus.toLowerCase());
  };

  const filtered = orders.filter(o => {
    const custName = o.customer || 'Guest';
    const orderId  = o.id || '';
    const matchSearch = custName.toLowerCase().includes(searchTerm.toLowerCase()) || orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold font-cinzel text-white mb-2 tracking-wider">Order Management</h2>
          <p className="text-sm text-gray-400 font-poppins">Manage and track customer orders seamlessly.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center gap-3 w-full sm:w-72 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-4 py-3 focus-within:border-violet-500 focus-within:bg-white/[0.05] transition-all duration-300 shadow-lg group">
            <FiSearch className="text-gray-400 group-focus-within:text-violet-400 transition-colors shrink-0 text-lg" />
            <input
              type="text"
              placeholder="Search orders..."
              className="flex-1 bg-transparent border-0 outline-none text-white font-poppins placeholder-gray-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="bg-white/[0.02] border border-white/[0.05] text-white rounded-2xl px-4 py-3 focus:outline-none focus:border-fuchsia-500 focus:bg-white/[0.05] transition-all duration-300 font-poppins shadow-lg appearance-none cursor-pointer pr-10 relative"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239CA3AF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
          >
            <option value="All" className="bg-[#0f1019] text-white">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s} className="bg-[#0f1019] text-white">{s}</option>)}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {['All', ...STATUSES].map((status, i) => {
          const count = status === 'All' ? orders.length : orders.filter(o => o.status === status).length;
          const isActive = filterStatus === status;
          return (
            <motion.button
              key={status}
              whileHover={{ y: -3 }}
              onClick={() => setFilterStatus(status)}
              className={`p-5 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group ${
                isActive 
                  ? 'border-violet-500/50 bg-violet-600/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                  : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 from-violet-500/10' : ''}`} />
              <div className="text-3xl font-bold font-cinzel text-white relative z-10">{count}</div>
              <div className={`text-xs uppercase tracking-widest font-semibold mt-2 relative z-10 ${isActive ? 'text-violet-300' : 'text-gray-400'}`}>{status}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="overflow-x-auto p-4 relative z-10">
          <table className="w-full text-left border-collapse min-w-[900px] font-poppins">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="py-5 px-6 font-semibold">Order ID</th>
                <th className="py-5 px-6 font-semibold">Customer</th>
                <th className="py-5 px-6 font-semibold">Product</th>
                <th className="py-5 px-6 font-semibold">Date</th>
                <th className="py-5 px-6 font-semibold">Status</th>
                <th className="py-5 px-6 font-semibold text-right">Amount</th>
                <th className="py-5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {filtered.length > 0 ? filtered.map((order, idx) => (
                <tr key={order.id} className="hover:bg-white/[0.04] transition-colors rounded-2xl group/row">
                  <td className="py-4 px-6">
                    <span className="font-semibold font-cinzel text-lg text-violet-400 group-hover/row:text-violet-300 transition-colors tracking-wide">{order.id}</span>
                  </td>
                  <td className="py-4 px-6 text-white font-medium">{order.customer}</td>
                  <td className="py-4 px-6 text-gray-400 max-w-[250px] truncate">{order.product}</td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="relative inline-block">
                      <select
                        className={`text-[11px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none appearance-none pr-8 transition-colors ${STATUS_COLORS[order.status] || 'bg-white/[0.05] border-white/10 text-gray-300'}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {STATUSES.map(s => <option key={s} value={s} className="bg-[#0f1019] text-white">{s}</option>)}
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white text-right">{order.amount}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/50 hover:bg-violet-500/10 text-gray-400 hover:text-violet-400 transition-all shadow-lg" title="View Order Details">
                        <FiEye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiSearch size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-cinzel">No orders found.</p>
                      <p className="text-sm font-poppins mt-1 opacity-60">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}