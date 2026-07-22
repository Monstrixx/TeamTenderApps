import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = AlertCircle, action }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <Icon size={24} />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-xs text-slate-500 mb-4 max-w-md">{description}</p>
            {action && (
                <div>{action}</div>
            )}
        </div>
    );
}
