import React, { useState } from 'react';
import { 
  Globe, LayoutTemplate, Palette, Image as ImageIcon, 
  Search, Eye, QrCode, Upload, Save, CheckCircle2 
} from 'lucide-react';

export default function PublicPresenceEditor({ companyData }) {
  const [activeTab, setActiveTab] = useState('visibility');

  const tabs = [
    { id: 'visibility', label: 'Visibility & Access', icon: Globe },
    { id: 'hero', label: 'Hero Section', icon: LayoutTemplate },
    { id: 'brand', label: 'Brand Kit', icon: Palette },
    { id: 'products', label: 'Products', icon: LayoutTemplate },
    { id: 'services', label: 'Services', icon: LayoutTemplate },
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'activity', label: 'Activity Feed', icon: Globe },
    { id: 'downloads', label: 'Downloads', icon: Upload },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'seo', label: 'SEO Meta', icon: Search },
    { id: 'qr', label: 'QR Code', icon: QrCode },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Public Presence</h2>
          <p className="text-sm text-slate-500 mt-1">Manage how your company appears to the world.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Preview Site
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 min-h-[600px]">
        {/* Sidebar Tabs */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'visibility' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Site Visibility</h3>
              <div className="space-y-4">
                <label className="flex p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors border-blue-600 bg-blue-50/50">
                  <div className="flex items-center h-5">
                    <input name="visibility" type="radio" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-slate-900">Public (Indexed)</span>
                    <span className="block text-sm text-slate-500 mt-1">Available to everyone and indexed by search engines.</span>
                  </div>
                </label>
                <label className="flex p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center h-5">
                    <input name="visibility" type="radio" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-slate-900">Unlisted</span>
                    <span className="block text-sm text-slate-500 mt-1">Anyone with the link can view. Not indexed by search engines.</span>
                  </div>
                </label>
                <label className="flex p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center h-5">
                    <input name="visibility" type="radio" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-slate-900">Private</span>
                    <span className="block text-sm text-slate-500 mt-1">Only workspace members can view. Public link is disabled.</span>
                  </div>
                </label>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Public URL</h3>
                <div className="flex mt-2">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm">
                    teamtender.id/company/
                  </span>
                  <input
                    type="text"
                    defaultValue="demo-company"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-slate-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Company Brand Kit</h3>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="relative font-medium text-blue-600 hover:text-blue-500">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, SVG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded shadow-sm border border-slate-200" style={{ backgroundColor: '#0ea5e9' }}></div>
                    <input type="text" defaultValue="#0ea5e9" className="flex-1 block w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded shadow-sm border border-slate-200" style={{ backgroundColor: '#0f172a' }}></div>
                    <input type="text" defaultValue="#0f172a" className="flex-1 block w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="max-w-2xl">
               <h3 className="text-lg font-semibold text-slate-900 mb-6">Hero Section</h3>
               <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hero Image / Cover</label>
                  <div className="h-40 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer bg-slate-50">
                     <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                        <span className="text-sm font-medium text-blue-600">Select from Media Library</span>
                     </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">About Us</label>
                  <textarea rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Write a short description about your company..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mission</label>
                  <textarea rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vision</label>
                  <textarea rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                </div>
               </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="max-w-4xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold text-slate-900">Products Catalog</h3>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                   Add Product
                 </button>
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                 <p className="text-slate-500 text-sm">No products added yet. Click "Add Product" to start building your catalog.</p>
               </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="max-w-4xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold text-slate-900">Services Catalog</h3>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                   Add Service
                 </button>
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                 <p className="text-slate-500 text-sm">No services added yet.</p>
               </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="max-w-4xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold text-slate-900">Featured Portfolio</h3>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                   Add Project
                 </button>
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                 <p className="text-slate-500 text-sm">No projects in your portfolio yet.</p>
               </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="max-w-4xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold text-slate-900">Activity Feed</h3>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                   Post Update
                 </button>
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                 <p className="text-slate-500 text-sm">No recent activities or news to show.</p>
               </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="max-w-4xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold text-slate-900">Download Center</h3>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                   Upload File
                 </button>
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                 <p className="text-slate-500 text-sm">No files available for download.</p>
               </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Company Asset Library</h3>
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center">
                  <Upload className="w-4 h-4 mr-2" /> Upload Asset
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Empty State placeholder */}
                <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <ImageIcon className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                  <p className="text-slate-500 text-sm">No assets uploaded yet.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
             <div className="max-w-2xl">
               <h3 className="text-lg font-semibold text-slate-900 mb-6">Search Engine Optimization</h3>
               <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Company Name | Industry Leader" />
                  <p className="mt-1 text-xs text-slate-500">Keep it under 60 characters for best results.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                  <textarea rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Brief description for search engine results..."></textarea>
                  <p className="mt-1 text-xs text-slate-500">Keep it under 160 characters.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Keywords</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="construction, supplier, jakarta" />
                  <p className="mt-1 text-xs text-slate-500">Comma separated keywords.</p>
                </div>
               </div>
             </div>
          )}

          {activeTab === 'qr' && (
             <div className="max-w-xl">
               <h3 className="text-lg font-semibold text-slate-900 mb-6">Digital Passport QR Code</h3>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-sm mb-6 border border-slate-200 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Company Passport QR</h4>
                  <p className="text-sm text-slate-500 mt-2 mb-6">
                    Download and share this QR code. Anyone who scans it will be taken directly to your public profile and verification status.
                  </p>
                  <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Download QR Code
                  </button>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
