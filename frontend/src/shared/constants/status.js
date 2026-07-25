export const TENDER_STATUS = {
  MENUNGGU_PENGUMUMAN: 'Menunggu Pengumuman',
  EVALUASI_PENAWARAN: 'Evaluasi Penawaran',
  MENANG: 'Menang',
  GUGUR: 'Gugur',
};

export const STATUS_COLORS = {
  [TENDER_STATUS.MENUNGGU_PENGUMUMAN]: 'bg-amber-100 text-amber-800 border-amber-200',
  [TENDER_STATUS.EVALUASI_PENAWARAN]: 'bg-blue-100 text-blue-800 border-blue-200',
  [TENDER_STATUS.MENANG]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  [TENDER_STATUS.GUGUR]: 'bg-rose-100 text-rose-800 border-rose-200',
};

export const APENDO_SYNC_STATUS = {
  READY: 'ready',
  SYNCING: 'syncing',
  SUCCESS: 'success',
  ERROR: 'error',
};
