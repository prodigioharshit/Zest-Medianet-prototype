
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MousePointer2, Eye, TrendingUp, Target, DollarSign, X, ArrowUpRight, ChevronRight, Filter, BarChart, Info } from 'lucide-react';

const performanceData = [
  { name: 'Day 1', clicks: 800, impressions: 24000, conversions: 45, spend: 120 },
  { name: 'Day 5', clicks: 1200, impressions: 32000, conversions: 68, spend: 180 },
  { name: 'Day 10', clicks: 2100, impressions: 45000, conversions: 110, spend: 310 },
  { name: 'Day 15', clicks: 3500, impressions: 68000, conversions: 215, spend: 450 },
  { name: 'Day 20', clicks: 4800, impressions: 92000, conversions: 340, spend: 580 },
  { name: 'Day 25', clicks: 6200, impressions: 115000, conversions: 480, spend: 720 },
  { name: 'Day 30', clicks: 7800, impressions: 145000, conversions: 620, spend: 890 },
];

const platformData = [
  { name: 'Meta Ads', value: 5800, color: '#6366f1' },
  { name: 'Google Search', value: 3200, color: '#f43f5e' },
  { name: 'Zest Network', value: 1500, color: '#10b981' },
  { name: 'Twitter (X)', value: 850, color: '#64748b' },
];

const benchmarks = [
  { label: 'Click-Through Rate (CTR)', user: 2.45, industry: 1.12, unit: '%', better: true },
  { label: 'Cost Per Click (CPC)', user: 3.12, industry: 4.85, unit: '$', better: true }, // Lower CPC is better
  { label: 'Conversion Rate', user: 2.10, industry: 1.85, unit: '%', better: true },
];

const campaigns = [
  { id: 'c1', name: 'Summer Launch Pack', channel: 'Meta', spend: 2450, impressions: 125000, clicks: 4200, conversions: 310, roi: 4.2 },
  { id: 'c2', name: 'Waitlist Retargeting', channel: 'Google', spend: 1120, impressions: 45000, clicks: 820, conversions: 95, roi: 3.8 },
  { id: 'c3', name: 'Zest Private Beta', channel: 'Zest', spend: 850, impressions: 12000, clicks: 1100, conversions: 140, roi: 5.1 },
  { id: 'c4', name: 'Lifestyle Promo V2', channel: 'Meta', spend: 1800, impressions: 95000, clicks: 2800, conversions: 185, roi: 3.5 },
];

const Analytics: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [activeMetric, setActiveMetric] = useState<'clicks' | 'conversions' | 'spend'>('clicks');

  const metricConfig = {
    clicks: { color: '#6366f1', label: 'Clicks' },
    conversions: { color: '#10b981', label: 'Conversions' },
    spend: { color: '#f43f5e', label: 'Spend ($)' }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Growth Analytics</h2>
          <p className="text-slate-500 font-medium">Holistic performance across all acquisition channels</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-indigo-100">
            <Filter size={14} className="text-indigo-600" />
            <span className="text-sm font-bold text-indigo-700">All Channels</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-slate-200">Generate Report</button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Clicks', value: '18,420', sub: '3.4% CTR', icon: MousePointer2, trend: '+12%', color: 'indigo' },
          { label: 'Total Impressions', value: '542,800', sub: 'Reached 210k users', icon: Eye, trend: '+8%', color: 'blue' },
          { label: 'Total Conversions', value: '1,245', sub: '2.1% Conv Rate', icon: Target, trend: '+15%', color: 'emerald' },
          { label: 'Total ROI', value: '4.2x', sub: '$12.5k Revenue', icon: TrendingUp, trend: '+0.4x', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={22} />
              </div>
              <span className="text-emerald-500 text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1 uppercase tracking-tighter">
                <ArrowUpRight size={10} /> {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Industry Benchmarks Section */}
      <div className="bg-indigo-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <BarChart size={240} />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/30 rounded-2xl text-indigo-200">
                <BarChart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">Industry Benchmarks</h3>
                <p className="text-indigo-300 text-xs font-medium">How you stack up against the SaaS average</p>
              </div>
            </div>
            <button className="p-2 text-indigo-400 hover:text-white transition-colors">
              <Info size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benchmarks.map((b, i) => (
              <div key={i} className="bg-indigo-800/40 border border-indigo-700/50 p-6 rounded-[32px] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{b.label}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${b.better ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {b.better ? 'Outperforming' : 'Lagging'}
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-black text-white">{b.unit === '$' ? '$' : ''}{b.user}{b.unit === '%' ? '%' : ''}</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Your Performance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-indigo-200 opacity-60">{b.unit === '$' ? '$' : ''}{b.industry}{b.unit === '%' ? '%' : ''}</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Industry Avg</p>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-indigo-950 rounded-full overflow-hidden relative">
                   <div 
                    className={`h-full rounded-full transition-all duration-1000 ${b.better ? 'bg-emerald-400' : 'bg-rose-400'}`} 
                    style={{ width: `${Math.min((b.user / (b.user + b.industry)) * 100 * 1.5, 100)}%` }}
                   ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Performance Over Time</h3>
              <p className="text-xs text-slate-400 font-medium">Granular visibility into your acquisition funnel</p>
            </div>
            
            {/* Metric Toggle Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
              {(Object.keys(metricConfig) as Array<keyof typeof metricConfig>).map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMetric(m)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeMetric === m 
                    ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[400px] flex-1 px-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="activeMetricGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.35}/>
                    <stop offset="95%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.01}/>
                  </linearGradient>
                  {/* Separate gradient for the baseline to keep it subtle */}
                  <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} 
                  dy={15} 
                />
                
                {/* Independent Y-Axes for correct visual representation */}
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: metricConfig[activeMetric].color, fontSize: 10, fontWeight: 900}} 
                  dx={-10}
                  domain={['auto', 'auto']}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#cbd5e1', fontSize: 10, fontWeight: 800}} 
                  dx={10} 
                  domain={['auto', 'auto']}
                />

                <Tooltip 
                  cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                  contentStyle={{ 
                    borderRadius: '28px', 
                    border: '1px solid #f1f5f9', 
                    boxShadow: '0 30px 60px -15px rgb(0 0 0 / 0.12)', 
                    padding: '20px',
                    fontWeight: 900,
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(8px)'
                  }}
                  itemStyle={{ fontSize: '12px', padding: '4px 0', textTransform: 'capitalize' }}
                  labelStyle={{ marginBottom: '10px', color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em' }}
                />
                
                {/* Contextual Metric: Impressions (Subtle background layer) */}
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#e2e8f0" 
                  fill="url(#baselineGradient)" 
                  strokeWidth={2} 
                  strokeDasharray="8 6" 
                  animationDuration={1500}
                  name="Total Impressions (Context)"
                  opacity={0.8}
                />
                
                {/* Primary Data Metric (Active Tab) */}
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey={activeMetric} 
                  stroke={metricConfig[activeMetric].color} 
                  fill="url(#activeMetricGradient)" 
                  strokeWidth={6} 
                  animationDuration={1000}
                  name={metricConfig[activeMetric].label}
                  activeDot={{ 
                    r: 10, 
                    stroke: '#fff', 
                    strokeWidth: 5, 
                    fill: metricConfig[activeMetric].color,
                    boxShadow: `0 0 20px ${metricConfig[activeMetric].color}44`
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-10 mt-8 pb-4 border-t border-slate-50 pt-6">
             <div className="flex items-center gap-3">
                <div className="w-5 h-2 rounded-full shadow-lg" style={{ backgroundColor: metricConfig[activeMetric].color }}></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary {metricConfig[activeMetric].label}</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-5 h-0.5 border-t-2 border-slate-300 border-dashed"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume (Impressions)</span>
             </div>
          </div>
        </div>

        {/* Platform Breakdown remains high-aesthetic */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">Spend by Platforms</h3>
          
          <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
            <div className="w-full h-full max-w-[280px] max-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={110}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 15px 30px -5px rgb(0 0 0 / 0.1)', fontWeight: 800 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">Total Budget</span>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">$11.3k</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-6 border-t border-slate-50">
            {platformData.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{backgroundColor: p.color}}></div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate leading-none mb-2">{p.name}</span>
                  <span className="text-base font-black text-slate-800 leading-none">${p.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Breakdown Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="text-lg font-bold text-slate-800">In-Flight Campaign Performance</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Live updates from 4 nodes</p>
          </div>
          <div className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl uppercase tracking-widest">Active Cohorts: {campaigns.length}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                <th className="px-10 py-6">Campaign Identity</th>
                <th className="px-10 py-6">Platform</th>
                <th className="px-10 py-6 text-center">Spend</th>
                <th className="px-10 py-6 text-center">Impressions</th>
                <th className="px-10 py-6 text-center">Conversions</th>
                <th className="px-10 py-6 text-right">ROI Index</th>
                <th className="px-6 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((c) => (
                <tr 
                  key={c.id} 
                  onClick={() => setSelectedCampaign(c)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-all duration-200 group"
                >
                  <td className="px-10 py-7">
                    <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{c.name}</span>
                  </td>
                  <td className="px-10 py-7">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter">{c.channel}</span>
                  </td>
                  <td className="px-10 py-7 text-center font-bold text-slate-600">${c.spend.toLocaleString()}</td>
                  <td className="px-10 py-7 text-center font-bold text-slate-500">{c.impressions.toLocaleString()}</td>
                  <td className="px-10 py-7 text-center font-black text-slate-800">{c.conversions}</td>
                  <td className="px-10 py-7 text-right">
                    <span className="bg-emerald-50 text-emerald-600 font-black text-sm px-4 py-1.5 rounded-2xl shadow-sm border border-emerald-100">{c.roi}x</span>
                  </td>
                  <td className="px-6 py-7 text-right">
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Detail Overlay/Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 border border-slate-100">
            <button 
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-all text-slate-400"
            >
              <X size={24} />
            </button>
            <div className="p-12 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-indigo-200">
                  {selectedCampaign.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedCampaign.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">{selectedCampaign.channel}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-3">Started May 2024</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: 'Spend Allocation', value: `$${selectedCampaign.spend}`, icon: DollarSign, color: 'emerald' },
                  { label: 'Unique Clicks', value: selectedCampaign.clicks.toLocaleString(), icon: MousePointer2, color: 'indigo' },
                  { label: 'Realized ROI', value: `${selectedCampaign.roi}x`, icon: TrendingUp, color: 'amber' },
                ].map((m, i) => (
                  <div key={i} className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-${m.color}-50 text-${m.color}-600 flex items-center justify-center mb-4`}>
                      <m.icon size={20} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tighter">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Validated Creative Units</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden border border-slate-100 shadow-inner group cursor-zoom-in">
                    <img src={`https://picsum.photos/seed/${selectedCampaign.id}1/600/400`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden border border-slate-100 shadow-inner group cursor-zoom-in">
                    <img src={`https://picsum.photos/seed/${selectedCampaign.id}2/600/400`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <button className="flex-1 py-5 bg-slate-900 text-white text-sm font-black rounded-3xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Full Dataset Export</button>
                <button className="flex-1 py-5 bg-indigo-600 text-white text-sm font-black rounded-3xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200">Trigger Auto-Optimizer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
