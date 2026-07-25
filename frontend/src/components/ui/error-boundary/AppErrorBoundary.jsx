import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TriangleAlert, RotateCcw } from 'lucide-react';

function AppFallback({ error }) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TriangleAlert size={32} />
                </div>
                <h1 className="text-2xl font-black mb-3">Fatal Error</h1>
                <p className="text-slate-500 mb-6 text-sm">
                    Aplikasi mengalami kesalahan sistem yang tidak dapat dipulihkan secara otomatis.
                </p>
                <div className="bg-slate-50 text-left p-4 rounded-xl border border-slate-200 mb-8 overflow-auto max-h-40">
                    <code className="text-xs text-rose-600 font-mono whitespace-pre-wrap">{error.message}</code>
                </div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                    <RotateCcw size={18} />
                    Muat Ulang Aplikasi
                </button>
            </div>
        </div>
    );
}

export function AppErrorBoundary({ children }) {
    const handleError = (error, info) => {
        // TODO: Wave 4 - Integrate with Sentry, LogRocket, or internal logging
        console.error("[AppErrorBoundary]", error, info);
    };

    return (
        <ErrorBoundary FallbackComponent={AppFallback} onError={handleError}>
            {children}
        </ErrorBoundary>
    );
}
