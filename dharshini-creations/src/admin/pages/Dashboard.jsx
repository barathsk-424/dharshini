import React, { useEffect, useState } from 'react';
import { 
  HiOutlineUsers, 
  HiOutlineShoppingCart, 
  HiOutlineCurrencyDollar, 
  HiOutlineStatusOnline, 
  HiOutlineDownload,
  HiOutlineDotsHorizontal
} from 'react-icons/hi';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  Filler 
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import {
  fetchDashboardStats,
  fetchAnalyticsTraffic,
  fetchAnalyticsDailyVisitors,
  fetchAllOrders,
} from '../../services/supabase';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, 
  Title, Tooltip, Legend, ArcElement, Filler
);

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [trafficData, setTrafficData] = useState({ labels: [], revenue: [], expenses: [], visitors: [] });

  useEffect(() => {
    fetchDashboardStats().then(s => { if (s) setStats(s); });
    fetchAllOrders().then(orders => {
      if (orders) setRecentOrders(orders.slice(0, 5));
    });
    fetchAnalyticsTraffic().then(data => {
      if (data) setTrafficData({
        labels:   data.map(d => d.month),
        revenue:  data.map(d => d.revenue),
        expenses: data.map(d => d.expenses),
        visitors: data.map(d => d.organic + d.paid),
      });
    });
  }, []);

  /* ── Chart Data ── */
  const lineChartData = {
    labels: trafficData.labels.length ? trafficData.labels : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: trafficData.revenue.length ? trafficData.revenue : [12000,19000,15000,22000,18000,32000,28000,35000,31000,42000,38000,48290],
        borderColor: '#8b5cf6', // violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.15)', // violet-500 with opacity
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#8b5cf6',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Expenses',
        data: trafficData.expenses.length ? trafficData.expenses : [8000,11000,9000,13000,12000,18000,16000,20000,19000,24000,22000,28000],
        borderColor: '#d946ef', // fuchsia-500
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ],
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Visitors',
        data: [1200, 1900, 1500, 2200, 1800, 3200, 2800],
        backgroundColor: [
          '#8b5cf6', '#a855f7', '#d946ef', '#e879f9', '#f472b6', '#fb7185', '#fda4af'
        ],
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const doughnutData = {
    labels: ['T-Shirts', 'Hoodies', 'Mugs', 'Caps'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#8b5cf6', // violet
          '#d946ef', // fuchsia
          '#ec4899', // pink
          '#f43f5e', // rose
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  /* ── Chart Options ── */
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af', usePointStyle: true, boxWidth: 8, padding: 20 },
        position: 'top',
        align: 'end',
      },
      tooltip: {
        backgroundColor: 'rgba(3, 2, 6, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#9ca3af', font: { family: 'Poppins, sans-serif' } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#9ca3af', font: { family: 'Poppins, sans-serif' }, padding: 10 },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#9ca3af', usePointStyle: true, padding: 20, font: { family: 'Poppins' } }
      },
      tooltip: {
        backgroundColor: 'rgba(3, 2, 6, 0.9)',
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  /* ── Mock Data ── */
  const STATUS_BG = {
    'pending':    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    'processing': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    'shipped':    'bg-violet-500/10 text-violet-400 border border-violet-500/20',
    'delivered':  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    'cancelled':  'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* ── Welcome Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold font-cinzel text-white mb-1 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Welcome back, Admin <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%]">👋</span>
          </h2>
          <p className="text-gray-400 font-poppins text-sm">{today}</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] group">
          <HiOutlineDownload className="text-lg group-hover:-translate-y-0.5 transition-transform" />
          <span className="font-medium font-poppins text-sm">Download Report</span>
        </button>
      </div>
      
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.totalUsers.toLocaleString()} icon={<HiOutlineUsers />} trend="12.5%" trendUp={true} gradient="violet" />
        <Card title="Total Orders" value={stats.totalOrders.toLocaleString()} icon={<HiOutlineShoppingCart />} trend="8.2%" trendUp={true} gradient="fuchsia" />
        <Card title="Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={<HiOutlineCurrencyDollar />} trend="15.3%" trendUp={true} gradient="emerald" />
        <Card title="Active Visitors" value="284" icon={<HiOutlineStatusOnline />} trend="2.4%" trendUp={false} gradient="rose" />
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white tracking-wider">Sales Overview</h3>
              <p className="text-sm text-gray-400 font-poppins mt-1">Revenue vs Expenses over time</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors">
              <HiOutlineDotsHorizontal />
            </button>
          </div>
          <div className="h-[300px] w-full relative z-10">
            <Line data={lineChartData} options={commonOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white tracking-wider">Visitor Growth</h3>
              <p className="text-sm text-gray-400 font-poppins mt-1">Daily traffic</p>
            </div>
          </div>
          <div className="h-[300px] w-full mt-auto relative z-10">
            <Bar data={barChartData} options={{...commonOptions, scales: {...commonOptions.scales, x: {grid: {display: false}}}} } />
          </div>
        </div>
      </div>

      {/* ── Bottom Section Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="p-6 border-b border-white/[0.05] flex justify-between items-center relative z-10">
            <h3 className="text-lg font-bold font-cinzel text-white tracking-wider">Recent Orders</h3>
            <button className="text-sm text-violet-400 hover:text-violet-300 font-poppins font-medium transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto flex-1 relative z-10 p-2">
            <table className="w-full text-left border-collapse min-w-[600px] font-poppins">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Order ID</th>
                  <th className="py-4 px-6 font-semibold">Customer</th>
                  <th className="py-4 px-6 font-semibold">Product</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.04] transition-colors rounded-xl overflow-hidden">
                    <td className="py-4 px-6 font-semibold text-violet-400">{order.id}</td>
                    <td className="py-4 px-6 text-white font-medium">{order.customer}</td>
                    <td className="py-4 px-6 text-gray-400 text-sm">{order.product}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${STATUS_BG[order.status?.toLowerCase()] || STATUS_BG['pending']}`}>
                        {order.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-white font-medium">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="mb-6 relative z-10">
            <h3 className="text-lg font-bold font-cinzel text-white tracking-wider">Sales by Category</h3>
            <p className="text-sm text-gray-400 font-poppins mt-1">Product performance</p>
          </div>
          <div className="h-[250px] w-full flex-1 flex items-center justify-center relative z-10">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            {/* Center text for Doughnut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -translate-x-14">
              <span className="text-4xl font-bold font-cinzel text-white">4</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Categories</span>
            </div>
          </div>
        </div>

      </div>

    </motion.div>
  );
}