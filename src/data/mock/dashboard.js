import { Building2, Folder, Archive, Star, Calendar, MoreVertical, Edit3, BarChart3, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const dashboardStats = [
  { label: 'Tender Aktif', value: '8', desc: 'Sedang dikerjakan', icon: Folder, color: 'text-blue-600', bg: 'bg-blue-50', route: 'tender-aktif' },
  { label: 'Tender Arsip', value: '15', desc: 'Telah diikuti', icon: Archive, color: 'text-slate-600', bg: 'bg-slate-50', route: 'tender-arsip' },
  { label: 'Wishlist Tender', value: '23', desc: 'Dalam pantauan', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', route: 'tender-baru' },
  { label: 'Jadwal Hari Ini', value: '3', desc: 'Deadline mendekat', icon: Calendar, color: 'text-rose-600', bg: 'bg-rose-50', route: 'tender-aktif' },
];

export const activeTenders = [
  { name: 'Pembangunan Gedung Kantor Dinas Pendidikan', agency: 'Pemerintah Provinsi Jawa Tengah', deadline: '25 Jul 2026', remaining: '10 hari lagi', progress: 65, color: 'bg-blue-600' },
  { name: 'Peningkatan Jalan Ruas Kota - Kecamatan', agency: 'Pemerintah Kabupaten Bogor', deadline: '28 Jul 2026', remaining: '13 hari lagi', progress: 40, color: 'bg-emerald-500' },
  { name: 'Rehabilitasi Jaringan Irigasi Desa Sukamaju', agency: 'Kementerian PUPR', deadline: '31 Jul 2026', remaining: '16 hari lagi', progress: 20, color: 'bg-amber-500' },
  { name: 'Pengadaan Alat Berat Dinas PU', agency: 'Pemerintah Kota Surabaya', deadline: '02 Agu 2026', remaining: '18 hari lagi', progress: 10, color: 'bg-purple-500' },
];

export const agendaItems = [
  { time: '10:00 WIB', title: 'Batas Pemasukan Dokumen', desc: 'Gedung Pendidikan Rembang', date: 'Hari Ini' },
  { time: '14:00 WIB', title: 'Rapat Penjelasan (Aanwijzing)', desc: 'Rehabilitasi Irigasi Sukamaju', date: 'Besok' },
  { time: '09:00 WIB', title: 'Pembukaan Dokumen Penawaran', desc: 'Peningkatan Jalan Bogor', date: '19 Jul 2026' }
];
