import React from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity } from 'react-icons/fi';
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
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Card from '../components/Card';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Revenue ($)',
        data: [1200, 1900, 1500, 2200, 1800, 3200],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Visitors',
        data: [150, 230, 180, 290, 200, 350, 400],
        backgroundColor: 'rgb(236, 72, 153)',
      },
    ],
  };

  const doughnutData = {
    labels: ['T-Shirts', 'Hoodies', 'Mugs', 'Caps'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#9ca3af' } },
    },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#9ca3af' } },
    },
  };

  const recentOrders = [
    { id: '#DC-1045', customer: 'Alice Johnson', product: 'Custom Hoodie', status: 'Delivered', amount: '$45.00' },
    { id: '#DC-1046', customer: 'Bob Smith', product: 'Printed T-Shirt', status: 'Processing', amount: '$25.00' },
    { id: '#DC-1047', customer: 'Charlie Davis', product: 'Embroidered Cap', status: 'Shipped', amount: '$18.50' },
    { id: '#DC-1048', customer: 'Diana Ross', product: 'Photo Mug', status: 'Pending', amount: '$15.00' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value="1,245" icon={<FiUsers size={24} />} trend="12%" trendUp={true} />
        <Card title="Total Orders" value="842" icon={<FiShoppingBag size={24} />} trend="5%" trendUp={true} />
        <Card title="Revenue" value="$12,450" icon={<FiDollarSign size={24} />} trend="8%" trendUp={true} />
        <Card title="Active Visitors" value="48" icon={<FiActivity size={24} />} trend="2%" trendUp={false} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-bold mb-4">Sales Overview</h3>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-bold mb-4">Visitor Growth</h3>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/50 lg:col-span-2 overflow-hidden">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                    <td className="py-3 px-4 font-medium text-purple-400">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.product}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-bold mb-4">Product Performance</h3>
          <div className="h-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}