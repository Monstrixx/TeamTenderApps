import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProfilPerusahaan from './pages/ProfilPerusahaan';
import MitraKso from './pages/MitraKso';
import TenderBaru from './pages/TenderBaru';
import TenderAktif from './pages/TenderAktif';
import Workspace from './pages/Workspace';
import TenderArsip from './pages/TenderArsip';

function App() {
  const [activeRoute, setActiveRoute] = useState('tender-baru');

  const renderPage = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <Dashboard setActiveRoute={setActiveRoute} />;
      case 'profil':
        return <ProfilPerusahaan setActiveRoute={setActiveRoute} />;
      case 'mitra-kso':
        return <MitraKso />;
      case 'tender-baru':
        return <TenderBaru setActiveRoute={setActiveRoute} />;
      case 'tender-aktif':
        return <TenderAktif setActiveRoute={setActiveRoute} />;
      case 'tender-arsip':
        return <TenderArsip />;
      case 'workspace':
        return <Workspace setActiveRoute={setActiveRoute} />;
      default:
        return <Dashboard setActiveRoute={setActiveRoute} />;
    }
  };

  return (
    <Layout activeRoute={activeRoute} setActiveRoute={setActiveRoute}>
      {renderPage()}
    </Layout>
  );
}

export default App;
