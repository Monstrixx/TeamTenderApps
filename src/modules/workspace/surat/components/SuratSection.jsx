import React from 'react';
import { FileText, Download } from 'lucide-react';
import { INPUT_STYLE, LABEL_STYLE as LABEL } from '../../../../data/mock/workspace/fields';
import { SupplierSection } from '../../supplier/components';

export default function SuratSection({
    supplierDirectory = [],
    selectedSupplier = '',
    onSelectSupplier = () => {},
    requestLetterNo = '',
    onRequestLetterNoChange = () => {},
    requestPreviewText = '',
    tenderMeta = {}
}) {
    return (
        <div className="space-y-6">
            <SupplierSection 
                suppliers={supplierDirectory}
                selectedSupplierId={selectedSupplier}
                onSelectSupplier={onSelectSupplier}
            />

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">Surat Dukungan Material & Peralatan</h4>
                        <p className="text-xs text-slate-500">Kelola draf surat permohonan dukungan resmi</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form Controls */}
                    <div className="space-y-4">

                        <div>
                            <label className={LABEL}>Nomor Surat Permohonan</label>
                            <input
                                type="text"
                                value={requestLetterNo}
                                onChange={(e) => onRequestLetterNoChange(e.target.value)}
                                className={`w-full ${INPUT_STYLE}`}
                            />
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Informasi Paket Tender</div>
                            <div className="text-xs font-bold text-slate-700">{tenderMeta?.namaPaket || 'Pembangunan Gedung PGRI Rembang'}</div>
                            <div className="text-[11px] text-slate-500">Pokja: {tenderMeta?.pokja}</div>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => alert("Mengunduh Draf Surat Permohonan Dukungan...")}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                            >
                                <Download size={14} /> Unduh Draf Surat Permohonan (PDF)
                            </button>
                        </div>
                    </div>

                    {/* Preview Terminal */}
                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Pratinjau Teks Surat</div>
                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[9.5px] text-slate-300 max-h-[300px] overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                            {requestPreviewText || 'Memuat draf surat...'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                <p className="text-xs font-bold text-slate-700">Unggah Surat Dukungan Terverifikasi (PDF)</p>
                <p className="text-[10px] text-slate-500 mb-3">Format PDF yang sudah ditandatangani basah/elektronik oleh supplier</p>
                <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2 cursor-pointer">
                    <Download size={13} className="rotate-180" /> Pilih File PDF
                </button>
            </div>
        </div>
    );
}
