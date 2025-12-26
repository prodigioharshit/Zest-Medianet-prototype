
import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, BarChart3, Settings, Bell, Zap, Globe, HelpCircle, Users, X, Info, AlertTriangle, MessageSquare, Activity, ShieldCheck, Clock, User, CreditCard, LogOut, ChevronRight, Mail, CheckCircle2 } from 'lucide-react';
import { View } from '../types';
import RuthChat from './RuthChat';
import SnowEffect from './SnowEffect';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
}

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'message';
  title: string;
  message: string;
  time: string;
  isImportant?: boolean;
  isRead: boolean;
}

interface PlatformStatus {
  name: string;
  status: 'live' | 'error' | 'syncing';
  lastSync: string;
  latency: string;
  health: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeModal, setActiveModal] = useState<'team' | 'subscription' | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Plan Expiring',
      message: 'Your Pro plan expires in 3 days. Renew now to keep priority AI features.',
      time: '2 hours ago',
      isImportant: true,
      isRead: false
    },
    {
      id: '2',
      type: 'alert',
      title: 'Performance Alert',
      message: 'Meta Ads ROI has dipped below 2.0x. Optimization recommended.',
      time: '5 hours ago',
      isImportant: true,
      isRead: false
    },
    {
      id: '3',
      type: 'message',
      title: 'Community Reply',
      message: 'Sarah G. mentioned you in "Revenue vs ROI relationship".',
      time: '1 day ago',
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Report Ready',
      message: 'Your weekly performance breakdown is now available for download.',
      time: '2 days ago',
      isRead: true
    }
  ]);

  const platformStatuses: PlatformStatus[] = [
    { name: 'Meta Ads', status: 'live', lastSync: '2m ago', latency: '42ms', health: '99.9%' },
    { name: 'Google Ads', status: 'live', lastSync: '14m ago', latency: '68ms', health: '99.8%' },
    { name: 'Zest Exchange', status: 'syncing', lastSync: 'Now', latency: '12ms', health: '100%' },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'dashboard', label: 'Ad Performance', icon: LayoutDashboard },
    { id: 'create-campaign', label: 'New Campaign', icon: PlusCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'faq', label: 'Help & FAQ', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      {/* Subtle Background Aesthetic */}
      <SnowEffect />

      {/* Sidebar */}
      <aside className="w-72 bg-slate-900/95 backdrop-blur-md text-slate-300 hidden md:flex flex-col relative z-20">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white fill-current" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Zest</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? 'text-white' : 'text-slate-500'} />
              <span className="font-semibold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Status Monitoring Section */}
        <div className="px-6 py-5 border-t border-slate-800 space-y-4">
          <div className="bg-slate-800/20 p-4 rounded-2xl border border-slate-700/30">
            <div className="flex items-center gap-2 mb-3 text-indigo-400">
              <Globe size={12} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Network Status</span>
            </div>
            
            <div className="space-y-3">
              {platformStatuses.map((platform) => (
                <div key={platform.name} className="relative group">
                  <div className="flex items-center justify-between cursor-help">
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{platform.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${platform.status === 'live' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400 animate-spin-slow'}`}></div>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${platform.status === 'live' ? 'text-emerald-500' : 'text-amber-400'}`}>
                        {platform.status}
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Tooltip */}
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-48 bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none origin-left">
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45"></div>
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-700/50">
                        <Activity size={12} className="text-indigo-400" />
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{platform.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="space-y-0.5">
                          <p className="text-[8px] font-bold text-slate-500 uppercase flex items-center gap-1"><Clock size={8} /> Last Sync</p>
                          <p className="text-[10px] font-mono font-bold text-slate-200">{platform.lastSync}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[8px] font-bold text-slate-500 uppercase flex items-center gap-1"><Zap size={8} /> Latency</p>
                          <p className="text-[10px] font-mono font-bold text-slate-200">{platform.latency}</p>
                        </div>
                        <div className="space-y-0.5 col-span-2 pt-1">
                          <p className="text-[8px] font-bold text-slate-500 uppercase flex items-center gap-1"><ShieldCheck size={8} /> Node Health</p>
                          <p className="text-[10px] font-mono font-bold text-emerald-400">{platform.health} Operational</p>
                        </div>
                      </div>
                      {platform.status === 'syncing' && (
                        <div className="pt-1">
                          <div className="h-0.5 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-1/2 animate-shimmer"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setView('community')}
            className={`w-full flex items-center gap-4 px-4 py-1.5 transition-colors ${activeView === 'community' ? 'text-white bg-slate-800 rounded-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Users size={18} />
            <span className="text-xs font-semibold">Community</span>
          </button>

          <button 
            onClick={() => setView('settings')}
            className={`w-full flex items-center gap-4 px-4 py-1.5 transition-colors ${activeView === 'settings' ? 'text-white bg-slate-800 rounded-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Settings size={18} />
            <span className="text-xs font-semibold">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent relative z-10">
        <header className="h-20 border-b border-slate-100 bg-white/70 backdrop-blur-md flex items-center justify-between px-10 shrink-0 relative z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
              {activeView.replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 tracking-tighter">Budget Balance</span>
              <span className="text-sm font-bold text-slate-700">$1,240.50</span>
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 transition-colors relative rounded-full ${showNotifications ? 'bg-slate-100 text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-black text-slate-900 tracking-tight">Activity</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllRead}
                          className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className={`p-5 flex gap-4 transition-colors relative border-b border-slate-50/50 last:border-none ${!n.isRead ? 'bg-indigo-50/20' : 'hover:bg-slate-50'}`}
                        >
                          <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                            n.type === 'alert' ? 'bg-rose-50 text-rose-500' : 
                            n.type === 'message' ? 'bg-indigo-50 text-indigo-500' : 'bg-blue-50 text-blue-500'
                          }`}>
                            {n.type === 'alert' && <AlertTriangle size={18} />}
                            {n.type === 'message' && <MessageSquare size={18} />}
                            {n.type === 'info' && <Info size={18} />}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className={`text-xs font-bold ${n.isImportant ? 'text-rose-600' : 'text-slate-900'}`}>
                                {n.title}
                              </p>
                              {!n.isRead && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-normal">{n.message}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{n.time}</p>
                          </div>
                          {n.isImportant && (
                            <div className="absolute right-4 top-5">
                              <span className="bg-rose-500 w-1 h-8 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-50 flex justify-center">
                       <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                         View all notifications
                       </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 relative" ref={profileRef}>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-sm font-bold text-slate-900">Deep Pathak</p>
                    <span className="px-1.5 py-0.5 bg-indigo-600 text-white text-[8px] font-black rounded uppercase tracking-tighter shadow-sm">Pro</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Growth Lead</p>
                </div>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full border-2 border-indigo-100 p-0.5 hover:border-indigo-400 transition-all cursor-pointer overflow-hidden"
                >
                   <img src="https://picsum.photos/seed/deep/100" className="rounded-full w-full h-full object-cover" alt="Profile" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                    <div className="p-2 space-y-1">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">
                        <User size={18} className="text-slate-400" />
                        Profile
                      </button>
                      <button 
                        onClick={() => { setShowProfileMenu(false); setActiveModal('team'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all"
                      >
                        <Users size={18} className="text-slate-400" />
                        Team members
                      </button>
                      <button 
                        onClick={() => { setShowProfileMenu(false); setActiveModal('subscription'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all"
                      >
                        <CreditCard size={18} className="text-slate-400" />
                        Subscription details
                      </button>
                      <div className="my-1 border-t border-slate-50"></div>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                        onClick={() => alert('Signing out...')}
                      >
                        <LogOut size={18} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 pb-32 relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Team Members Modal */}
      {activeModal === 'team' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-slate-200 p-10">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-10 right-10 p-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-all text-slate-400"
            >
              <X size={24} />
            </button>
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Team Architecture</h3>
                <p className="text-slate-500 font-medium text-sm mt-1">Manage collaborators on your workspace.</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Deep Pathak', role: 'Growth Lead / Owner', avatar: 'deep', status: 'Online' },
                  { name: 'Sarah G.', role: 'Creative Director', avatar: 'sarah', status: 'Idle' },
                  { name: 'Marcus L.', role: 'Data Scientist', avatar: 'marcus', status: 'Away' }
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={`https://picsum.photos/seed/${member.avatar}/100`} className="w-12 h-12 rounded-2xl object-cover" alt={member.name} />
                      <div>
                        <p className="font-bold text-slate-800">{member.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{member.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Users size={18} /> Invite New Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Details Modal */}
      {activeModal === 'subscription' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-slate-200">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-10 right-10 p-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-all text-slate-400"
            >
              <X size={24} />
            </button>
            <div className="p-10 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center text-white shadow-2xl shadow-indigo-100">
                   <Zap size={40} className="fill-current" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Pro Plan</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Active</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-3">Billed Monthly</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Next Invoice</span>
                    <span className="text-lg font-black text-slate-900">$99.00 USD</span>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-slate-200/50">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Renewal Date</span>
                    <span className="text-sm font-bold text-slate-700">June 14, 2024</span>
                 </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Enabled Modules</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Unlimited Campaigns', 'Gemini 3 AI Access', 'Multi-Node Hosting', 'Priority Support', 'Custom Attribution', 'Team Seats (5)'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all">Manage Billing</button>
                <button className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Upgrade to Enterprise</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global AI Assistant - Ruth */}
      <RuthChat />
    </div>
  );
};

export default Layout;
