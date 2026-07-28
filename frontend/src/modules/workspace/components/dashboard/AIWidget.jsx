import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AIWidget() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-sm text-white h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Sparkles size={64} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} />
          <h3 className="text-base font-bold">TeamTender AI</h3>
        </div>
        <p className="text-sm text-indigo-100 mb-6 max-w-[200px]">
          Analyze incoming tender documents and extract requirements automatically.
        </p>
        <button className="flex items-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
          Ask Assistant <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
