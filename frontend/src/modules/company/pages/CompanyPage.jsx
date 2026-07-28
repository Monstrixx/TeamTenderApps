import React, { useState } from 'react';
import ModulePlaceholder from '../../../components/ui/ModulePlaceholder';
import { Building2, Globe, ShieldCheck } from 'lucide-react';
import PublicPresenceEditor from './PublicPresenceEditor';
import CompanyTrustPage from './CompanyTrustPage';

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header Tabs */}
      <div className="px-6 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Company Overview
          </button>
          <button
            onClick={() => setActiveTab('presence')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'presence'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Globe className="w-4 h-4 mr-2" />
            Public Presence
          </button>
          <button
            onClick={() => setActiveTab('trust')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'trust'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Trust Center
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'overview' && (
          <ModulePlaceholder 
            title="Company Module" 
            description="Manage the legal entity profiles, subsidiaries, and corporate compliance documents."
            icon={Building2}
            status="Coming from Company Module"
          />
        )}
        {activeTab === 'presence' && (
          <PublicPresenceEditor companyData={{}} />
        )}
        {activeTab === 'trust' && (
          <CompanyTrustPage companyId="mock-id" />
        )}
      </div>
    </div>
  );
}
