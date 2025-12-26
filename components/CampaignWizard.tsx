
import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Megaphone, Target, DollarSign, Wand2, Search, Smartphone, Filter, Globe, Upload, Trash2, Layout, Zap, Calendar, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { generateAdCopy } from '../services/geminiService';
import { CampaignFormData, TargetingFilter } from '../types';

const goals = [
  { id: 'conversion', title: 'Performance', desc: 'Optimized for high-intent conversion events.', icon: Zap },
  { id: 'traffic', title: 'Traffic Burst', desc: 'Maximum unique visitors for your funnel.', icon: Target },
  { id: 'awareness', title: 'Brand Halo', desc: 'Reach & Frequency at the lowest CPM.', icon: Globe },
];

const CampaignWizard: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    goal: 'conversion',
    targeting: {
      ageRange: [25, 45],
      gender: ['Male', 'Female'],
      interests: ['Tech', 'Marketing'],
      behaviors: ['Frequent Travelers']
    },
    hosting: ['Meta', 'Google'],
    dailyBudget: 100,
    headline: '',
    description: '',
    assetUrl: null,
    isScheduled: false,
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '09:00',
  });

  const updateData = (data: Partial<CampaignFormData>) => setFormData(prev => ({ ...prev, ...data }));
  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* Refined Stepper */}
      <div className="mb-10 px-10">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1 flex items-center last:flex-none">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                step >= i ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110' : 'bg-slate-200 text-slate-400'
              }`}>
                {step > i ? <CheckCircle2 size={24} /> : i}
              </div>
              {i < 5 && (
                <div className={`flex-1 h-0.5 mx-4 rounded-full transition-all duration-500 ${
                  step > i ? 'bg-indigo-600' : 'bg-slate-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span className={step === 1 ? 'text-indigo-600' : ''}>Strategy</span>
          <span className={step === 2 ? 'text-indigo-600' : ''}>Creative</span>
          <span className={step === 3 ? 'text-indigo-600' : ''}>Segmentation</span>
          <span className={step === 4 ? 'text-indigo-600' : ''}>Budget</span>
          <span className={step === 5 ? 'text-indigo-600' : ''}>Deploy</span>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl p-10 min-h-[650px] flex flex-col relative overflow-hidden">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8">
            <div className="text-center">
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2 block">Step 01 / Strategy</span>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Define Your Objective</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Deep, choose a primary success metric. Our AI will adjust bid algorithms based on this selection.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => updateData({ goal: g.id })}
                  className={`p-8 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                    formData.goal === g.id 
                    ? 'border-indigo-600 bg-indigo-50/30' 
                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    formData.goal === g.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <g.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{g.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{g.desc}</p>
                </button>
              ))}
            </div>
            <div className="max-w-xl mx-auto space-y-4">
              <label className="block text-sm font-bold text-slate-700 tracking-tight">Campaign Identifier</label>
              <input
                type="text"
                placeholder="e.g. Q2_RE-ENGAGEMENT_LAL_01"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all font-mono text-sm"
                value={formData.name}
                onChange={(e) => updateData({ name: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <CreativeStudio formData={formData} updateData={updateData} />
        )}

        {step === 3 && (
          <AdvancedFilterPanel formData={formData} updateData={updateData} />
        )}

        {step === 4 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8">
            <div className="text-center">
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2 block">Step 04 / Investment</span>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Set Your Velocity</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-lg font-bold text-slate-700">Daily Cap</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-indigo-600">${formData.dailyBudget}</span>
                      <span className="text-slate-400 font-bold uppercase text-xs">USD / Day</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="1000" 
                    step="10"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-10"
                    value={formData.dailyBudget}
                    onChange={(e) => updateData({ dailyBudget: parseInt(e.target.value) })}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Projected ROI</p>
                      <p className="text-2xl font-black text-emerald-600">3.2x - 4.5x</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Max Bid (Auto)</p>
                      <p className="text-2xl font-black text-slate-800">$4.50</p>
                    </div>
                  </div>
                </div>

                {/* Investment Trajectory Summary */}
                <div className="bg-indigo-950 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-900/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-300 border border-indigo-500/30">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-200">Investment Trajectory</h3>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase">Forecasted Commitments</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">7-Day Burn</p>
                      <p className="text-xl font-black">${(formData.dailyBudget * 7).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1 border-l border-indigo-800/50 pl-4">
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">30-Day Outlook</p>
                      <p className="text-xl font-black">${(formData.dailyBudget * 30).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1 border-l border-indigo-800/50 pl-4">
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">90-Day Velocity</p>
                      <p className="text-xl font-black text-indigo-400 opacity-80">${(formData.dailyBudget * 90).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-indigo-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-[10px] font-black text-indigo-200 uppercase tracking-tighter">Budget Allocation Confirmed</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-indigo-400">
                      <TrendingUp size={12} /> <span className="uppercase tracking-widest">Growth Tracked</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Recommended Strategies</h3>
                {[
                  { title: 'Standard Delivery', desc: 'Spread budget evenly through 24h cycle.', tag: 'Safest' },
                  { title: 'Accelerated Pacing', desc: 'Prioritize early morning high-intent windows.', tag: 'Aggressive' },
                  { title: 'Capped Frequency', desc: 'Minimize ad fatigue by limiting views per user.', tag: 'Optimal' },
                ].map((s, i) => (
                  <div key={i} className="p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-indigo-200 cursor-pointer transition-all flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900">{s.title}</h4>
                      <p className="text-xs text-slate-500">{s.desc}</p>
                    </div>
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">{s.tag}</span>
                  </div>
                ))}
                
                {/* Visual indicator of reach vs budget */}
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 border-dashed">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Audience Saturation</span>
                    <span className="text-lg font-black text-slate-800">{(formData.dailyBudget / 10).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(formData.dailyBudget / 10, 100)}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mt-3 leading-relaxed">Based on your targeting segmentation, this budget will capture approximately <span className="text-slate-900">{Math.floor(formData.dailyBudget * 450).toLocaleString()}</span> impressions daily.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
           <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8">
            <div className="text-center">
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2 block">Step 05 / Deployment</span>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Deployment & Schedule</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Select host nodes and define when your assets go live.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Meta Ads', icon: 'M', color: 'bg-blue-600', status: 'Connected' },
                { name: 'Google Search', icon: 'G', color: 'bg-red-500', status: 'Connected' },
                { name: 'Zest Exchange', icon: 'Z', color: 'bg-indigo-600', status: 'Live' },
              ].map((h, i) => (
                <div key={i} className="p-8 rounded-[32px] border-2 border-slate-100 bg-white shadow-sm flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${h.color} text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-4 shadow-xl`}>{h.icon}</div>
                  <h4 className="font-bold text-lg text-slate-900 mb-1">{h.name}</h4>
                  <p className="text-xs text-emerald-600 font-bold mb-6 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {h.status}
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>

            {/* Scheduling Section */}
            <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Launch Sequence</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Immediate or future schedule</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => updateData({ isScheduled: false })}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!formData.isScheduled ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400'}`}
                  >
                    Immediate
                  </button>
                  <button 
                    onClick={() => updateData({ isScheduled: true })}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.isScheduled ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400'}`}
                  >
                    Scheduled
                  </button>
                </div>
              </div>

              {formData.isScheduled ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest flex items-center gap-2">
                      <Calendar size={12} /> Launch Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-800"
                      value={formData.scheduledDate}
                      onChange={(e) => updateData({ scheduledDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest flex items-center gap-2">
                      <Clock size={12} /> Target Time
                    </label>
                    <input 
                      type="time" 
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-800"
                      value={formData.scheduledTime}
                      onChange={(e) => updateData({ scheduledTime: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4 animate-in fade-in duration-300">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                    <Zap size={20} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-700">Instant Activation Ready</p>
                    <p className="text-xs text-emerald-600 font-medium">Your campaign will propagate across selected networks within 15 minutes of launch.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-indigo-950 p-6 rounded-3xl text-white flex items-center justify-between border border-indigo-900">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-indigo-800 rounded-xl"><Zap size={20} /></div>
                 <div>
                   <p className="font-bold text-sm">Zest Smart Hosting Active</p>
                   <p className="text-xs text-indigo-300">Auto-shifting budget to highest performing nodes every 30m.</p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-auto pt-10 flex justify-between items-center border-t border-slate-100">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all ${
              step === 1 ? 'opacity-0' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          
          <div className="flex gap-4">
            {step < 5 ? (
              <button
                onClick={nextStep}
                disabled={step === 1 && !formData.name}
                className="px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black flex items-center gap-2 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-xl shadow-indigo-200"
              >
                Proceed to {step === 1 ? 'Creative' : step === 2 ? 'Targeting' : step === 3 ? 'Budget' : 'Review'}
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={onComplete}
                className={`px-12 py-4 rounded-2xl text-white font-black flex items-center gap-2 transition-all shadow-xl ${formData.isScheduled ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
              >
                {formData.isScheduled ? 'Schedule Campaign' : 'Go Live Now'}
                {formData.isScheduled ? <Calendar size={18} /> : <Zap size={18} className="fill-current" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreativeStudio: React.FC<{ formData: CampaignFormData, updateData: (data: Partial<CampaignFormData>) => void }> = ({ formData, updateData }) => {
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{ headlines: string[], descriptions: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const results = await generateAdCopy(formData.name, "Modern lifestyle brand focused on quality and sustainability", formData.goal);
      setAiSuggestions(results);
      if (results.headlines.length > 0) updateData({ headline: results.headlines[0] });
      if (results.descriptions.length > 0) updateData({ description: results.descriptions[0] });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => updateData({ assetUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center mb-8">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2 block">Step 02 / Creative Studio</span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Construct Your Narrative</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {/* Drag & Drop Content Creator */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-64 border-4 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/20 transition-all overflow-hidden"
          >
            {formData.assetUrl ? (
              <>
                <img src={formData.assetUrl} className="w-full h-full object-cover" alt="Asset" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white font-bold flex items-center gap-2"><Upload size={20} /> Replace Asset</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <Upload size={32} />
                </div>
                <p className="text-sm font-bold text-slate-500">Drag & Drop Image Asset</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">PNG, JPG, HEIC up to 10MB</p>
              </>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => updateData({ assetUrl: reader.result as string });
                reader.readAsDataURL(file);
              }
            }} />
          </div>

          <div className="space-y-6 bg-slate-50 p-8 rounded-[40px] border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ad Components</h3>
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline"
              >
                <Sparkles size={12} /> {loading ? 'Thinking...' : 'AI Suggest'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-2">Headline</label>
                <input
                  type="text"
                  placeholder="Primary hook text..."
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all text-sm font-bold"
                  value={formData.headline}
                  onChange={(e) => updateData({ headline: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-2">Body Description</label>
                <textarea
                  placeholder="Supporting narrative copy..."
                  className="w-full h-28 px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all text-sm font-medium resize-none"
                  value={formData.description}
                  onChange={(e) => updateData({ description: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real Time Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Smartphone size={14} /> Global Device Preview
            </h3>
            <div className="flex gap-2">
              <button className="p-1.5 bg-indigo-600 text-white rounded-md shadow-sm"><Smartphone size={14} /></button>
              <button className="p-1.5 bg-white border border-slate-200 text-slate-400 rounded-md hover:text-indigo-600"><Layout size={14} /></button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[48px] p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Mock iPhone UI */}
            <div className="w-[300px] h-[600px] bg-white rounded-[32px] overflow-hidden shadow-inner flex flex-col">
              <div className="h-10 bg-white flex items-center justify-between px-6 pt-2">
                 <span className="text-[10px] font-bold">9:41</span>
                 <div className="flex gap-1">
                   <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                 </div>
              </div>
              
              {/* Ad Content */}
              <div className="p-4 border-b border-slate-50">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">
                     {formData.name.charAt(0) || 'Z'}
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-slate-900">{formData.name || 'Zest Brand'}</p>
                     <p className="text-[8px] text-slate-400 uppercase tracking-tighter">Sponsored Network</p>
                   </div>
                 </div>
                 <p className="text-[10px] text-slate-800 leading-normal line-clamp-2 mb-3">
                   {formData.description || 'Your ad copy will appear here as a natural part of the social ecosystem.'}
                 </p>
              </div>
              <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
                {formData.assetUrl ? (
                  <img src={formData.assetUrl} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center">
                     <Upload size={40} className="mb-2 opacity-20" />
                     <p className="text-[10px] font-bold uppercase tracking-widest">Asset Missing</p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <p className="text-[11px] font-black text-slate-900 leading-tight mb-1">{formData.headline || 'Impactful Headline Here'}</p>
                  <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tight">www.yourbrand.com</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-lg shadow-indigo-100">
                  Shop Now
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-6 w-32 h-1 bg-slate-800/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedFilterPanel: React.FC<{ formData: CampaignFormData, updateData: (data: Partial<CampaignFormData>) => void }> = ({ formData, updateData }) => {
  const updateTargeting = (t: Partial<TargetingFilter>) => {
    updateData({ targeting: { ...formData.targeting, ...t } });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2 block">Step 03 / Audience Architecture</span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Advanced Segmentation</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Deep, use these precision filters to narrow down high-conversion cohorts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6 bg-slate-50 p-6 rounded-[32px] border border-slate-100">
          <div className="space-y-4">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Filter size={14} /> Core Segments
             </h3>
             <div className="space-y-2">
               {['Gen-Z Early Adopters', 'Luxury Homeowners', 'SaaS Decision Makers', 'Fitness Enthusiasts'].map(s => (
                 <label key={s} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors">
                   <input type="checkbox" defaultChecked={s.includes('SaaS')} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                   <span className="text-xs font-bold text-slate-700">{s}</span>
                 </label>
               ))}
             </div>
          </div>
          <div className="pt-4 border-t border-slate-200">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Age Bracket</h3>
             <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
               <span>{formData.targeting.ageRange[0]}</span>
               <span>{formData.targeting.ageRange[1]}</span>
             </div>
             <input type="range" className="w-full h-1 bg-slate-300 rounded-full accent-indigo-600" />
          </div>
        </div>

        {/* Audience Map / Content Creator View */}
        <div className="lg:col-span-3 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[32px] border-2 border-indigo-50 shadow-sm relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-50 rounded-full opacity-50"></div>
                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                  <Target className="text-indigo-600" size={20} /> Interest Overlay
                </h4>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {formData.targeting.interests.map(i => (
                    <div key={i} className="px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                      {i} <button onClick={() => updateTargeting({ interests: formData.targeting.interests.filter(item => item !== i) })}><Trash2 size={12} /></button>
                    </div>
                  ))}
                  <button className="px-4 py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded-full text-xs font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors">+ Add Node</button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] border-2 border-emerald-50 shadow-sm relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                  <Zap className="text-emerald-600" size={20} /> Intent Behaviors
                </h4>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {formData.targeting.behaviors.map(b => (
                    <div key={b} className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                      {b} <button onClick={() => updateTargeting({ behaviors: formData.targeting.behaviors.filter(item => item !== b) })}><Trash2 size={12} /></button>
                    </div>
                  ))}
                  <button className="px-4 py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded-full text-xs font-bold hover:border-emerald-300 hover:text-emerald-600 transition-colors">+ Add Signal</button>
                </div>
              </div>
           </div>

           <div className="bg-indigo-950 p-8 rounded-[40px] text-white overflow-hidden relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xl font-black">Estimated Reach Potential</h4>
                  <p className="text-xs text-indigo-300 uppercase font-bold tracking-widest mt-1">Based on current Filter parameters</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-emerald-400">12.5M - 15.8M</p>
                  <p className="text-[10px] text-indigo-400 font-black uppercase">Audience Size Index</p>
                </div>
              </div>
              <div className="w-full bg-indigo-900/50 rounded-full h-4 overflow-hidden mb-4 border border-indigo-800">
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[70%] rounded-full shadow-lg"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase">
                <span>Too Narrow</span>
                <span className="text-emerald-400">Optimal Sweet Spot</span>
                <span>Too Broad</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignWizard;
