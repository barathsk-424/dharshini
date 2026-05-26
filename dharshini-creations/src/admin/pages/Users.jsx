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
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 border-b border-gray-700">
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Email</th>
                <th className="py-4 px-6 font-medium">Role</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Joined Date</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{user.name}</td>
                  <td className="py-4 px-6 text-gray-300">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-300'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                      {user.status === 'Active' ? <FiCheckCircle /> : <FiUserX />}
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{user.joined}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors p-1" title="Edit User">
                        <FiEdit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleBlockUser(user.id)}
                        className={`${user.status === 'Active' ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'} transition-colors p-1`} 
                        title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                      >
                        {user.status === 'Active' ? <FiUserX size={18} /> : <FiCheckCircle size={18} />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1" 
                        title="Delete User"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    No users found matching "{searchTerm}"
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