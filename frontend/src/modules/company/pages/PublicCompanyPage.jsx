import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../../services/client/apiClient';
import { PageSkeleton } from '../../../components/ui/skeleton';
import PublicTrustWidget from '../components/PublicTrustWidget';

export default function PublicCompanyPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/public/companies/${slug}`);
        setData(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('not-found');
        } else {
          setError('server-error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error === 'not-found') {
    return <Navigate to="/404" replace />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Failed to load company profile.</p>
      </div>
    );
  }

  const { data: company, seo } = data;
  const brandKit = company.brandKit || {};
  const primaryColor = brandKit.primaryColor || '#0ea5e9'; // Default tailwind sky-500

  return (
    <div className="min-h-screen bg-slate-50 font-sans" style={{ '--primary': primaryColor }}>
      {/* SEO Helmet */}
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        {seo.openGraph.image && <meta property="og:image" content={seo.openGraph.image} />}
        <meta property="og:url" content={seo.openGraph.url} />
        <meta property="og:type" content={seo.openGraph.type} />
        {brandKit.faviconAssetId && <link rel="icon" href={`/assets/${brandKit.faviconAssetId}`} />}
      </Helmet>

      {/* Hero Section */}
      <header className="relative bg-white border-b border-slate-200">
        {company.profile?.heroAssetId ? (
          <div className="h-64 md:h-96 w-full bg-cover bg-center" style={{ backgroundImage: `url(/assets/${company.profile.heroAssetId})` }}>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <div className="h-48 md:h-64 w-full bg-gradient-to-r from-[var(--primary)] to-slate-800"></div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 md:-mt-24">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center p-2 shrink-0">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={`${company.name} logo`} className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-3xl font-bold text-slate-300">{company.name.charAt(0)}</span>
              )}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{company.name}</h1>
              <p className="text-slate-500 mt-1">{company.businessType} • Established {company.establishedDate ? new Date(company.establishedDate).getFullYear() : 'N/A'}</p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                {company.verifiedAt && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg className="-ml-0.5 mr-1.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                    Verified Company
                  </span>
                )}
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-[var(--primary)] hover:underline">
                    Visit Website
                  </a>
                )}
              </div>
            </div>
            {/* QR Code Placeholder */}
            <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-slate-50 border border-slate-200 rounded p-2">
              <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(seo.openGraph.url))] bg-contain bg-no-repeat bg-center opacity-80"></div>
              <span className="text-[10px] text-slate-400 mt-1">Scan Profile</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Statistics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="text-3xl font-black text-[var(--primary)]">{company.establishedDate ? new Date().getFullYear() - new Date(company.establishedDate).getFullYear() : '5+'}</div>
             <div className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wide">Years in Business</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="text-3xl font-black text-[var(--primary)]">{company.portfolios?.length || 0}</div>
             <div className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wide">Projects</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="text-3xl font-black text-[var(--primary)]">{company.products?.length || 0}</div>
             <div className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wide">Products</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="text-3xl font-black text-[var(--primary)]">{company.services?.length || 0}</div>
             <div className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wide">Services</div>
           </div>
        </section>

        <PublicTrustWidget slug={slug} />

        {/* About Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">About Us</h2>
          <div className="prose prose-lg prose-slate max-w-3xl mx-auto text-center">
            {company.profile?.about ? (
              <p className="whitespace-pre-wrap">{company.profile.about}</p>
            ) : (
              <p className="text-slate-500 italic">{company.description || 'No description available.'}</p>
            )}
          </div>
          
          {(company.profile?.vision || company.profile?.mission) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-slate-100">
              {company.profile.vision && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 text-center">Our Vision</h3>
                  <p className="text-slate-700 text-center">{company.profile.vision}</p>
                </div>
              )}
              {company.profile.mission && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 text-center">Our Mission</h3>
                  <p className="text-slate-700 text-center">{company.profile.mission}</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Products Section */}
        {company.products && company.products.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {company.products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  {product.coverAssetId ? (
                     <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(/assets/${product.coverAssetId})` }}></div>
                  ) : (
                     <div className="h-48 bg-slate-100 flex items-center justify-center">
                       <span className="text-slate-400">No Image</span>
                     </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">{product.category || 'Product'}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{product.name}</h3>
                    <p className="text-slate-600 mt-2 text-sm line-clamp-3">{product.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services Section */}
        {company.services && company.services.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.services.map(service => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow">
                   {service.icon ? (
                     <div className="w-16 h-16 rounded-lg bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] flex items-center justify-center shrink-0">
                       {/* Icon rendering placeholder */}
                       <span className="text-2xl">⚡</span>
                     </div>
                   ) : (
                     <div className="w-16 h-16 rounded-lg bg-slate-100 shrink-0"></div>
                   )}
                   <div>
                     <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                     {service.category && <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{service.category}</p>}
                     <p className="text-slate-600 mt-2 text-sm">{service.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Portfolio */}
        {company.portfolios && company.portfolios.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {company.portfolios.map(portfolio => (
                <div key={portfolio.id} className="group relative rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                  {portfolio.coverAssetId ? (
                     <div className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(/assets/${portfolio.coverAssetId})` }}></div>
                  ) : (
                     <div className="h-64 bg-slate-200"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[var(--primary)] font-bold text-sm uppercase tracking-wider mb-1">{portfolio.category}</p>
                    <h3 className="text-xl font-bold text-white">{portfolio.title}</h3>
                    {portfolio.client && <p className="text-slate-300 text-sm mt-1">Client: {portfolio.client}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Latest Activities */}
        {company.activities && company.activities.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Activities</h2>
            <div className="space-y-8">
              {company.activities.map(activity => (
                <div key={activity.id} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                  {activity.coverAssetId && (
                    <div className="w-full md:w-48 h-32 bg-cover bg-center rounded-lg shrink-0" style={{ backgroundImage: `url(/assets/${activity.coverAssetId})` }}></div>
                  )}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded">{activity.category}</span>
                       <span className="text-sm text-slate-500">{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{activity.title}</h3>
                    <p className="text-slate-600 text-sm">{activity.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Downloads */}
        {company.downloads && company.downloads.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Download Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.downloads.map(doc => (
                <a key={doc.id} href={`/assets/${doc.assetId}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-[var(--primary)] hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] flex items-center justify-center mr-4">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-[var(--primary)]">{doc.title}</p>
                    <p className="text-xs text-slate-500 uppercase">{doc.category} • {doc.language || 'EN'}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contact Footer */}
        <section className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-12 lg:p-16 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-slate-400 mb-8 text-lg">Interested in working with us? We'd love to hear from you.</p>
              
              <dl className="space-y-6">
                {company.addresses && company.addresses[0] && (
                  <div>
                    <dt className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Head Office</dt>
                    <dd className="text-slate-300">
                      {company.addresses[0].address}<br />
                      {company.addresses[0].district}, {company.addresses[0].city}<br />
                      {company.addresses[0].province} {company.addresses[0].postalCode}
                    </dd>
                  </div>
                )}
                {company.contacts && company.contacts[0] && (
                  <div>
                    <dt className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Contact</dt>
                    <dd className="text-slate-300">
                      {company.contacts[0].fullName}<br />
                      <a href={`mailto:${company.contacts[0].email}`} className="hover:text-white transition-colors">{company.contacts[0].email}</a><br />
                      {company.contacts[0].phone}
                    </dd>
                  </div>
                )}
              </dl>
              
              {brandKit.ctaLabel && brandKit.ctaUrl && (
                <div className="mt-10">
                  <a href={brandKit.ctaUrl} className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-lg shadow-lg hover:brightness-110 transition-all">
                    {brandKit.ctaLabel}
                  </a>
                </div>
              )}
            </div>
            
            <div className="bg-slate-800 p-10 md:p-12 lg:p-16 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-700">
               <div className="text-center w-full">
                  <p className="text-sm text-slate-500 font-bold tracking-widest uppercase mb-4">Powered by</p>
                  <div className="text-4xl font-black text-slate-700 tracking-tighter select-none">
                    TeamTender
                  </div>
                  <p className="text-slate-500 text-sm mt-4">The Platform for Digital Companies</p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
