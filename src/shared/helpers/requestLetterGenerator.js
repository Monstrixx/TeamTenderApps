/**
 * Generates official equipment lease request letter text.
 * Pure function - No React, No DOM, No API side-effects.
 * 
 * @param {Object} params
 * @param {Object} params.supplier
 * @param {string} params.supplier.name - Name of target supplier
 * @param {Object} params.tender
 * @param {string} params.tender.packageName - Name of the tender package
 * @param {string} params.tender.hpsValue - HPS value formatted string
 * @param {string} params.tender.pokjaName - Selection committee name
 * @param {string} params.tender.pokjaAddress - Selection committee address
 * @param {Object} params.company
 * @param {string} params.company.name - Company name
 * @param {string} params.company.requestLetterNo - Official request letter number
 * @param {string} params.company.date - Date of the letter
 * @param {Object} params.signatory
 * @param {string} params.signatory.name - Name of the signatory
 * @param {string} params.signatory.title - Title of the signatory
 * @param {Array<Object>} params.equipment
 * @param {string} params.equipment[].name - Equipment name
 * @param {number} params.equipment[].quantity - Equipment quantity
 * @param {string} params.equipment[].unit - Equipment unit
 * @returns {string} Formatted request letter body text
 */
export function generateRequestLetterText({ 
    supplier, 
    tender, 
    company, 
    signatory, 
    equipment 
}) {
    if (!supplier?.name || !company?.name) return '';

    const equipmentListText = Array.isArray(equipment) && equipment.length > 0
        ? equipment.map((item, index) => `${index + 1}. ${item.name || ''} (${item.quantity || 0} ${item.unit || ''})`).join('\n')
        : '-';

    return (
        `KOP SURAT PERUSAHAAN\n` +
        `${company.name.toUpperCase()}\n` +
        `=============================================================\n\n` +
        `Nomor   : ${company.requestLetterNo || ''}\n` +
        `Lampiran: 1 (Satu) Berkas\n` +
        `Hal     : Permohonan Dukungan Sewa Peralatan Utama\n\n` +
        `Kepada Yth.\n` +
        `Pimpinan ${supplier.name}\n` +
        `di Tempat\n\n` +
        `Dengan hormat,\n` +
        `Sehubungan dengan keikutsertaan kami, ${company.name}, dalam proses pelelangan pekerjaan:\n\n` +
        `Nama Paket Pekerjaan : ${tender?.packageName || ''}\n` +
        `Nilai HPS            : ${tender?.hpsValue || ''}\n` +
        `Pokja Pemilihan      : ${tender?.pokjaName || ''}\n` +
        `Alamat Pokja         : ${tender?.pokjaAddress || ''}\n\n` +
        `Maka dengan ini kami mengajukan permohonan dukungan sewa peralatan utama berupa:\n` +
        `${equipmentListText}\n\n` +
        `Kami berharap Pihak ${supplier.name} dapat menerbitkan Surat Perjanjian Sewa Peralatan spesifik untuk tender tersebut di atas sebagai kelengkapan dokumen teknis kami.\n\n` +
        `Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerja samanya kami ucapkan terima kasih.\n\n\n` +
        `${company.date || ''}\n` +
        `${company.name},\n\n\n\n\n` +
        `${signatory?.name || ''}\n` +
        `${signatory?.title || ''}`
    );
}
