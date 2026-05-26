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
      className="h-[calc(100vh-8rem)] flex flex-col font-poppins"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold font-cinzel text-white tracking-wider mb-2">Messages</h2>
          <p className="text-sm text-gray-400">Manage customer inquiries and support tickets.</p>
        </div>
      </div>

      <div className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-50 pointer-events-none" />
        
        {/* Left List */}
        <div className={`w-full md:w-[380px] border-r border-white/[0.05] flex flex-col relative z-10 bg-white/[0.01] ${activeMessage ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-white/[0.05]">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-white/[0.02] border border-white/[0.05] text-white rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner placeholder-gray-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 mb-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeMessage?.id === msg.id 
                    ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/10 border border-violet-500/30 shadow-lg' 
                    : 'hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-bold tracking-wide text-sm ${msg.read ? 'text-gray-400' : 'text-white'}`}>{msg.sender}</span>
                  <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{msg.date}</span>
                </div>
                <div className={`text-sm mb-2 truncate tracking-wide ${msg.read ? 'text-gray-400' : 'text-fuchsia-400 font-bold'}`}>
                  {msg.subject}
                </div>
                <div className="text-xs text-gray-500 truncate leading-relaxed">
                  {msg.preview}
                </div>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                <FiSearch size={32} className="mb-4 opacity-20" />
                <p className="text-sm font-bold tracking-wide">No messages found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className={`flex-1 flex flex-col relative z-10 ${!activeMessage ? 'hidden md:flex' : 'flex'}`}>
          {activeMessage ? (
            <>
              {/* Message Header */}
              <div className="p-8 border-b border-white/[0.05] flex justify-between items-start bg-white/[0.02]">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <button className="md:hidden p-2 rounded-xl bg-white/[0.05] text-gray-400 hover:text-white transition-colors" onClick={() => setActiveMessage(null)}>
                      <FiCornerUpLeft size={20} />
                    </button>
                    <h3 className="text-2xl font-bold font-cinzel text-white tracking-wide">{activeMessage.subject}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold tracking-wide text-violet-400 bg-violet-500/10 px-3 py-1 rounded-lg">{activeMessage.sender}</span>
                    <span className="text-gray-500 font-medium">&lt;{activeMessage.email}&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/[0.05] px-3 py-1.5 rounded-lg">{activeMessage.date}</span>
                  <button onClick={() => deleteMessage(activeMessage.id)} className="p-2.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all shadow-lg border border-transparent hover:border-rose-500/20" title="Delete">
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-white/[0.01]">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm max-w-3xl">
                  {activeMessage.fullText}
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-8 border-t border-white/[0.05] bg-white/[0.02]">
                <h4 className="text-sm font-bold tracking-wider text-gray-400 mb-4 flex items-center gap-2 uppercase"><FiCornerUpLeft className="text-violet-400" /> Reply to {activeMessage.sender}</h4>
                <textarea 
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 text-white focus:outline-none focus:border-violet-500 focus:bg-white/[0.04] transition-all shadow-inner h-32 resize-none mb-4 custom-scrollbar text-sm"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                  <button 
                    onClick={sendReply}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-3 rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all font-bold tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                  >
                    Send Reply <FiCheck />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
              <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-6 shadow-inner">
                <FiMail size={40} className="text-gray-600" />
              </div>
              <p className="text-xl font-bold font-cinzel tracking-wider text-gray-400">Select a message</p>
              <p className="text-sm font-poppins mt-2 opacity-60">Choose a conversation from the left to view details</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}