import React from 'react';
import { Printer, Eye, UserCheck } from 'lucide-react';
import { INPUT_STYLE, SELECT_STYLE, LABEL_STYLE as LABEL } from '../../config/fields';

export default function KsoSection({
    selectedKsoPartnerId = '',
    setSelectedKsoPartnerId = () => {},
    ksoPartnersList = [],
    adminKsoName = '',
    setAdminKsoName = () => {},
    adminKsoLeaderShare = 60,
    setAdminKsoLeaderShare = () => {},
    adminKsoMemberShare = 40,
    setAdminKsoMemberShare = () => {},
    setKsoModalShare = () => {},
    setKsoShareStatus = () => {},
    adminKsoUploadedFile = null,
    handleUploadKsoFile = () => {},
    tenderMeta = {}
}) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                {/* KSO Form */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 self-start">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Pengaturan Perjanjian KSO</h3>
                    
                    <div className="space-y-3">
                        <div>
                            <label className={LABEL}>Pilih Rekanan KSO</label>
                            <select 
                                className={SELECT_STYLE + " w-full"}
                                value={selectedKsoPartnerId}
                                onChange={e => {
                                    setSelectedKsoPartnerId(e.target.value);
                                    if(e.target.value) {
                                        setKsoModalShare(40);
                                        setKsoShareStatus('Synced');
                                    } else {
                                        setKsoModalShare(0);
                                        setKsoShareStatus('Unsynced');
                                    }
                                }}
                            >
                                <option value="">-- Tanpa KSO (Penyedia Tunggal) --</option>
                                {ksoPartnersList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                            </select>
                        </div>

                        {selectedKsoPartnerId && (
                            <>
                                <div>
                                    <label className={LABEL}>Nama Kemitraan KSO</label>
                                    <input 
                                        type="text" 
                                        className={INPUT_STYLE + " w-full font-bold"} 
                                        value={adminKsoName}
                                        onChange={e => setAdminKsoName(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className={LABEL}>Saham Leader (%)</label>
                                        <input 
                                            type="number" 
                                            className={INPUT_STYLE + " w-full font-bold"} 
                                            value={adminKsoLeaderShare}
                                            onChange={e => {
                                                const val = parseInt(e.target.value) || 0;
                                                setAdminKsoLeaderShare(val);
                                                setAdminKsoMemberShare(100 - val);
                                                setKsoModalShare(100 - val);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className={LABEL}>Saham Mitra (%)</label>
                                        <input 
                                            type="number" 
                                            className={INPUT_STYLE + " w-full"} 
                                            value={adminKsoMemberShare}
                                            onChange={e => {
                                                const val = parseInt(e.target.value) || 0;
                                                setAdminKsoMemberShare(val);
                                                setAdminKsoLeaderShare(100 - val);
                                                setKsoModalShare(val);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-200 space-y-3">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">Aksi Berkas KSO</div>
                                    <button 
                                        onClick={() => alert("Mencetak Draf Perjanjian KSO...")}
                                        className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                    >
                                        <Printer size={13} /> Cetak Draf KSO
                                    </button>
                                    
                                    <div className="space-y-1.5">
                                        <div className="text-[9px] text-slate-400 font-semibold uppercase">Unggah File Surat KSO Asli (Tandatangan & Stempel)</div>
                                        <label className="w-full py-2 bg-indigo-50 border border-dashed border-indigo-300 hover:bg-indigo-100/50 text-indigo-700 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 text-center">
                                            <Eye size={13} />
                                            {adminKsoUploadedFile ? "Ganti File KSO" : "Pilih File & Unggah"}
                                            <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleUploadKsoFile} />
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* KSO Preview */}
                <div className="flex-1 space-y-4">
                    {selectedKsoPartnerId ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="text-[10px] font-bold text-slate-500 uppercase">Pratinjau Surat Perjanjian KSO (A4 Portrait)</div>
                                {adminKsoUploadedFile ? (
                                    <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                                        ✓ File Terunggah: {adminKsoUploadedFile}
                                    </span>
                                ) : (
                                    <span className="bg-amber-50 text-amber-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-amber-200 animate-pulse">
                                        Menunggu Unggahan Berkas TTD
                                    </span>
                                )}
                            </div>

                            <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex justify-center max-h-[480px] overflow-y-auto w-full">
                                <div className="a4-portrait font-mono text-[9px] text-slate-700 space-y-4 leading-normal shadow-lg relative print-area shrink-0 overflow-y-auto">
                                    <div className="text-right text-[8px] text-slate-400">- 66 -</div>
                                    
                                    <h2 className="text-center font-bold text-slate-900 text-[10px] underline uppercase tracking-wider">
                                        SURAT PERJANJIAN KERJA SAMA OPERASI (KSO)
                                    </h2>

                                    <p className="text-justify text-[8px]">
                                        Sehubungan dengan tender pekerjaan <span className="font-bold">"{tenderMeta?.namaPaket}"</span> maka kami:
                                    </p>

                                    <div className="pl-4 space-y-1 text-[8px]">
                                        <div>1. <span className="font-bold">PT. MAJU KONSTRUKSI</span> (Penyedia 1 / Leader)</div>
                                        <div>2. <span className="font-bold">{(ksoPartnersList.find(p => p.id === selectedKsoPartnerId)?.nama || "Mitra KSO").toUpperCase()}</span> (Penyedia 2 / Anggota)</div>
                                    </div>

                                    <p className="text-justify text-[8px]">
                                        bermaksud untuk mengikuti tender dan pelaksanaan kontrak secara bersama-sama dalam bentuk Kerja Sama Operasi (KSO). Kami menyetujui dan memutuskan bahwa:
                                    </p>

                                    <div className="space-y-2 text-justify text-[8px]">
                                        <div>
                                            1. Secara bersama-sama:<br />
                                            a. Membentuk KSO dengan nama KSO adalah: <span className="font-bold underline">{adminKsoName}</span><br />
                                            b. Menunjuk <span className="font-bold">PT. MAJU KONSTRUKSI</span> sebagai perusahaan utama (leadfirm KSO) untuk KSO dan mewakili serta bertindak untuk dan atas nama KSO.<br />
                                            c. Menyetujui apabila ditunjuk sebagai pemenang, wajib bertanggung jawab secara tanggung renteng atas semua kewajiban sesuai ketentuan kontrak.
                                        </div>
                                        <div>
                                            2. Keikutsertaan modal (sharing) setiap perusahaan dalam KSO adalah:<br />
                                            - <span className="font-bold">PT. MAJU KONSTRUKSI</span> sebesar <span className="font-bold">{adminKsoLeaderShare}%</span> ({adminKsoLeaderShare} persen)<br />
                                            - <span className="font-bold">{ksoPartnersList.find(p => p.id === selectedKsoPartnerId)?.nama}</span> sebesar <span className="font-bold">{adminKsoMemberShare}%</span> ({adminKsoMemberShare} persen)
                                        </div>
                                        <div>
                                            3. Masing-masing peserta anggota KSO, akan mengambil bagian sesuai sharing tersebut dalam hal pengeluaran, keuntungan, dan kerugian dari KSO.
                                        </div>
                                    </div>

                                    <div className="pt-6 flex justify-around text-center text-[7.5px] font-bold">
                                        <div className="w-40 space-y-10">
                                            <div>PT. MAJU KONSTRUKSI</div>
                                            <div className="underline">( Ir. Budi Santoso )<br /><span className="text-[6.5px] text-slate-400 font-medium">Direktur Utama (Leader)</span></div>
                                        </div>
                                        <div className="w-40 space-y-10">
                                            <div>{ksoPartnersList.find(p => p.id === selectedKsoPartnerId)?.nama.toUpperCase()}</div>
                                            <div className="underline">( Perwakilan Mitra )<br /><span className="text-[6.5px] text-slate-400 font-medium">Anggota KSO</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                            <UserCheck size={36} className="text-slate-300 mb-2" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tender Tanpa KSO</h4>
                            <p className="text-[11px] max-w-sm mt-1">
                                Untuk tender ini, Anda masuk sebagai Penyedia Tunggal. Jika ingin menggunakan kemitraan KSO, silakan pilih rekanan pada panel formulir di sisi kiri.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
