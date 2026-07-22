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
  'login': '/login',
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
  '/login': 'login',
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

const LoginPage = lazy(() => import('../../pages/LoginPage'));

export const routes = [
  { path: '/', id: 'landing', element: LandingPage, type: 'public', restricted: false },
  { path: '/login', id: 'login', element: LoginPage, type: 'public', restricted: true },
  { path: '/dashboard', id: 'dashboard', element: Dashboard, type: 'protected' },
  { path: '/profil-perusahaan', id: 'profil', element: ProfilPerusahaan, type: 'protected' },
  { path: '/vendor-hub', id: 'direktori-relasi', element: DirektoriRelasi, type: 'protected' },
  { path: '/direktori-relasi', id: 'direktori-relasi', element: DirektoriRelasi, type: 'protected' },
  { path: '/tender-baru', id: 'tender-baru', element: TenderBaru, type: 'protected' },
  { path: '/tender-aktif', id: 'tender-aktif', element: TenderAktif, type: 'protected' },
  { path: '/tender-arsip', id: 'tender-arsip', element: TenderArsip, type: 'protected' },
  { path: '/workspace', id: 'workspace', element: Workspace, type: 'permission', permission: 'VIEW_WORKSPACE' },
  { path: '/surat-menyurat', id: 'surat', element: SuratMenyurat, type: 'protected' },
  { path: '/validation', id: 'verify', element: ValidationPage, type: 'public', restricted: false },
  { path: '/verify', id: 'verify', element: ValidationPage, type: 'public', restricted: false },
  { path: '/mitra-kso', id: 'mitra-kso', element: MitraKso, type: 'protected' }
];
