import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProfilPerusahaan from './pages/ProfilPerusahaan';
import DirektoriRelasi from './pages/DirektoriRelasi';
import TenderBaru from './pages/TenderBaru';
import TenderAktif from './pages/TenderAktif';
import Workspace from './pages/Workspace';
import SuratMenyurat from './pages/SuratMenyurat';
import TenderArsip from './pages/TenderArsip';
import ValidationPage from './pages/ValidationPage';

function App() {
  const [activeRoute, setActiveRoute] = useState('tender-baru');

  const renderPage = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <Dashboard setActiveRoute={setActiveRoute} />;
      case 'profil':
        return <ProfilPerusahaan setActiveRoute={setActiveRoute} />;
      case 'direktori-relasi':
        return <DirektoriRelasi />;
      case 'tender-baru':
        return <TenderBaru setActiveRoute={setActiveRoute} />;
      case 'tender-aktif':
        return <TenderAktif setActiveRoute={setActiveRoute} />;
      case 'tender-arsip':
        return <TenderArsip />;
      case 'surat':
        return <SuratMenyurat setActiveRoute={setActiveRoute} />;
      case 'verify':
        return <ValidationPage />;
      case 'workspace':
        return <Workspace setActiveRoute={setActiveRoute} />;
      default:
        return <Dashboard setActiveRoute={setActiveRoute} />;
    }
  };

  if (activeRoute === 'verify') {
    return <ValidationPage />;
  }

  return (
    <Layout activeRoute={activeRoute} setActiveRoute={setActiveRoute}>
      {renderPage()}
    </Layout>
  );
}

export default App;
