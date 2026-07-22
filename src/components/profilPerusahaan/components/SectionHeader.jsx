import React from 'react';

export default function SectionHeader({ icon: Icon, title, children }) {
    return (
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
                {Icon && <Icon size={20} className="text-blue-600" />}
                <h2 className="text-sm font-bold text-slate-800">{title}</h2>
            </div>
            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </div>
    );
}
