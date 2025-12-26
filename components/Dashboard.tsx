
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Percent, DollarSign, ArrowUpRight, X, Zap, Sliders, BarChart3, Info, ShieldCheck, ChevronRight } from 'lucide-react';
import { Campaign } from '../types.ts';

const performanceData = [
  { name: 'May 1', reach: 4000, conv: 120 },
  { name: 'May 2', reach: 3000, conv: 98 },
  { name: 'May 3', reach: 2000, conv: 150 },
  { name: 'May 4', reach: 2780, conv: 190 },
  { name: 'May 5', reach: 1890, conv: 140 },
  { name: 'May 6', reach: 2390, conv: 210 },
  { name: 'May 7', reach: 3490, conv: 250 },
];

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Spring Promo - Local Pack', goal: 'Conversions', status: 'active', budget: 150, spent: 4200, clicks: 1240, impressions: 45000, ctr: 2.75, cpc: 3.38, createdAt: '2024-05-01' },
  { id: '2', name: 'Waitlist Retargeting', goal: 'Awareness', status: 'active', budget: 50, spent: 850, clicks: 320, impressions: 88000, ctr: 0.36, cpc: 2.65, createdAt: '2024-05-10' },
];

const Dashboard: React.FC = () => {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgets, setBudgets] = useState({
    meta: 150,
    google: 80,
    zest: 45,
    x: 25
  });
  const [autoPilot, setAutoPilot] = useState(true);

  const totalDaily = Object.values(budgets).reduce((a, b) => a + b, 0);
  const monthlyForecast = totalDaily * 30.4;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Growth Overview</h2>
          <p className="text-slate-500 text-sm">Real-time performance across 4 platforms</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">7 Days</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">30 Days</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$12,450', icon: DollarSign, trend: '+12.5%', color: 'indigo' },
          { label: 'Avg. CTR', value: '2.45%', icon: Percent, trend: '+4.2%', color: 'emerald' },
          { label: 'Active ROI', value: '3.8x', icon: Target, trend: '+0.4x', color: 'blue' },
          { label: 'Total Conversions', value: '1,162', icon: TrendingUp, trend: '+8.1%', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`bg-${stat.color}-50 p-3 rounded-xl`}>
                <stat.icon className={`text-${stat.color}-600`} size={22} />
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight size={12} className="mr-1" /> {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Attribution Over Time</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div><span className="text-xs text-slate-500 font-medium">Reach</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-400 rounded-full"></div><span className="text-xs text-slate-500 font-medium">Conversions</span></div>
            </div>
          </div>
          <div className="h-[350px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{stroke: '#6366f1', strokeWidth: 2}}
                />
                <Area type="monotone" dataKey="reach" stroke="#6366f1" fill="url(#colorReach)" strokeWidth={4} />
                <Area type="monotone" dataKey="conv" stroke="#10b981" fill="transparent" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <Target size={180} />
          </div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-400" /> Ad-Channel Mix
          </h3>
          <div className="space-y-8 relative z-10">
            {[
              { label: 'Meta Ads', value: 65, color: 'bg-blue-500', spend: '$2,450' },
              { label: 'Google Search', value: 20, color: 'bg-red-400', spend: '$840' },
              { label: 'Zest Private', value: 10, color: 'bg-indigo-400', spend: '$420' },
              { label: 'X Ads', value: 5, color: 'bg-slate-400', spend: '$150' },
            ].map((platform, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm font-bold block">{platform.label}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{platform.spend} spent</span>
                  </div>
                  <span className="text-xs font-black text-indigo-400">{platform.value}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className={`${platform.color} h-full rounded-full transition-all duration-1000`} style={{width: `${platform.value}%`}}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <button 
              onClick={() => setIsBudgetModalOpen(true)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-900/40 flex items-center justify-center gap-2"
            >
              <Sliders size={18} />
              Manage Budgets
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">In-Flight Campaigns</h3>
            <p className="text-xs text-slate-500 font-medium">Live optimization active for {mockCampaigns.length} campaigns</p>
          </div>
          <div className="flex gap-2">
             <input type="text" placeholder="Search strategy..." className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Strategy Identity</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-center">CTR</th>
                <th className="px-8 py-6 text-center">CPC</th>
                <th className="px-8 py-6">Daily Velocity</th>
                <th className="px-8 py-6 text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-indigo-50/20 transition-colors group cursor-pointer">
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{c.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{c.goal}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">Running</span>
                    </div>
                  </td>
                  <td className="px-8 py-7 text-center">
                    <span className="text-sm font-black text-slate-800">{c.ctr}%</span>
                  </td>
                  <td className="px-8 py-7 text-center">
                    <span className="text-sm font-black text-slate-800">${c.cpc}</span>
                  </td>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full max-w-[80px] overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <span className="text-[11px] font-black text-slate-500 tracking-tighter">${c.budget}/d</span>
                    </div>
                  </td>
                  <td className="px-8 py-7 text-right font-black text-slate-800">
                    ${c.spent.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-300 border border-slate-200">
            <button 
              onClick={() => setIsBudgetModalOpen(false)}
              className="absolute top-10 right-10 p-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-all text-slate-400"
            >
              <X size={24} />
            </button>

            <div className="flex h-full">
              <div className="flex-1 p-12 border-r border-slate-100 space-y-10">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Budget Optimizer</h3>
                  <p className="text-slate-500 font-medium text-sm mt-1">Reallocate daily caps across connected nodes.</p>
                </div>

                <div className="space-y-8">
                  {[
                    { key: 'meta', label: 'Meta Ads', color: 'indigo' },
                    { key: 'google', label: 'Google Search', color: 'rose' },
                    { key: 'zest', label: 'Zest Exchange', color: 'emerald' },
                    { key: 'x', label: 'X Ads', color: 'slate' },
                  ].map((p) => (
                    <div key={p.key} className="space-y-3 group">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors">{p.label}</label>
                        <span className="text-lg font-black text-slate-900 tracking-tighter">${(budgets as any)[p.key]}/day</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        step="5"
                        value={(budgets as any)[p.key]}
                        onChange={(e) => setBudgets({...budgets, [p.key]: parseInt(e.target.value)})}
                        className={`w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-${p.color}-500 transition-all`}
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                      <Zap size={20} className="fill-current" />
                    </div>
                    <div>
                      <p className="font-black text-indigo-900 text-sm">AI Smart-Pacing</p>
                      <p className="text-xs text-indigo-600 font-medium leading-tight">Auto-shift budget to highest ROI node.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setAutoPilot(!autoPilot)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${autoPilot ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${autoPilot ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>

              <div className="w-[380px] bg-slate-50/50 p-12 flex flex-col">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-10">Economic Forecast</h4>
                
                <div className="space-y-10 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <DollarSign size={16} className="text-emerald-500" />
                       <span className="text-xs font-black text-slate-400 uppercase tracking-widest">30-Day Outlook</span>
                    </div>
                    <p className="text-5xl font-black text-slate-900 tracking-tighter">${monthlyForecast.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit text-[10px] font-black uppercase tracking-tighter">
                       <ArrowUpRight size={12} /> +14.2% Growth Expected
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pacing Health</span>
                          <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg uppercase">On Track</span>
                       </div>
                       <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full w-[65%] rounded-full shadow-glow-indigo"></div>
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 leading-normal">You've consumed 65% of your recommended monthly threshold for this segment.</p>
                    </div>

                    <div className="p-6 bg-indigo-950 rounded-3xl text-white space-y-4 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                          <Zap size={60} />
                       </div>
                       <div className="flex items-center gap-2">
                          <ShieldCheck size={14} className="text-indigo-400" />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300">Strategy Insight</span>
                       </div>
                       <p className="text-xs font-bold leading-relaxed">Increasing Zest Exchange budget by <span className="text-indigo-400">$20/day</span> could lower your blended CPA by <span className="text-emerald-400">8.4%</span> based on historical nodes.</p>
                       <button className="flex items-center gap-1 text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors">
                          Apply Recommendation <ChevronRight size={10} />
                       </button>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => setIsBudgetModalOpen(false)}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                  >
                    Confirm Adjustments
                  </button>
                  <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">Node sync takes ~5-10 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
