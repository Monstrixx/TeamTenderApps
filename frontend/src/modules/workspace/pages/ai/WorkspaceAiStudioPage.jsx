import React, { useState } from 'react';
import { Brain, Settings2, Sparkles, History, Check, X, FileText } from 'lucide-react';

export default function WorkspaceAiStudioPage() {
  const [activePanel, setActivePanel] = useState('capability');
  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Workspace AI Studio</h1>
            <p className="text-sm text-slate-500">TeamTender AI Platform Foundation v1.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {['capability', 'prompt', 'suggestions', 'history'].map(panel => (
            <button
              key={panel}
              onClick={() => setActivePanel(panel)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePanel === panel 
                  ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="capitalize">{panel}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-6">
        <div className="h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          
          {/* Panel: Capability */}
          {activePanel === 'capability' && (
            <div className="p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Available AI Plugins & Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Example Company Plugin Card */}
                <div className="border border-slate-200 rounded-xl p-6 hover:border-purple-300 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      Company Plugin
                    </span>
                    <Sparkles className="h-5 w-5 text-slate-400 group-hover:text-purple-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Company SEO Audit</h3>
                  <p className="text-sm text-slate-500 mb-4">Generates optimized Meta Title, Description, and Keywords based on Company Identity and Experience.</p>
                  
                  <button className="w-full py-2 bg-slate-50 group-hover:bg-purple-600 group-hover:text-white text-slate-600 rounded-lg text-sm font-medium transition-colors">
                    Launch Capability
                  </button>
                </div>
                
                {/* Placeholder for Tender Plugin */}
                <div className="border border-slate-200 rounded-xl p-6 opacity-60">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      Tender Plugin
                    </span>
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Tender Summary</h3>
                  <p className="text-sm text-slate-500 mb-4">Extracts key requirements, deadlines, and technical specs from tender documents.</p>
                  <button className="w-full py-2 bg-slate-50 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Panel: Prompt & Policy */}
          {activePanel === 'prompt' && (
            <div className="p-8 flex flex-col h-full">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Prompt & Policy Configuration</h2>
              <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 p-6 flex items-center justify-center text-slate-500">
                <p>Select a Capability first to view its Prompt Version and AI Policies.</p>
              </div>
            </div>
          )}

          {/* Panel: Suggestions */}
          {activePanel === 'suggestions' && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Operation Diff Viewer</h2>
                <p className="text-sm text-slate-500">Review atomic changes generated by the AI before applying to the database.</p>
              </div>
              <div className="flex-1 p-6 bg-slate-50 flex items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="inline-flex p-3 bg-white rounded-full shadow-sm mb-4">
                    <Check className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-slate-900 font-medium mb-1">No Pending Suggestions</h3>
                  <p className="text-slate-500 text-sm">Run a capability to generate suggestions.</p>
                </div>
              </div>
            </div>
          )}

          {/* Panel: History */}
          {activePanel === 'history' && (
            <div className="p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">AI Conversation History</h2>
              <div className="space-y-4">
                <div className="p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">Company SEO Audit</span>
                    <span className="text-xs text-slate-500">2 mins ago</span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span>Provider: <strong className="text-slate-700">MockProvider</strong></span>
                    <span>Tokens: <strong className="text-slate-700">240</strong></span>
                    <span>Latency: <strong className="text-slate-700">800ms</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
