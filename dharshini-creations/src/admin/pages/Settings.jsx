import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlinePuzzle,
  HiOutlineCamera,
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineGlobe,
  HiOutlineLockClosed,

} from 'react-icons/hi';

/* ── Inline Toggle Component ── */
const Toggle = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/[0.05] last:border-0">
    <div className="pr-4">
      <p className="text-white font-semibold font-poppins text-sm tracking-wide">{label}</p>
      {description && <p className="text-gray-400 text-xs mt-1 font-poppins">{description}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none shadow-inner ${
        enabled ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600' : 'bg-white/[0.1]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

/* ── Tab Configuration ── */
const TABS = [
  { id: 'profile', label: 'Profile', icon: HiOutlineUser },
  { id: 'notifications', label: 'Notifications', icon: HiOutlineBell },
  { id: 'security', label: 'Security', icon: HiOutlineShieldCheck },
  { id: 'integrations', label: 'Integrations', icon: HiOutlinePuzzle },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  /* Profile State */
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@dharshini.com',
    phone: '+91 81224 59197',
    role: 'Administrator',
    bio: 'Managing Dharshini Creations admin panel.',
  });

  /* Notification Toggles */
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    sms: false,
    orders: true,
    signups: true,
    lowStock: true,
    marketing: false,
  });



  /* Security State */
  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' });
  const [twoFactor, setTwoFactor] = useState(false);

  const [sessions] = useState([
    { device: 'Chrome on Windows', icon: HiOutlineDesktopComputer, location: 'Chennai, India', lastActive: 'Active now', current: true },
    { device: 'Safari on iPhone', icon: HiOutlineDeviceMobile, location: 'Mumbai, India', lastActive: '2 hours ago', current: false },
    { device: 'Firefox on macOS', icon: HiOutlineGlobe, location: 'Bangalore, India', lastActive: '3 days ago', current: false },
  ]);

  /* Integrations State */
  const [integrations, setIntegrations] = useState([
    { id: 'ga', name: 'Google Analytics', desc: 'Track website traffic and user behavior', emoji: '📊', connected: true },
    { id: 'stripe', name: 'Stripe Payments', desc: 'Process payments and subscriptions', emoji: '💳', connected: true },
    { id: 'slack', name: 'Slack Notifications', desc: 'Get order and system alerts in Slack', emoji: '💬', connected: false },
    { id: 'mailchimp', name: 'Mailchimp', desc: 'Email marketing and campaign management', emoji: '📧', connected: false },
  ]);

  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
  };

  const handleSave = () => alert('Settings saved successfully!');

  /* ── Accent Colors ── */
  const accentColors = [
    { id: 'violet', bg: 'bg-violet-500', ring: 'ring-violet-400' },
    { id: 'fuchsia', bg: 'bg-fuchsia-500', ring: 'ring-fuchsia-400' },
    { id: 'rose', bg: 'bg-rose-500', ring: 'ring-rose-400' },
    { id: 'emerald', bg: 'bg-emerald-500', ring: 'ring-emerald-400' },
    { id: 'amber', bg: 'bg-amber-500', ring: 'ring-amber-400' },
  ];

  /* ── Tab Content Renderer ── */
  const renderContent = () => {
    switch (activeTab) {

      /* ═══════ PROFILE ═══════ */
      case 'profile':
        return (
          <div className="space-y-8 font-poppins">
            <div>
              <h3 className="text-2xl font-bold font-cinzel text-white mb-2 tracking-wider">Profile Settings</h3>
              <p className="text-gray-400 text-sm">Manage your personal information</p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all">
                  A
                </div>
                <button className="absolute inset-0 rounded-3xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <HiOutlineCamera className="text-white text-2xl" />
                </button>
              </div>
              <div>
                <p className="text-white font-bold text-xl tracking-wide">{profile.name}</p>
                <p className="text-fuchsia-400 font-medium text-sm mt-1">{profile.role}</p>
                <button className="mt-3 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-white transition-colors bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1.5 rounded-lg">Change Avatar</button>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Role</label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full bg-white/[0.01] border border-white/[0.03] rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed shadow-inner"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all resize-none shadow-inner custom-scrollbar"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
              <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Save Changes
              </button>
              <button className="px-8 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-gray-300 hover:text-white hover:bg-white/[0.05] font-bold tracking-wider transition-all">
                Cancel
              </button>
            </div>
          </div>
        );

      /* ═══════ NOTIFICATIONS ═══════ */
      case 'notifications':
        return (
          <div className="space-y-8 font-poppins">
            <div>
              <h3 className="text-2xl font-bold font-cinzel text-white mb-2 tracking-wider">Notification Preferences</h3>
              <p className="text-gray-400 text-sm">Choose what notifications you receive</p>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h4 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-4">Channels</h4>
                <Toggle label="Email Notifications" description="Receive updates via email" enabled={notifs.email} onChange={(v) => setNotifs({ ...notifs, email: v })} />
                <Toggle label="Push Notifications" description="Browser and mobile push alerts" enabled={notifs.push} onChange={(v) => setNotifs({ ...notifs, push: v })} />
                <Toggle label="SMS Notifications" description="Get text messages for critical alerts" enabled={notifs.sms} onChange={(v) => setNotifs({ ...notifs, sms: v })} />
              </div>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-4">Alert Types</h4>
                <Toggle label="Order Alerts" description="New orders, cancellations, and returns" enabled={notifs.orders} onChange={(v) => setNotifs({ ...notifs, orders: v })} />
                <Toggle label="New User Signups" description="Get notified when new users register" enabled={notifs.signups} onChange={(v) => setNotifs({ ...notifs, signups: v })} />
                <Toggle label="Low Stock Warnings" description="Alert when product stock drops below threshold" enabled={notifs.lowStock} onChange={(v) => setNotifs({ ...notifs, lowStock: v })} />
                <Toggle label="Marketing Updates" description="Product tips, feature updates, and newsletters" enabled={notifs.marketing} onChange={(v) => setNotifs({ ...notifs, marketing: v })} />
              </div>
            </div>

            <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              Save Preferences
            </button>
          </div>
        );

      // Appearance tab removed

      /* ═══════ SECURITY ═══════ */
      case 'security':
        return (
          <div className="space-y-8 font-poppins">
            <div>
              <h3 className="text-2xl font-bold font-cinzel text-white mb-2 tracking-wider">Security Settings</h3>
              <p className="text-gray-400 text-sm">Manage your account security and sessions</p>
            </div>

            {/* Change Password */}
            <div className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <HiOutlineLockClosed className="text-violet-400 text-2xl" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-wide">Change Password</h4>
                  <p className="text-gray-400 text-xs mt-1">Update your password regularly for security</p>
                </div>
              </div>
              
              <div className="relative z-10 space-y-5 max-w-lg">
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Current Password</label>
                  <input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">New Password</label>
                  <input type="password" value={passwords.newPw} onChange={(e) => setPasswords({ ...passwords, newPw: e.target.value })} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-gray-400 mb-2">Confirm New Password</label>
                  <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all shadow-inner" placeholder="••••••••" />
                </div>
                <div className="pt-2">
                  <button onClick={() => alert('Password updated!')} className="px-8 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-bold tracking-wider transition-all shadow-lg">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Factor */}
            <div className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <HiOutlineShieldCheck className="text-emerald-400 text-2xl" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-wide">Two-Factor Authentication</h4>
                  <p className="text-gray-400 text-xs mt-1">Add an extra layer of security to your account</p>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                <span className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${twoFactor ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/[0.05] text-gray-400 border border-white/10'}`}>
                  {twoFactor ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 shadow-inner ${
                    twoFactor ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-white/[0.1]'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 md:p-8 space-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h4 className="text-white font-bold text-lg tracking-wide mb-4 relative z-10">Active Sessions</h4>
              
              <div className="relative z-10 space-y-1">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.02] transition-colors group/session">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center shadow-inner group-hover/session:bg-white/[0.1] transition-colors">
                        <s.icon className="text-gray-400 text-xl group-hover/session:text-fuchsia-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold tracking-wide flex items-center gap-3">
                          {s.device}
                          {s.current && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest font-bold">Current</span>}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{s.location} · {s.lastActive}</p>
                      </div>
                    </div>
                    {!s.current && (
                      <button className="text-xs font-bold tracking-wider uppercase text-rose-400 hover:text-rose-300 px-4 py-2 rounded-xl border border-rose-500/20 hover:bg-rose-500/10 transition-colors">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-6 relative z-10">
                <button className="px-6 py-3 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50 text-sm font-bold tracking-wider transition-all duration-300 shadow-lg">
                  Revoke All Other Sessions
                </button>
              </div>
            </div>
          </div>
        );

      /* ═══════ INTEGRATIONS ═══════ */
      case 'integrations':
        return (
          <div className="space-y-8 font-poppins">
            <div>
              <h3 className="text-2xl font-bold font-cinzel text-white mb-2 tracking-wider">Integrations</h3>
              <p className="text-gray-400 text-sm">Connect third-party services to your dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integ) => (
                <div key={integ.id} className="bg-white/[0.01] rounded-3xl border border-white/[0.05] p-6 hover:bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300 group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${integ.connected ? 'from-emerald-500/5' : 'from-violet-500/5'} to-transparent`} />
                  
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {integ.emoji}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg tracking-wide">{integ.name}</h4>
                        <span className={`inline-block mt-1 text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                          integ.connected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/[0.05] text-gray-400 border-white/10'
                        }`}>
                          {integ.connected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="relative z-10 text-gray-400 text-sm mb-6 leading-relaxed h-10">{integ.desc}</p>
                  
                  <button
                    onClick={() => toggleIntegration(integ.id)}
                    className={`relative z-10 w-full py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg ${
                      integ.connected
                        ? 'border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50'
                        : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]'
                    }`}
                  >
                    {integ.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-cinzel text-white mb-2 tracking-wider">Settings</h2>
        <p className="text-gray-400 font-poppins text-sm">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 font-poppins">
        {/* Tab Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 custom-scrollbar">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold tracking-wider transition-all duration-300 relative group overflow-hidden whitespace-nowrap ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {/* Active Background */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/5 border border-white/[0.05] rounded-2xl" />
                  )}
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                  )}
                  {/* Hover Background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                  )}
                  
                  <Icon className={`text-xl relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-violet-400' : ''}`} />
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                {renderContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}