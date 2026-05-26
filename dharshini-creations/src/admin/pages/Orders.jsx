import React, { useState } from 'react';
import { FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  'Delivered': 'bg-green-500/20 text-green-400',
  'Processing': 'bg-blue-500/20 text-blue-400',
  'Shipped': 'bg-purple-500/20 text-purple-400',
  'Pending': 'bg-yellow-500/20 text-yellow-400',
  'Cancelled': 'bg-red-500/20 text-red-400',
};

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [orders, setOrders] = useState([
    { id: '#DC-1045', customer: 'Alice Johnson', product: 'Custom Hoodie (Black, L)', status: 'Delivered', amount: '₹3,750', date: '2026-05-20' },
    { id: '#DC-1046', customer: 'Bob Smith', product: 'Printed T-Shirt (White, M)', status: 'Processing', amount: '₹1,850', date: '2026-05-22' },
    { id: '#DC-1047', customer: 'Charlie Davis', product: 'Embroidered Cap', status: 'Shipped', amount: '₹1,250', date: '2026-05-23' },
    { id: '#DC-1048', customer: 'Diana Ross', product: 'Photo Mug (Set of 2)', status: 'Pending', amount: '₹980', date: '2026-05-25' },
    { id: '#DC-1049', customer: 'Evan Wright', product: 'Custom Hoodie (Navy, XL)', status: 'Processing', amount: '₹3,750', date: '2026-05-25' },
    { id: '#DC-1050', customer: 'Fiona Green', product: 'Printed T-Shirt (Red, S)', status: 'Cancelled', amount: '₹1,850', date: '2026-05-26' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Order Management</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {['All', ...STATUSES].map(status => {
          const count = status === 'All' ? orders.length : orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`p-4 rounded-xl border text-left transition-all hover:scale-105 ${
                filterStatus === status ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700/50 bg-gray-800'
              }`}
            >
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-gray-400 mt-1">{status}</div>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 border-b border-gray-700">
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Amount</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-purple-400">{order.id}</td>
                  <td className="py-4 px-6 text-white font-medium">{order.customer}</td>
                  <td className="py-4 px-6 text-gray-300 max-w-[200px] truncate">{order.product}</td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{order.date}</td>
                  <td className="py-4 px-6">
                    <select
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[order.status] || 'bg-gray-700 text-gray-300'}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ background: 'transparent' }}
                    >
                      {STATUSES.map(s => <option key={s} value={s} className="bg-gray-800 text-white">{s}</option>)}
                    </select>
                  </td>
                  <td className="py-4 px-6 font-bold text-white">{order.amount}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-all" title="View Order">
                        <FiEye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-400">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}