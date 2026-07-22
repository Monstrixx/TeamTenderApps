import React, { lazy } from 'react';
import LandingPage from '../../pages/LandingPage';
import Dashboard from '../../pages/Dashboard';

const ProfilPerusahaan = lazy(() => import('../../pages/ProfilPerusahaan'));
const DirektoriRelasi = lazy(() => import('../../pages/DirektoriRelasi'));
const TenderBaru = lazy(() => import('../../pages/TenderBaru'));
const TenderAktif = lazy(() => import('../../pages/TenderAktif'));
const TenderArsip = lazy(() => import('../../pages/TenderArsip'));
const Workspace = lazy(() => import('../../pages/Workspace'));
const SuratMenyurat = lazy(() => import('../../pages/SuratMenyurat'));
const ValidationPage = lazy(() => import('../../pages/ValidationPage'));
const MitraKso = lazy(() => import('../../pages/MitraKso'));


export const ROUTE_MAP = {
  'landing': '/',
  'dashboard': '/dashboard',
  'profil': '/profil-perusahaan',
  'direktori-relasi': '/vendor-hub',
  'surat': '/surat-menyurat',
  'tender-baru': '/tender-baru',
  'tender-aktif': '/tender-aktif',
  'tender-arsip': '/tender-arsip',
  'workspace': '/workspace',
  'verify': '/validation',
  'mitra-kso': '/mitra-kso'
};

export const PATH_TO_ID = {
  '/': 'landing',
  '/dashboard': 'dashboard',
  '/profil-perusahaan': 'profil',
  '/vendor-hub': 'direktori-relasi',
  '/direktori-relasi': 'direktori-relasi',
  '/surat-menyurat': 'surat',
  '/tender-baru': 'tender-baru',
  '/tender-aktif': 'tender-aktif',
  '/tender-arsip': 'tender-arsip',
  '/workspace': 'workspace',
  '/validation': 'verify',
  '/verify': 'verify',
  '/mitra-kso': 'mitra-kso'
};

export const routes = [
  { path: '/', id: 'landing', element: LandingPage, isPublic: true },
  { path: '/dashboard', id: 'dashboard', element: Dashboard, isPublic: false },
  { path: '/profil-perusahaan', id: 'profil', element: ProfilPerusahaan, isPublic: false },
  { path: '/vendor-hub', id: 'direktori-relasi', element: DirektoriRelasi, isPublic: false },
  { path: '/direktori-relasi', id: 'direktori-relasi', element: DirektoriRelasi, isPublic: false },
  { path: '/tender-baru', id: 'tender-baru', element: TenderBaru, isPublic: false },
  { path: '/tender-aktif', id: 'tender-aktif', element: TenderAktif, isPublic: false },
  { path: '/tender-arsip', id: 'tender-arsip', element: TenderArsip, isPublic: false },
  { path: '/workspace', id: 'workspace', element: Workspace, isPublic: false },
  { path: '/surat-menyurat', id: 'surat', element: SuratMenyurat, isPublic: false },
  { path: '/validation', id: 'verify', element: ValidationPage, isPublic: true },
  { path: '/verify', id: 'verify', element: ValidationPage, isPublic: true },
  { path: '/mitra-kso', id: 'mitra-kso', element: MitraKso, isPublic: false }
];
