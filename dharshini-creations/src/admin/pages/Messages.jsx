import React, { useState } from 'react';
import { FiMail, FiCheck, FiCornerUpLeft, FiTrash2, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Messages() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice Johnson', email: 'alice@example.com', subject: 'Question about custom embroidery', preview: 'Hi, I was wondering if you can do custom logos on the hoodies?', fullText: 'Hi,\n\nI was wondering if you can do custom logos on the hoodies? I have a design for my startup and would love to get a bulk order of 20 hoodies if possible.\n\nThanks,\nAlice', date: '2 hours ago', read: false },
    { id: 2, sender: 'Bob Smith', email: 'bob@example.com', subject: 'Order delay', preview: 'My order #DC-1045 has not arrived yet. Tracking says...', fullText: 'My order #DC-1045 has not arrived yet. Tracking says it is stuck in transit. Can you look into this?', date: '1 day ago', read: true },
    { id: 3, sender: 'Charlie Davis', email: 'charlie@example.com', subject: 'Return policy', preview: 'What is your return policy on damaged items?', fullText: 'Hello,\n\nWhat is your return policy on damaged items? One of the mugs I received was chipped during shipping.\n\nBest,\nCharlie', date: '2 days ago', read: true },
  ]);

  const filteredMessages = messages.filter(m => 
    m.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== id));
      if (activeMessage?.id === id) setActiveMessage(null);
    }
  };

  const handleSelectMessage = (msg) => {
    setActiveMessage(msg);
    if (!msg.read) markAsRead(msg.id);
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    alert(`Reply sent to ${activeMessage.email}`);
    setReplyText('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
      </div>

      <div className="flex-1 bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg flex flex-col md:flex-row">
        
        {/* Left List */}
        <div className={`w-full md:w-1/3 border-r border-gray-700/50 flex flex-col ${activeMessage ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-700/50">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 border-b border-gray-700/50 cursor-pointer transition-colors ${
                  activeMessage?.id === msg.id ? 'bg-purple-900/20 border-l-4 border-l-purple-500' : 'hover:bg-gray-700/30 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.sender}</span>
                  <span className="text-xs text-gray-500">{msg.date}</span>
                </div>
                <div className={`text-sm mb-1 truncate ${msg.read ? 'text-gray-400' : 'text-purple-400 font-medium'}`}>
                  {msg.subject}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {msg.preview}
                </div>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="p-8 text-center text-gray-500">No messages found.</div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className={`flex-1 flex flex-col ${!activeMessage ? 'hidden md:flex' : 'flex'}`}>
          {activeMessage ? (
            <>
              {/* Message Header */}
              <div className="p-6 border-b border-gray-700/50 flex justify-between items-start bg-gray-800/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setActiveMessage(null)}>
                      <FiCornerUpLeft size={20} />
                    </button>
                    <h3 className="text-xl font-bold text-white">{activeMessage.subject}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-purple-400">{activeMessage.sender}</span>
                    <span className="text-gray-500">&lt;{activeMessage.email}&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 mr-2">{activeMessage.date}</span>
                  <button onClick={() => deleteMessage(activeMessage.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors" title="Delete">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {activeMessage.fullText}
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-6 border-t border-gray-700/50 bg-gray-900/30">
                <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2"><FiCornerUpLeft /> Reply to {activeMessage.sender}</h4>
                <textarea 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none mb-4"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                  <button 
                    onClick={sendReply}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all font-medium shadow-lg shadow-purple-500/20"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
              <FiMail size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}