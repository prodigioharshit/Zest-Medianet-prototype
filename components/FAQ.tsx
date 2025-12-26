
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Zest?",
    answer: "Zest is an AI-powered ad management command center designed for intermediate to pro users. It streamlines campaign creation across multiple networks like Meta and Google while providing deep attribution analytics."
  },
  {
    question: "How do I create a new campaign?",
    answer: "Head over to the 'New Campaign' tab in the sidebar. Our step-by-step wizard will guide you through objective setup, AI-assisted creative generation, advanced audience segmentation, and budget deployment."
  },
  {
    question: "What is the Creative Assistant?",
    answer: "The Creative Assistant utilizes Gemini AI to generate high-performing headlines and body copy based on your business name and campaign goals. It's designed to beat writer's block and improve CTR."
  },
  {
    question: "How does the AI content generation work?",
    answer: "Zest connects to Google's most advanced Gemini models. It analyzes your business description and target objective to craft narratives that resonate with specific audience segments, all while ensuring brand consistency."
  },
  {
    question: "Can I edit the AI-generated content?",
    answer: "Absolutely. The Creative Studio is fully interactive. You can modify any AI suggestions, drag-and-drop your own visual assets, and see live previews across mobile and desktop devices before launching."
  },
  {
    question: "What does the 'Global Status' monitor?",
    answer: "It monitors the health of your API connections with ad networks like Meta. A green status means your accounts are synced and ready for deployment. If it's red, you may need to check your billing or re-authenticate."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">
          <HelpCircle size={32} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-slate-500 font-medium">Everything you need to know about scaling with Zest.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        {faqData.map((item, index) => (
          <div key={index} className={`border-b border-slate-50 last:border-none transition-colors ${openIndex === index ? 'bg-indigo-50/10' : ''}`}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors group"
            >
              <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-indigo-600' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                {item.question}
              </span>
              <div className={`p-2 rounded-xl transition-all ${openIndex === index ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                <ChevronDown size={20} />
              </div>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[32px] p-8 text-white flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold">Still have questions?</h4>
          <p className="text-slate-400 text-sm">Our growth specialists are available 24/7.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;
