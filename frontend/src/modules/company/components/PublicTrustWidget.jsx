import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, FileCheck, ExternalLink } from 'lucide-react';
import api from '../../../services/client/apiClient';

export default function PublicTrustWidget({ slug }) {
  const [trustData, setTrustData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrust = async () => {
      try {
        const response = await api.get(`/public/companies/${slug}/trust`);
        setTrustData(response.data.data);
      } catch (err) {
        console.error("Failed to load trust data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrust();
  }, [slug]);

  if (loading) return <div className="h-24 bg-slate-100 animate-pulse rounded-xl"></div>;
  if (!trustData || trustData.status === 'UNVERIFIED') return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center">
          <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-bold text-slate-900">Trust Profile</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Trust Score</span>
          <span className="font-bold text-green-600 text-lg">{trustData.score}/100</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3">
          {trustData.badges && trustData.badges.map((badge, idx) => (
            <div key={idx} className="flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              {badge}
            </div>
          ))}
        </div>
        
        {trustData.verifiedItems && trustData.verifiedItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Verified Documents</h4>
            <div className="flex flex-wrap gap-2">
              {trustData.verifiedItems.map((item, idx) => (
                <span key={idx} className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  <FileCheck className="w-3 h-3 mr-1" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Last updated: {new Date(trustData.lastCalculatedAt).toLocaleDateString()}
          </p>
          <a href={`/verify/company/${slug}`} className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center">
            Scan QR Verification <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
