export const INPUT_STYLE = "px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
export const SELECT_STYLE = "px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer";
export const LABEL_STYLE = "block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5";

export const INITIAL_DOC_VALIDATION = {
  nib: { name: 'NIB (Nomor Induk Berusaha)', status: 'unvalidated', value: '9120004561239', detail: 'KBLI Jasa Konstruksi Aktif' },
  sbu: { name: 'SBU (Sertifikat Badan Usaha)', status: 'unvalidated', value: 'BG009 - Konstruksi Gedung', detail: 'Berlaku s/d: 14 Des 2028' },
  aktaPendirian: { name: 'Akta Pendirian', status: 'unvalidated', value: 'Akta No. 12 (Notaris R. Suprapto, SH - 2018)', detail: 'SK Kemenkumham Terdaftar' },
  aktaPerubahan: { name: 'Akta Perubahan Terakhir', status: 'unvalidated', value: 'Akta No. 04 (2024)', detail: 'SK Kemenkumham Terdaftar' },
  npwp: { name: 'NPWP Perusahaan', status: 'unvalidated', value: '01.234.567.8-012.000', detail: 'KPP Pratama Rembang' },
  pkp: { name: 'Pengukuhan PKP', status: 'unvalidated', value: 'SPPKP: S-12PKP/WPJ.04/2020', detail: 'Status PKP Aktif' },
  kswp: { name: 'Status KSWP', status: 'unvalidated', value: 'VALID (Keterangan Fiskal)', detail: 'Status Valid' },
  spt: { name: 'SPT Tahunan', status: 'unvalidated', value: 'SPT Tahunan 2025 (BPE Terbit)', detail: 'Tahun Pajak 2025' },
  pengalaman: { name: 'Pengalaman Proyek (Kontrak/BAST)', status: 'unvalidated', value: 'Pembangunan Gedung Serbaguna Rembang', detail: 'Nilai Kontrak Rp 4.100.000.000, BASTP Lengkap' },
  sertifikat: { name: 'Sertifikat Lainnya (ISO/K3)', status: 'unvalidated', value: 'ISO 9001:2015 & OHSAS 18001', detail: 'Masa berlaku s/d 10 Okt 2027' }
};
