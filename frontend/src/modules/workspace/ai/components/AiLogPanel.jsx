import React from 'react';
import { Cpu, RefreshCw } from 'lucide-react';

export default function AiLogPanel({
    logs = [],
    title = 'Hasil Pemeriksaan Kepatuhan AI (Bid Bond)',
    isScanning = false,
    completedText = '✓ Selesai Audit',
    scanningText = 'Sedang Memindai...'
}) {
    if (!logs || logs.length === 0) return null;

    return (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                <span className="flex items-center gap-1.5 font-sans">
                    <Cpu size={14} className="text-indigo-400" /> {title}
                </span>
                {isScanning ? (
                    <span className="text-blue-400 animate-pulse flex items-center gap-1 font-sans">
                        <RefreshCw size={10} className="animate-spin" /> {scanningText}
                    </span>
                ) : (
                    <span className="text-emerald-400 font-sans">{completedText}</span>
                )}
            </div>
            <div className="font-mono text-[9.5px] space-y-1.5 text-slate-300 max-h-[150px] overflow-y-auto">
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                        {log.status === 'info' && <span className="text-blue-400 font-bold">[INFO]</span>}
                        {log.status === 'scan' && <span className="text-slate-500">[SCAN]</span>}
                        {log.status === 'success' && <span className="text-emerald-400 font-bold">[COMPLIANT]</span>}
                        {log.time && <span className="text-indigo-300 font-bold">[{log.time}]</span>}
                        {log.agent && <span className="text-slate-400">[{log.agent}]</span>}
                        <span>{log.msg}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
