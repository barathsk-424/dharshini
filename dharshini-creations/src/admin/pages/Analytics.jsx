import React, { useState, useEffect, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineTrendingUp, HiOutlineDownload, HiOutlineCalendar,
  HiOutlineShoppingCart, HiOutlineCurrencyRupee, HiOutlineUsers, HiOutlineMail
} from 'react-icons/hi';
import {
  fetchOrdersInRange, fetchNewUsersCountInRange, fetchInquiriesCountInRange
} from '../../services/supabase';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, ArcElement, Filler
);

/* ── Helpers ─────────────────────────────────────────────── */

function getDateRange(filter, customStart, customEnd) {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date();

  if (filter === 'Custom') {
    return {
      start: customStart ? new Date(customStart + 'T00:00:00') : (() => { start.setDate(start.getDate() - 29); start.setHours(0,0,0,0); return start; })(),
      end:   customEnd   ? new Date(customEnd   + 'T23:59:59') : end,
    };
  }
  switch (filter) {
    case '7 Days':    start.setDate(end.getDate() - 6); break;
    case '30 Days':   start.setDate(end.getDate() - 29); break;
    case '90 Days':   start.setDate(end.getDate() - 89); break;
    case '12 Months': start.setFullYear(end.getFullYear() - 1); start.setDate(1); break;
    default:          start.setDate(end.getDate() - 29);
  }
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

function buildTimeSeries(orders, start, end, filter) {
  const diffDays = Math.ceil((end - start) / 86400000);
  const buckets = [];

  if (filter === '12 Months') {
    for (let i = 0; i < 12; i++) {
      const s = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const e = new Date(start.getFullYear(), start.getMonth() + i + 1, 0, 23, 59, 59);
      buckets.push({ label: s.toLocaleString('en-IN', { month: 'short', year: '2-digit' }), start: s, end: e });
    }
  } else if (diffDays > 30) {
    let cur = new Date(start);
    while (cur <= end) {
      const wEnd = new Date(cur);
      wEnd.setDate(wEnd.getDate() + 6);
      if (wEnd > end) wEnd.setTime(end.getTime());
      buckets.push({ label: cur.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), start: new Date(cur), end: new Date(wEnd) });
      cur.setDate(cur.getDate() + 7);
    }
  } else {
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const e2 = new Date(d); e2.setHours(23, 59, 59, 999);
      buckets.push({ label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), start: new Date(d), end: new Date(e2) });
    }
  }

  const revenue = buckets.map(b => orders.filter(o => {
    const t = new Date(o.created_at); return t >= b.start && t <= b.end;
  }).reduce((s, o) => s + Number(o.total || 0), 0));

  const counts = buckets.map(b => orders.filter(o => {
    const t = new Date(o.created_at); return t >= b.start && t <= b.end;
  }).length);

  return { labels: buckets.map(b => b.label), revenue, counts };
}

function buildStatusBreakdown(orders) {
  const map = {};
  orders.forEach(o => { const s = (o.status || 'pending'); map[s] = (map[s] || 0) + 1; });
  return map;
}

function downloadPDF(metrics, timeSeries, dateRange) {
  const doc = new jsPDF();
  
  // Header background
  doc.setFillColor(15, 10, 25);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('DHARSHINI CREATIONS', 14, 25);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text('ANALYTICS REPORT', 14, 33);
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 150, 20);
  doc.text(`Range: ${dateRange}`, 150, 26);
  
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(14, 50, 196, 50);
  
  // Performance Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 10, 25);
  doc.text('Performance Summary', 14, 62);
  
  const summaryItems = [
    { label: 'Total Revenue', value: `INR ${metrics.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` },
    { label: 'Total Orders', value: String(metrics.totalOrders) },
    { label: 'Avg Order Value', value: `INR ${metrics.avgOrderValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` },
    { label: 'New Registered Users', value: String(metrics.newUsers) },
    { label: 'Inquiries Received', value: String(metrics.messages) }
  ];
  
  let y = 72;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  summaryItems.forEach(item => {
    doc.setTextColor(100, 100, 100);
    doc.text(item.label, 16, y);
    doc.setTextColor(15, 10, 25);
    doc.setFont('helvetica', 'bold');
    doc.text(item.value, 120, y);
    doc.setFont('helvetica', 'normal');
    
    doc.setDrawColor(240, 240, 240);
    doc.line(14, y + 2, 196, y + 2);
    y += 10;
  });
  
  // Trend Breakdown
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 10, 25);
  doc.text('Trend Breakdown', 14, y);
  
  y += 10;
  doc.setFillColor(245, 245, 250);
  doc.rect(14, y - 6, 182, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.text('Period / Interval', 16, y - 1);
  doc.text('Orders', 110, y - 1);
  doc.text('Revenue (INR)', 150, y - 1);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  timeSeries.labels.forEach((label, index) => {
    y += 8;
    if (y > 275) {
      doc.addPage();
      y = 30;
      
      doc.setFillColor(245, 245, 250);
      doc.rect(14, y - 6, 182, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text('Period / Interval', 16, y - 1);
      doc.text('Orders', 110, y - 1);
      doc.text('Revenue (INR)', 150, y - 1);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      y += 8;
    }
    
    if (index % 2 === 1) {
      doc.setFillColor(250, 250, 252);
      doc.rect(14, y - 5, 182, 7, 'F');
    }
    
    doc.text(label, 16, y);
    doc.text(String(timeSeries.counts[index]), 110, y);
    doc.text(timeSeries.revenue[index].toLocaleString('en-IN', { minimumFractionDigits: 2 }), 150, y);
  });
  
  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('This is an automatically generated system report from Dharshini Creations.', 14, 287);
  
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'analytics-report.pdf';
  document.body.appendChild(link);
  link.click();
  
  // Delay cleanup to prevent browser download race condition
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  }, 150);
}

const CHART_OPTS = {
  responsive: true, maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { position: 'top', align: 'end', labels: { color: '#9ca3af', usePointStyle: true, boxWidth: 8, font: { family: "'Poppins',sans-serif" } } },
    tooltip: { backgroundColor: 'rgba(15,16,25,0.95)', padding: 12, cornerRadius: 8, borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleFont: { family: "'Poppins',sans-serif" }, bodyFont: { family: "'Poppins',sans-serif" } }
  },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9ca3af', font: { family: "'Poppins',sans-serif" }, maxTicksLimit: 12 } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9ca3af', font: { family: "'Poppins',sans-serif" } } }
  }
};

/* ── Component ───────────────────────────────────────────── */
export default function Analytics() {
  const [dateRange, setDateRange] = useState('30 Days');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalOrders: 0, newUsers: 0, messages: 0, avgOrderValue: 0 });
  const [timeSeries, setTimeSeries] = useState({ labels: [], revenue: [], counts: [] });
  const [statusBreakdown, setStatusBreakdown] = useState({});
  const [orders, setOrders] = useState([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { start, end } = getDateRange(dateRange, customStart, customEnd);
    const [rawOrders, newUsers, messages] = await Promise.all([
      fetchOrdersInRange(start, end),
      fetchNewUsersCountInRange(start, end),
      fetchInquiriesCountInRange(start, end),
    ]);
    const totalRevenue = rawOrders.reduce((s, o) => s + Number(o.total || 0), 0);
    const totalOrders = rawOrders.length;
    setOrders(rawOrders);
    setMetrics({ totalRevenue, totalOrders, newUsers, messages, avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0 });
    setTimeSeries(buildTimeSeries(rawOrders, start, end, dateRange));
    setStatusBreakdown(buildStatusBreakdown(rawOrders));
    setLoading(false);
  }, [dateRange, customStart, customEnd]);

  useEffect(() => { loadData(); }, [loadData]);

  /* Chart datasets */
  const lineData = {
    labels: timeSeries.labels,
    datasets: [
      { label: 'Revenue (₹)', data: timeSeries.revenue, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.15)', borderWidth: 2, tension: 0.4, fill: 'origin', pointRadius: 3, pointHoverRadius: 6 },
      { label: 'Orders', data: timeSeries.counts, borderColor: '#d946ef', backgroundColor: 'rgba(217,70,239,0.10)', borderWidth: 2, tension: 0.4, fill: 'origin', pointRadius: 3, pointHoverRadius: 6, yAxisID: 'y2' },
    ]
  };

  const lineOpts = {
    ...CHART_OPTS,
    scales: {
      ...CHART_OPTS.scales,
      y:  { ...CHART_OPTS.scales.y, position: 'left' },
      y2: { ...CHART_OPTS.scales.y, position: 'right', grid: { display: false } }
    }
  };

  const statusKeys = Object.keys(statusBreakdown);
  const statusColors = ['#8b5cf6','#d946ef','#10b981','#f59e0b','#ef4444','#3b82f6'];
  const doughnutData = {
    labels: statusKeys.length ? statusKeys.map(s => s.charAt(0).toUpperCase() + s.slice(1)) : ['No Orders'],
    datasets: [{ data: statusKeys.length ? statusKeys.map(k => statusBreakdown[k]) : [1], backgroundColor: statusColors, borderWidth: 0, hoverOffset: 4 }]
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">

      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wider font-cinzel mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400 font-poppins text-sm">Real-time breakdown from Supabase data</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-poppins">
          {/* Range pills */}
          <div className="flex bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 shadow-lg">
            {['7 Days','30 Days','90 Days','12 Months'].map(r => (
              <button key={r} onClick={() => { setDateRange(r); setShowCustom(false); }}
                className={`px-4 py-2 text-sm font-bold tracking-wide rounded-xl transition-all duration-300 ${dateRange === r && !showCustom ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}>
                {r}
              </button>
            ))}
          </div>

          {/* Custom button */}
          <button onClick={() => { setShowCustom(s => !s); setDateRange('Custom'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold tracking-wide transition-all shadow-lg ${showCustom ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-violet-500 text-white' : 'bg-white/[0.02] border-white/[0.05] text-gray-300 hover:text-white hover:bg-white/[0.05]'}`}>
            <HiOutlineCalendar className="text-lg" /> Custom
          </button>

          {/* Download PDF */}
          <button onClick={() => downloadPDF(metrics, timeSeries, dateRange)}
            className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all shadow-lg"
            title="Download PDF report">
            <HiOutlineDownload className="text-lg" />
          </button>
        </div>
      </div>

      {/* Custom date pickers */}
      <AnimatePresence>
        {showCustom && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-end gap-4 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl font-poppins overflow-hidden">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Start Date</label>
              <input type="date" max={customEnd || today} value={customStart}
                onChange={e => setCustomStart(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">End Date</label>
              <input type="date" min={customStart} max={today} value={customEnd}
                onChange={e => setCustomEnd(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-all" />
            </div>
            <button onClick={loadData}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold tracking-wide hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg">
              Apply
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-3 text-gray-400 font-poppins text-sm">
          <span className="w-4 h-4 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          Loading analytics data...
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: `₹${metrics.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`, icon: HiOutlineCurrencyRupee, color: 'text-violet-400' },
          { title: 'Total Orders',  value: metrics.totalOrders.toString(), icon: HiOutlineShoppingCart, color: 'text-fuchsia-400' },
          { title: 'New Users',     value: metrics.newUsers.toString(),    icon: HiOutlineUsers,        color: 'text-blue-400'    },
          { title: 'Messages',      value: metrics.messages.toString(),    icon: HiOutlineMail,         color: 'text-emerald-400' },
        ].map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="bg-white/[0.02] p-6 rounded-3xl border border-white/[0.05] shadow-2xl flex items-start justify-between group hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden font-poppins">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-widest text-gray-400 mb-2 uppercase">{title}</p>
              <h4 className="text-3xl font-bold text-white font-cinzel tracking-wider">{loading ? '—' : value}</h4>
              <p className="text-xs text-gray-500 mt-2 font-medium">{dateRange === 'Custom' ? 'Custom range' : `Last ${dateRange.toLowerCase()}`}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.05] shadow-inner ${color} group-hover:scale-110 transition-transform duration-500 relative z-10`}>
              <Icon className="text-3xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Avg Order Value */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/[0.05] shadow-2xl font-poppins">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Avg Order Value</p>
          <h4 className="text-3xl font-bold text-white font-cinzel">
            {loading ? '—' : `₹${metrics.avgOrderValue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`}
          </h4>
          <p className="text-xs text-gray-500 mt-2">Per order in this period</p>
        </div>
        <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/[0.05] shadow-2xl font-poppins">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Order Status Breakdown</p>
          {Object.keys(statusBreakdown).length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">No orders in this period</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(statusBreakdown).map(([s, c], i) => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: statusColors[i % statusColors.length] + '33', border: `1px solid ${statusColors[i % statusColors.length]}55`, color: statusColors[i % statusColors.length] }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}: {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Revenue / Orders Chart */}
      <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Revenue & Orders Over Time</h3>
            <p className="text-sm text-gray-400 mt-1 font-poppins">Real data from Supabase orders table</p>
          </div>
          <HiOutlineTrendingUp className="text-3xl text-violet-400 opacity-40" />
        </div>
        <div className="h-[380px] w-full relative z-10">
          {timeSeries.labels.length > 0 ? (
            <Line data={lineData} options={lineOpts} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 font-poppins text-sm">No order data for this period</div>
          )}
        </div>
      </div>

      {/* Order Status Doughnut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="mb-6 relative z-10">
            <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Order Status Distribution</h3>
            <p className="text-sm text-gray-400 mt-2 font-poppins">Breakdown by current status</p>
          </div>
          <div className="h-[280px] w-full flex-1 flex items-center justify-center relative z-10">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right', labels: { color: '#9ca3af', usePointStyle: true, padding: 20, font: { family: "'Poppins',sans-serif" } } }, tooltip: { backgroundColor: 'rgba(15,16,25,0.95)', padding: 12, cornerRadius: 8, titleFont: { family: "'Poppins',sans-serif" }, bodyFont: { family: "'Poppins',sans-serif" } } } }} />
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden relative group flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-l from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="p-6 border-b border-white/[0.05] relative z-10">
            <h3 className="text-xl font-bold text-white tracking-wider font-cinzel">Recent Orders</h3>
            <p className="text-sm text-gray-400 mt-1 font-poppins">Last {Math.min(orders.length, 8)} orders in this period</p>
          </div>
          <div className="overflow-y-auto flex-1 relative z-10 custom-scrollbar">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-poppins text-sm">No orders in this period</div>
            ) : (
              <table className="w-full font-poppins text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/[0.05]">
                    <th className="py-3 px-5 text-left font-semibold">Customer</th>
                    <th className="py-3 px-5 text-right font-semibold">Amount</th>
                    <th className="py-3 px-5 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...orders].reverse().slice(0, 8).map((o, i) => (
                    <tr key={o.id || i} className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-5 text-gray-300 font-medium truncate max-w-[140px]">
                        {o.shipping_address?.fullName || o.shipping_address?.name || 'Guest'}
                      </td>
                      <td className="py-3 px-5 text-right text-violet-400 font-bold">₹{Number(o.total || 0).toLocaleString('en-IN')}</td>
                      <td className="py-3 px-5 text-right">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          o.status === 'delivered' ? 'bg-emerald-500/15 text-emerald-400' :
                          o.status === 'shipped'   ? 'bg-blue-500/15 text-blue-400' :
                          o.status === 'cancelled' ? 'bg-rose-500/15 text-rose-400' :
                          'bg-amber-500/15 text-amber-400'
                        }`}>{(o.status || 'pending').charAt(0).toUpperCase() + (o.status || 'pending').slice(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
}