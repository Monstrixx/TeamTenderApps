import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'lucide-react';

export default function WorkspaceSelectorPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Select a Workspace</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/workspace/ws-mock-id/home')}
            className="flex flex-col items-start p-6 border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all text-left bg-slate-50 hover:bg-white"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <Grid size={20} />
            </div>
            <h2 className="font-semibold text-slate-800 mb-1">Acme Corp Tenant</h2>
            <p className="text-xs text-slate-500">ID: ws-mock-id</p>
          </button>
        </div>
      </div>
    </div>
  );
}
