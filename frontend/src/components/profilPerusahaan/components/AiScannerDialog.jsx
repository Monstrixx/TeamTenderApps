import React from 'react';
import { Sparkles, X, Loader2, AlertCircle, Check } from 'lucide-react';
import { useDialogA11y } from '../../../hooks/ui/useDialogA11y';

export default function AiScannerDialog({ 
    isOpen, 
    onClose, 
    onApply, 
    status, 
    progress, 
    logs, 
    detectedData, 
    warning 
}) {
    const { dialogRef } = useDialogA11y(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
            <div 
                ref={dialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-scanner-title"
                className="relative bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200 outline-none"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-blue-400 animate-pulse" size={18} />
                        <span id="ai-scanner-title" className="text-sm font-bold tracking-tight">AI Document Reader & Validator</span>
                    </div>
                    {status === 'done' && (
                        <button aria-label="Tutup Dialog" onClick={onClose} className="text-slate-400 hover:text-white rounded-full p-1 cursor-pointer"><X size={18} /></button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    
                    {/* Scanning Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-400">
                            <span>{status === 'scanning' ? 'Mengekstrak data dari dokumen...' : 'Pindaian AI Selesai'}</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    {/* OCR Logs / Terminal */}
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-[11px] text-slate-300 border border-slate-800/80 space-y-2 max-h-40 overflow-y-auto">
                        {logs.map((log, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <span className="text-slate-500 select-none">&gt;</span>
                                <span>{log}</span>
                            </div>
                        ))}
                        {status === 'scanning' && (
                            <div className="flex items-center gap-1.5 text-blue-400">
                                <Loader2 size={12} className="animate-spin" />
                                <span>Membaca dokumen...</span>
                            </div>
                        )}
                    </div>

                    {/* Detected OCR Fields */}
                    {status === 'done' && (
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Pembacaan Dokumen (OCR)</h4>
                            
                            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                                {Object.entries(detectedData || {}).map(([key, val]) => (
                                    <div key={key}>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{key}</div>
                                        <div className="text-xs font-bold text-white">{val}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Warnings if any */}
                            {warning && (
                                <div className="flex items-start gap-2.5 p-3.5 bg-rose-950/40 border border-rose-900/50 rounded-lg text-rose-300 text-xs">
                                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold">Peringatan Kesesuaian</div>
                                        <div className="opacity-90">{warning}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-transparent hover:bg-slate-900 rounded-lg border border-slate-800 transition-all cursor-pointer"
                    >
                        {status === 'done' ? 'Tutup' : 'Batal'}
                    </button>
                    {status === 'done' && (
                        <button 
                            onClick={onApply}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                            <Check size={14} /> Terapkan Autofill
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
