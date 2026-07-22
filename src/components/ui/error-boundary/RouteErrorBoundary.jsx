import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RouteFallback({ error, resetErrorBoundary }) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex items-center justify-center p-6 h-full min-h-[70vh]">
            <div className="bg-white rounded-2xl border border-rose-200 p-8 max-w-md w-full text-center shadow-sm">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Halaman Gagal Dimuat</h2>
                <p className="text-sm text-slate-500 mb-6">
                    Terjadi kesalahan saat merender halaman ini. Data mungkin tidak lengkap atau terjadi kegagalan memuat modul.
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={resetErrorBoundary}
                        className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 px-4 rounded-lg transition-colors border border-rose-100 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <RotateCcw size={16} /> Coba Muat Ulang Halaman
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-2.5 px-4 rounded-lg transition-colors border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Kembali ke Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export function RouteErrorBoundary({ children }) {
    const handleError = (error, info) => {
        // TODO: Wave 4 - Integrate with Sentry, LogRocket, or internal logging
        console.error("[RouteErrorBoundary]", error, info);
    };

    return (
        <ErrorBoundary FallbackComponent={RouteFallback} onError={handleError}>
            {children}
        </ErrorBoundary>
    );
}
