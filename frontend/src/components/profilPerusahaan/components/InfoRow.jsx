import React from 'react';

export default function InfoRow({ label, value }) {
    return (
        <div>
            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</dt>
            <dd className="text-sm font-medium text-slate-800">{value}</dd>
        </div>
    );
}
