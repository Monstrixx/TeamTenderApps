/**
 * Pure calculation and helper functions for Workspace domain module
 */

/**
 * Get item base price by type and id from basic price lists
 */
export function calculateItemBasePrice(type, itemId, upahList = [], bahanList = [], alatList = []) {
  if (type === 'upah') return upahList.find(u => u.id === itemId)?.harga || 0;
  if (type === 'bahan') return bahanList.find(b => b.id === itemId)?.harga || 0;
  if (type === 'alat') return alatList.find(e => e.id === itemId)?.harga || 0;
  return 0;
}

/**
 * Calculate total price of a single AHSP item
 */
export function calculateAhspItemTotal(ahsp, upahList = [], bahanList = [], alatList = []) {
  if (!ahsp) return 0;
  const upahCost = (ahsp.upah || []).reduce((sum, u) => sum + (u.koef * calculateItemBasePrice('upah', u.item, upahList, bahanList, alatList)), 0);
  const bahanCost = (ahsp.bahan || []).reduce((sum, b) => sum + (b.koef * calculateItemBasePrice('bahan', b.item, upahList, bahanList, alatList)), 0);
  const alatCost = (ahsp.alat || []).reduce((sum, e) => sum + (e.koef * calculateItemBasePrice('alat', e.item, upahList, bahanList, alatList)), 0);
  return parseFloat((upahCost + bahanCost + alatCost).toFixed(2));
}

/**
 * Calculate unit rate for a single BOQ item considering pricing strategy
 */
export function calculateBoqUnitRate(item, ahspItems = [], upahList = [], bahanList = [], alatList = [], pricingStrategy = 'original', targetPercentage = 0) {
  if (!item) return 0;
  if (item.isLumpsum) {
    let price = item.basePrice || 0;
    if (pricingStrategy === 'percent') {
      price = price * (1 - targetPercentage / 100);
    }
    return parseFloat(price.toFixed(2));
  }
  const ahsp = ahspItems.find(a => a.id === item.ahspId);
  if (!ahsp) return 0;
  let rate = calculateAhspItemTotal(ahsp, upahList, bahanList, alatList);

  if (pricingStrategy === 'percent') {
    rate = rate * (1 - targetPercentage / 100);
  }
  return parseFloat(rate.toFixed(2));
}

/**
 * Calculate line item total for a BOQ item
 */
export function calculateBoqItemTotal(item, ahspItems = [], upahList = [], bahanList = [], alatList = [], pricingStrategy = 'original', targetPercentage = 0) {
  if (!item) return 0;
  return parseFloat((item.vol * calculateBoqUnitRate(item, ahspItems, upahList, bahanList, alatList, pricingStrategy, targetPercentage)).toFixed(2));
}

/**
 * Calculate grand total for entire BOQ list
 */
export function calculateBoqGrandTotal(boqList = [], ahspItems = [], upahList = [], bahanList = [], alatList = [], pricingStrategy = 'original', targetPercentage = 0, useLumpsumOverride = false, targetNominal = 0) {
  if (!boqList) return 0;
  const sum = boqList.reduce((acc, item) => acc + calculateBoqItemTotal(item, ahspItems, upahList, bahanList, alatList, pricingStrategy, targetPercentage), 0);
  if (pricingStrategy === 'nominal' && useLumpsumOverride) {
    return targetNominal;
  }
  return parseFloat(sum.toFixed(2));
}

/**
 * Generate formatted time string for logs (HH:MM format)
 */
export function getCurrentLogTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Build request letter preview text
 */
export function buildRequestLetterPreviewText(supplier, tenderMeta, requestLetterNo) {
  if (!supplier || !tenderMeta) return '';
  return (
    `KOP SURAT PERUSAHAAN\n` +
    `PT. MAJU KONSTRUKSI\n` +
    `=============================================================\n\n` +
    `Nomor   : ${requestLetterNo}\n` +
    `Hal     : Permohonan Surat Dukungan & Penawaran Harga\n` +
    `Kepada Yth,\n` +
    `${supplier.nama}\n` +
    `${supplier.alamat}\n` +
    `Up. ${supplier.kontak}\n\n` +
    `Dengan hormat,\n\n` +
    `Sehubungan dengan keikutsertaan kami dalam proses tender:\n` +
    `Nama Paket : ${tenderMeta.namaPaket}\n` +
    `Pokja      : ${tenderMeta.pokja}\n\n` +
    `Dengan ini kami memohon agar dapat diterbitkan Surat Dukungan serta Daftar Penawaran Harga Resmi untuk material/peralatan sesuai dengan spesifikasi teknis Dokumen Pemilihan.\n\n` +
    `Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.\n\n` +
    `Hormat kami,\n` +
    `PT. MAJU KONSTRUKSI\n\n\n\n` +
    `Budi Santoso, ST\n` +
    `Direktur Utama`
  );
}
