import React, { useState } from 'react';
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
import { motion } from 'framer-motion';
import { 
  HiOutlineEye, 
  HiOutlineTrendingUp, 
  HiOutlineClock, 
  HiOutlineCursorClick,
  HiOutlineDownload,
  HiOutlineCalendar
} from 'react-icons/hi';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, 
  Title, Tooltip, Legend, ArcElement, Filler
);

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30 Days');

  /* ── Chart Data ── */
  const areaChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Organic Traffic',
        data: [35000, 41000, 38000, 45000, 52000, 58000, 61000, 68000, 72000, 75000, 81000, 86000],
        borderColor: '#8b5cf6', // violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: 'origin',
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: 'Paid Traffic',
        data: [15000, 18000, 22000, 25000, 28000, 31000, 35000, 38000, 41000, 45000, 48000, 52000],
        borderColor: '#d946ef', // fuchsia-500
        backgroundColor: 'rgba(217, 70, 239, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: 'origin',
        pointRadius: 0,
        pointHoverRadius: 6,
      }
    ]
  };

  const horizontalBarData = {
    labels: ['Organic Search', 'Direct', 'Social Media', 'Email', 'Referral'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [42500, 28300, 15400, 12800, 8500],
        backgroundColor: [
          '#8b5cf6', // violet
          '#d946ef', // fuchsia
          '#ec4899', // pink
          '#10b981', // emerald
          '#f59e0b', // amber
        ],
        borderRadius: 4,
      }
    ]
  };

  const doughnutData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [55, 35, 10],
        backgroundColor: ['#8b5cf6', '#d946ef', '#ec4899'],
        borderWidth: 0,
        hoverOffset: 4,
      }
    ]
  };

  /* ── Chart Options ── */
  const areaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', align: 'end', labels: { color: '#9ca3af', usePointStyle: true, boxWidth: 8, font: { family: "'Poppins', sans-serif" } } },
      tooltip: { backgroundColor: 'rgba(15, 16, 25, 0.9)', padding: 12, cornerRadius: 8, borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleFont: { family: "'Poppins', sans-serif" }, bodyFont: { family: "'Poppins', sans-serif" } }
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }, ticks: { color: '#9ca3af', font: { family: "'Poppins', sans-serif" } } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }, ticks: { color: '#9ca3af', font: { family: "'Poppins', sans-serif" } }, stacked: false }
    }
  };

  const hBarOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: 'rgba(15, 16, 25, 0.9)', padding: 12, cornerRadius: 8, titleFont: { family: "'Poppins', sans-serif" }, bodyFont: { family: "'Poppins', sans-serif" } }
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }, ticks: { color: '#9ca3af', font: { family: "'Poppins', sans-serif" } } },
      y: { grid: { display: false, drawBorder: false }, ticks: { color: '#e5e7eb', font: { family: "'Poppins', sans-serif" } } }
    }
  };

  /* ── Mock Top Pages ── */
  const topPages = [
    { path: '/shop/t-shirts', views: '24,592', unique: '18,402', bounce: '42.1%', time: '02:45' },
    { path: '/shop/hoodies', views: '18,245', unique: '12,890', bounce: '38.5%', time: '03:12' },
    { path: '/customize/hoodie', views: '15,820', unique: '10,244', bounce: '25.4%', time: '08:30' },
    { path: '/pricing', views: '12,450', unique: '9,800', bounce: '55.2%', time: '01:15' },
    { path: '/checkout', views: '8,920', unique: '6,450', bounce: '12.8%', time: '04:20' },
  ];

  /* ── Helper Components ── */
  const MetricCard = ({ title, value, trend, icon: Icon, colorClass, isPositive }) => (
    <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/[0.05] shadow-2xl flex items-start justify-between group hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        <p className="text-sm font-bold tracking-wider text-gray-400 mb-2 uppercase">{title}</p>
        <h4 className="text-3xl font-bold text-white mb-3 font-cinzel tracking-wider">{value}</h4>
        <div className={`flex items-center gap-1.5 text-xs font-bold tracking-wide ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          <div className={`p-1 rounded-full ${isPositive ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
            {isPositive ? <HiOutlineTrendingUp /> : <HiOutlineTrendingUp className="rotate-180" />}
          </div>
          <span>{trend} vs last period</span>
        </div>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.05] shadow-inner ${colorClass} group-hover:scale-110 transition-transform duration-500 relative z-10`}>
        <Icon className="text-3xl" />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* ── Header & Filters ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wider font-cinzel mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400 font-poppins text-sm">Detailed breakdown of website performance</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 font-poppins">
          <div className="flex bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 shadow-lg">
            {['7 Days', '30 Days', '90 Days', '12 Months'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-5 py-2 text-sm font-bold tracking-wide rounded-xl transition-all duration-300 ${
                  dateRange === range 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all shadow-lg font-bold tracking-wide">
            <HiOutlineCalendar className="text-lg" />
            <span className="text-sm">Custom</span>
          </button>
          <button className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all shadow-lg">
            <HiOutlineDownload className="text-lg" />
          </button>
        </div>
      </div>

      {/* ── Metrics Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Page Views" value="145,678" trend="+12.4%" icon={HiOutlineEye} colorClass="text-violet-400 group-hover:text-violet-300" isPositive={true} />
        <MetricCard title="Bounce Rate" value="32.4%" trend="-5.2%" icon={HiOutlineCursorClick} colorClass="text-fuchsia-400 group-hover:text-fuchsia-300" isPositive={true} />
        <MetricCard title="Avg. Session" value="4m 32s" trend="+8.1%" icon={HiOutlineClock} colorClass="text-blue-400 group-hover:text-blue-300" isPositive={true} />
        <MetricCard title="Conversion Rate" value="3.2%" trend="-0.4%" icon={HiOutlineTrendingUp} colorClass="text-emerald-400 group-hover:text-emerald-300" isPositive={false} />
      </div>

      {/* ── Large Area Chart ── */}
      <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Traffic Overview</h3>
        </div>
        <div className="h-[400px] w-full relative z-10">
          <Line data={areaChartData} options={areaOptions} />
        </div>
      </div>

      {/* ── Two Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Horizontal Bar Chart */}
        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="mb-8 relative z-10">
            <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Revenue by Channel</h3>
            <p className="text-sm text-gray-400 mt-2 font-poppins">Top performing acquisition sources</p>
          </div>
          <div className="h-[300px] w-full mt-auto relative z-10">
            <Bar data={horizontalBarData} options={hBarOptions} />
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-l from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="mb-8 relative z-10">
            <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Device Distribution</h3>
            <p className="text-sm text-gray-400 mt-2 font-poppins">Traffic categorized by device type</p>
          </div>
          <div className="h-[300px] w-full flex-1 flex items-center justify-center relative pb-4 z-10">
            <Doughnut data={doughnutData} options={{...areaOptions, cutout: '75%', plugins: { legend: { position: 'right', labels: { color: '#9ca3af', usePointStyle: true, padding: 25, font: { family: "'Poppins', sans-serif" } } }, tooltip: { backgroundColor: 'rgba(15, 16, 25, 0.9)', padding: 12, cornerRadius: 8, titleFont: { family: "'Poppins', sans-serif" }, bodyFont: { family: "'Poppins', sans-serif" } } }}} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ left: '-25%' }}>
              <div className="text-center font-poppins">
                <span className="text-3xl font-bold text-white font-cinzel">100%</span>
                <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mt-1">Traffic</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Top Pages Table ── */}
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="p-8 border-b border-white/[0.05] relative z-10 bg-white/[0.01]">
          <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Top Pages</h3>
          <p className="text-sm text-gray-400 mt-2 font-poppins">Most visited pages this period</p>
        </div>
        <div className="overflow-x-auto relative z-10 p-4">
          <table className="w-full text-left border-collapse min-w-[800px] font-poppins">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="py-5 px-6 font-semibold">Page Path</th>
                <th className="py-5 px-6 font-semibold text-right">Page Views</th>
                <th className="py-5 px-6 font-semibold text-right">Unique Visitors</th>
                <th className="py-5 px-6 font-semibold text-right">Bounce Rate</th>
                <th className="py-5 px-6 font-semibold text-right">Avg. Time</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {topPages.map((page, idx) => (
                <tr key={idx} className="hover:bg-white/[0.04] transition-colors rounded-2xl group/row">
                  <td className="py-4 px-6 font-medium text-violet-400 group-hover/row:text-violet-300 transition-colors">{page.path}</td>
                  <td className="py-4 px-6 text-white font-bold text-right tracking-wide">{page.views}</td>
                  <td className="py-4 px-6 text-gray-400 font-medium text-right">{page.unique}</td>
                  <td className="py-4 px-6 text-gray-400 font-medium text-right">{page.bounce}</td>
                  <td className="py-4 px-6 text-gray-400 font-medium text-right">{page.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </motion.div>
  );
}