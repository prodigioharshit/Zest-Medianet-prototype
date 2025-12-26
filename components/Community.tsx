
import React from 'react';
import { MessageSquare, Users, MessageCircle, DollarSign, BarChart3, TrendingUp, Search, Plus } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  time: string;
  text: string;
  isMe?: boolean;
}

interface Thread {
  id: string;
  title: string;
  category: string;
  members: number;
  lastMessage: string;
  messages: ChatMessage[];
  icon: React.ReactNode;
}

const communityThreads: Thread[] = [
  {
    id: 't1',
    title: 'How to generate custom analytics?',
    category: 'Advanced Usage',
    members: 124,
    lastMessage: '2 mins ago',
    icon: <BarChart3 className="text-indigo-600" size={18} />,
    messages: [
      { id: 'm1', user: 'Sarah G.', avatar: 'https://picsum.photos/seed/sarah/50', time: '10:05 AM', text: "Hey everyone! Quick question: Is there a way to export my attribution data directly to BigQuery from the Analytics tab?" },
      { id: 'm2', user: 'Zest Support', avatar: 'https://picsum.photos/seed/support/50', time: '10:12 AM', text: "Hi Sarah! Yes, you can. Go to Analytics -> Campaign Breakdown and click the 'Download Dataset' button in the campaign detail view. API access for BigQuery is available in our Enterprise tier." },
      { id: 'm3', user: 'Deep Pathak', avatar: 'https://picsum.photos/seed/deep/50', time: '10:15 AM', text: "I've been using the detailed report feature to get my CSVs. It's really handy for custom Excel dashboards.", isMe: true }
    ]
  },
  {
    id: 't2',
    title: 'Help on Pricing Tiers',
    category: 'Account',
    members: 89,
    lastMessage: '1 hour ago',
    icon: <DollarSign className="text-emerald-600" size={18} />,
    messages: [
      { id: 'm4', user: 'Marcus L.', avatar: 'https://picsum.photos/seed/marcus/50', time: 'Yesterday', text: "Could someone clarify the difference between the 'Growth' and 'Pro' pricing? Does Pro include the Gemini 3 Pro image generation?" },
      { id: 'm5', user: 'Emily R.', avatar: 'https://picsum.photos/seed/emily/50', time: 'Yesterday', text: "Pro gives you unlimited ad variants and the advanced targeting models. Gemini 3 Pro image generation is definitely a Pro-only feature!" },
      { id: 'm6', user: 'Zest Support', avatar: 'https://picsum.photos/seed/support/50', time: 'Yesterday', text: "Exactly, Emily. Pro is $99/mo and includes our full AI creative suite and native Zest Network access." }
    ]
  },
  {
    id: 't3',
    title: 'Revenue vs Active ROI Relationship',
    category: 'Strategy',
    members: 256,
    lastMessage: '15 mins ago',
    icon: <TrendingUp className="text-amber-600" size={18} />,
    messages: [
      { id: 'm7', user: 'Alex K.', avatar: 'https://picsum.photos/seed/alex/50', time: '9:00 AM', text: "I'm seeing a drop in ROI but an increase in Total Revenue. Should I be worried?" },
      { id: 'm8', user: 'Deep Pathak', avatar: 'https://picsum.photos/seed/deep/50', time: '9:20 AM', text: "Not necessarily! As you scale budget (spend), ROI often dips slightly due to reaching broader audiences. If your Total Revenue is growing faster than your costs, you're winning at scale.", isMe: true },
      { id: 'm9', user: 'Growth Guru', avatar: 'https://picsum.photos/seed/guru/50', time: '9:30 AM', text: "Spot on, Deep. Think of Total Revenue as the 'Size of the Prize' and ROI as your 'Fuel Efficiency'. You want a fast car, even if it eats a bit more gas as it accelerates!" }
    ]
  }
];

const Community: React.FC = () => {
  const [activeThreadId, setActiveThreadId] = React.useState(communityThreads[0].id);
  const activeThread = communityThreads.find(t => t.id === activeThreadId) || communityThreads[0];

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Thread List */}
      <div className="w-80 flex flex-col gap-6">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Channels</h3>
            <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search topics..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/10 outline-none" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
          {communityThreads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`w-full p-5 rounded-[24px] text-left transition-all group ${
                activeThreadId === thread.id 
                ? 'bg-white border border-indigo-100 shadow-lg shadow-indigo-500/5' 
                : 'hover:bg-white/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                  {thread.icon}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{thread.category}</span>
              </div>
              <h4 className={`text-sm font-bold mb-1 line-clamp-1 ${activeThreadId === thread.id ? 'text-indigo-600' : 'text-slate-700'}`}>
                {thread.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                  <Users size={10} /> {thread.members} members
                </span>
                <span className="text-[10px] font-medium text-slate-400 italic">{thread.lastMessage}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
               {activeThread.icon}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{activeThread.title}</h3>
              <p className="text-xs text-slate-400 font-medium">Discussion within <span className="text-indigo-600 font-bold">{activeThread.category}</span></p>
            </div>
          </div>
          <div className="flex -space-x-3">
             {[1, 2, 3, 4].map(i => (
               <img key={i} src={`https://picsum.photos/seed/${activeThread.id}${i}/40`} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+120</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeThread.messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
               {!msg.isMe && <img src={msg.avatar} className="w-10 h-10 rounded-2xl object-cover shrink-0" />}
               <div className={`space-y-2 max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                 <div className={`flex items-baseline gap-2 mb-1 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                   <span className="text-xs font-black text-slate-800">{msg.user}</span>
                   <span className="text-[10px] font-medium text-slate-400">{msg.time}</span>
                 </div>
                 <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                   msg.isMe 
                   ? 'bg-indigo-600 text-white rounded-tr-none' 
                   : 'bg-slate-50 text-slate-600 border border-slate-100 rounded-tl-none'
                 }`}>
                   {msg.text}
                 </div>
               </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-8 border-t border-slate-50">
          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-3xl border border-slate-100">
             <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
               <Plus size={20} />
             </button>
             <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium" />
             <button className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors">
                <MessageCircle size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
