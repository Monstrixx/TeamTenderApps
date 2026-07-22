import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ShieldAlert, RefreshCw } from 'lucide-react';

function SectionFallback({ error, resetErrorBoundary }) {
    return (
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
            <ShieldAlert className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-sm font-bold text-rose-800 mb-1">Bagian Ini Mengalami Masalah</h3>
            <p className="text-xs text-rose-600/80 mb-4 max-w-xs">
                {error.message || "Terjadi kesalahan internal. Mohon coba muat ulang bagian ini."}
            </p>
            <button 
                onClick={resetErrorBoundary}
                className="inline-flex items-center gap-1.5 bg-white border border-rose-200 hover:bg-rose-100 hover:border-rose-300 text-rose-700 font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
            >
                <RefreshCw size={14} /> Muat Ulang Bagian
            </button>
        </div>
    );
}

export function SectionErrorBoundary({ children }) {
    const handleError = (error, info) => {
        // TODO: Wave 4 - Integrate with Sentry, LogRocket, or internal logging
        console.error("[SectionErrorBoundary]", error, info);
    };

    return (
        <ErrorBoundary FallbackComponent={SectionFallback} onError={handleError}>
            {children}
        </ErrorBoundary>
    );
}
