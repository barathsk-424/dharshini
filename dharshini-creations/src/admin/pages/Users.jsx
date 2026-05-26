import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiUserX, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Data
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', status: 'Active', joined: '2025-10-12' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', status: 'Active', joined: '2025-08-05' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Customer', status: 'Blocked', joined: '2026-01-20' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Customer', status: 'Active', joined: '2026-03-15' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Customer', status: 'Active', joined: '2026-04-10' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockUser = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

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
          <h2 className="text-3xl font-bold font-cinzel text-white mb-2 tracking-wider">User Management</h2>
          <p className="text-sm text-gray-400 font-poppins">Manage administrators and customers effectively.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-80 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="w-full bg-white/[0.02] border border-white/[0.05] text-white rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all duration-300 font-poppins placeholder-gray-500 shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="overflow-x-auto p-4 relative z-10">
          <table className="w-full text-left border-collapse min-w-[700px] font-poppins">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="py-5 px-6 font-semibold">Name</th>
                <th className="py-5 px-6 font-semibold">Email</th>
                <th className="py-5 px-6 font-semibold">Role</th>
                <th className="py-5 px-6 font-semibold">Status</th>
                <th className="py-5 px-6 font-semibold">Joined Date</th>
                <th className="py-5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.04] transition-colors rounded-2xl group/row">
                  <td className="py-4 px-6 font-medium text-white group-hover/row:text-violet-300 transition-colors">{user.name}</td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${user.role === 'Admin' ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20' : 'bg-white/[0.05] text-gray-300 border border-white/10'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase ${user.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {user.status === 'Active' ? <FiCheckCircle /> : <FiUserX />}
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{user.joined}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all shadow-lg" title="Edit User">
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleBlockUser(user.id)}
                        className={`p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] shadow-lg transition-all ${user.status === 'Active' ? 'hover:border-amber-500/50 hover:bg-amber-500/10 text-gray-400 hover:text-amber-400' : 'hover:border-emerald-500/50 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400'}`} 
                        title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                      >
                        {user.status === 'Active' ? <FiUserX size={16} /> : <FiCheckCircle size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-rose-500/50 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-all shadow-lg" 
                        title="Delete User"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiSearch size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-cinzel">No users found.</p>
                      <p className="text-sm font-poppins mt-1 opacity-60">Try adjusting your search criteria.</p>
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