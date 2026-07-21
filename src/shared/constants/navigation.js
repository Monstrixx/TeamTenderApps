import { Home, Building2, PlusCircle, Activity, Users, Archive, FileText } from 'lucide-react';

export const MAIN_MENU_ITEMS = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'profil', icon: Building2, label: 'Profil Perusahaan' },
  { id: 'direktori-relasi', icon: Users, label: 'Vendor Hub' },
  { id: 'surat', icon: FileText, label: 'Surat Menyurat' },
];

export const TENDER_MENU_ITEMS = [
  { id: 'tender-baru', icon: PlusCircle, label: 'Tender Baru' },
  { id: 'tender-aktif', icon: Activity, label: 'Tender Aktif' },
  { id: 'tender-arsip', icon: Archive, label: 'Tender Arsip' },
];
