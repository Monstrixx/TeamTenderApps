import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AiScanButton({ target, onScan }) {
    return (
        <button 
            type="button" 
            onClick={() => onScan(target)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer shadow-sm select-none"
        >
            <Sparkles size={11} className="animate-pulse" /> AI Scanner & Autofill
        </button>
    );
}
