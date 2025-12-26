
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Zap, TrendingUp, Target, Minimize2 } from 'lucide-react';
import { askRuth } from '../services/geminiService.ts';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

const RuthChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi Deep! I'm Ruth, your Personal Ad Manager. I've been analyzing your recent Meta campaigns. Your CTR is looking strong, but we could optimize the landing page bounce rate. How can I help you grow today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await askRuth(input, history);
      
      const ruthMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, ruthMsg]);
    } catch (error) {
      console.error("Ruth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickActions = [
    { label: 'Optimize ROI', icon: TrendingUp },
    { label: 'Audit Budget', icon: Zap },
    { label: 'Targeting Help', icon: Target },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 z-[999] group ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-indigo-600 hover:scale-110 hover:shadow-indigo-500/40'
        }`}
      >
        {isOpen ? (
          <Minimize2 className="text-white" size={24} />
        ) : (
          <div className="relative">
            <MessageSquare className="text-white fill-current" size={28} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-indigo-600 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-indigo-600 rounded-full"></span>
          </div>
        )}
      </button>

      <div className={`fixed bottom-28 right-8 w-96 h-[580px] bg-white rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 z-[998] origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 invisible'
      }`}>
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="fill-current" size={20} />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-tight">Ruth</h3>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                  : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter px-2">{msg.time}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-50 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Ruth anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all text-sm font-medium pr-14"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RuthChat;
