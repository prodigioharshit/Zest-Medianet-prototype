
import React, { useState } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import CampaignWizard from './components/CampaignWizard.tsx';
import FAQ from './components/FAQ.tsx';
import Analytics from './components/Analytics.tsx';
import Community from './components/Community.tsx';
import { View } from './types.ts';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');

  const handleCampaignComplete = () => {
    setView('dashboard');
  };

  return (
    <Layout activeView={view} setView={setView}>
      {view === 'dashboard' && <Dashboard />}
      {view === 'create-campaign' && <CampaignWizard onComplete={handleCampaignComplete} />}
      {view === 'analytics' && <Analytics />}
      {view === 'faq' && <FAQ />}
      {view === 'community' && <Community />}
      {view === 'settings' && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 bg-white rounded-[48px] border border-slate-100 shadow-sm animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100">
             <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
             </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
              Account Configuration
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">
              We are finalizing this module for your account. All data remains secured and encrypted.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
               Enable Notifications
             </button>
             <button onClick={() => setView('dashboard')} className="px-8 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all">
               Back to Home
             </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
