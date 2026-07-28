import React from 'react';
import { ShieldCheck, FileCheck, AlertTriangle, QrCode } from 'lucide-react';

export default function CompanyTrustPage({ companyId }) {
  // Mock data for Trust Dashboard
  const trustScore = 75;
  const status = 'VERIFIED';
  
  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Trust & Verification Center</h2>
          <p className="text-slate-500">Manage your verified credentials and monitor your Trust Score.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 flex items-center font-medium">
            <QrCode className="w-4 h-4 mr-2" />
            Show QR
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Request Verification
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-3xl font-bold text-slate-900">{trustScore} / 100</h3>
          <p className="text-slate-500 font-medium">Trust Score</p>
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {status}
          </span>
        </div>
        
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Verification Badges</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium text-slate-700">Verified Legal</span>
            </div>
            <div className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium text-slate-700">Verified LPJK</span>
            </div>
            <div className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded-lg opacity-50">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-medium text-slate-700">ISO Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Verification Evidence</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { type: 'NIB', title: 'Nomor Induk Berusaha', status: 'VERIFIED', date: '2024-01-15' },
            { type: 'NPWP', title: 'Tax ID', status: 'VERIFIED', date: '2024-01-15' },
            { type: 'SBU', title: 'Sertifikat Badan Usaha', status: 'VERIFIED', date: '2024-02-20' },
            { type: 'ISO', title: 'ISO 9001:2015', status: 'REQUESTED', date: '2024-07-28' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.title} ({item.type})</h4>
                  <p className="text-xs text-slate-500">Submitted: {item.date}</p>
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
