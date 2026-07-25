import React from 'react';
import { CheckCircle2, Printer, Eye, UserCheck, Download, ShieldAlert } from 'lucide-react';
import { INPUT_STYLE, SELECT_STYLE, LABEL_STYLE as LABEL } from '../../../../data/mock/workspace/fields';
import { AiLogPanel } from '../../ai/components';
import { KsoSection } from '../../kso/components';

export default function AdministrasiSection({
    adminSubTab = 'penawaran',
    setAdminSubTab = () => {},
    useApendoLetter = true,
    setUseApendoLetter = () => {},
    tenderMeta = {},
    getGrandTotal = () => 0,
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
    adminBidBondRequired = false,
    setAdminBidBondRequired = () => {},
    adminBidBondPercent = 1.5,
    setAdminBidBondPercent = () => {},
    adminBidBondDays = 90,
    setAdminBidBondDays = () => {},
    adminBidBondIssuer = 'Bank Mandiri Cabang Semarang',
    setAdminBidBondIssuer = () => {},
    adminBidBondRequestDownloaded = false,
    setAdminBidBondRequestDownloaded = () => {},
    adminBidBondUploadedFile = null,
    handleUploadBidBondFile = () => {},
    adminBidBondAiLogs = [],
    adminIsScanningBidBond = false,
    setAiLogs = () => {}
}) {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-200">
            {/* Inner Sub-tabs Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex gap-2">
                    {[
                        { id: 'penawaran', label: 'Surat Penawaran' },
                        { id: 'kso', label: 'Surat Perjanjian KSO' },
                        { id: 'jaminan', label: 'Jaminan Penawaran (Bid Bond)' }
                    ].map(sub => (
                        <button
                            key={sub.id}
                            onClick={() => setAdminSubTab(sub.id)}
                            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer
                                ${adminSubTab === sub.id 
                                    ? 'border-indigo-600 text-indigo-600' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* SUB-TAB 1: SURAT PENAWARAN */}
            {adminSubTab === 'penawaran' && (
                <div className="space-y-6">
                    {/* APENDO Choice Toggle */}
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                        <div className="flex items-start gap-3">
                            <input 
                                type="checkbox" 
                                id="apendo-toggle"
                                className="w-4 h-4 rounded text-indigo-600 border-slate-350 focus:ring-indigo-500 mt-0.5"
                                checked={useApendoLetter}
                                onChange={e => setUseApendoLetter(e.target.checked)}
                            />
                            <div className="flex-1">
                                <label htmlFor="apendo-toggle" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                                    Gunakan Surat Penawaran Bawaan Sistem APENDO / SPSE (Rekomendasi Pokja)
                                </label>
                                <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                    Apabila diaktifkan, dokumen penawaran administrasi dasar akan secara otomatis disusun dan dimasukkan ke dalam payload enkripsi oleh software APENDO milik LKPP saat Anda mengunggah file penawaran. Anda tidak perlu mencetak dan memindai dokumen fisik.
                                </p>
                            </div>
                        </div>
                    </div>

                    {useApendoLetter ? (
                        <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3">
                            <CheckCircle2 className="text-indigo-600 shrink-0" size={24} />
                            <div className="text-xs text-indigo-850">
                                <span className="font-extrabold block">Status APENDO: AKTIF & SIAP SINKRON</span>
                                Sistem telah mengonfigurasi workspace agar Surat Penawaran disubmit secara elektronik via enkripsi payload APENDO. Tidak ada berkas fisik tambahan yang perlu diunggah.
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                                <span>Draf Draf Surat Penawaran (Sistem) (A4 Portrait)</span>
                                <button 
                                    onClick={() => alert("Mencetak Surat Penawaran...")}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-white bg-slate-900 hover:bg-black rounded-lg transition-all cursor-pointer"
                                >
                                    <Printer size={12} /> Cetak Surat Penawaran
                                </button>
                            </div>

                            {/* A4 Portrait Viewer */}
                            <div className="p-6 bg-slate-100 border border-slate-200 rounded-xl flex justify-center max-h-[500px] overflow-y-auto w-full">
                                <div className="a4-portrait font-mono text-[9.5px] text-slate-800 space-y-5 leading-relaxed shadow-lg overflow-y-auto">
                                    <div className="text-right text-[8px] text-slate-400">LAMPIRAN APENDO ALTERNATIF</div>
                                    
                                    <div className="space-y-0.5">
                                        <div>Nomor : 022/DIR-MK/VII/2026</div>
                                        <div>Lampiran : 1 Berkas Dokumen Penawaran</div>
                                        <div>Perihal : Penawaran Administrasi, Teknis, dan Harga</div>
                                    </div>

                                    <div className="pt-2">
                                        Kepada Yth.<br />
                                        <span className="font-bold">{tenderMeta?.pokja}</span><br />
                                        di Tempat
                                    </div>

                                    <p className="indent-8">
                                        Sehubungan dengan pengumuman pendaftaran tender untuk paket pekerjaan <span className="font-bold">"{tenderMeta?.namaPaket}"</span>, kami yang bertangan dibawah ini, atas nama PT. Maju Konstruksi, setelah mempelajari secara saksama Dokumen Pemilihan dan Adendumnya, dengan ini mengajukan penawaran untuk melaksanakan pekerjaan tersebut dengan nilai penawaran sebesar <span className="font-bold text-indigo-600">Rp {getGrandTotal().toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>.
                                    </p>

                                    <p className="indent-8">
                                        Penawaran ini berlaku selama 90 (sembilan puluh) hari kalender sejak batas akhir pemasukan dokumen penawaran. Sesuai dengan persyaratan Dokumen Pemilihan, kami melampirkan seluruh dokumen administrasi, draf teknis, dan rincian harga penawaran sebagai satu kesatuan yang tidak terpisahkan.
                                    </p>

                                    <p>Dengan diserahkannya surat penawaran ini, kami menyatakan tunduk pada semua ketentuan Dokumen Pemilihan.</p>

                                    <div className="pt-8 flex justify-between">
                                        <div></div>
                                        <div className="text-center w-60 space-y-12">
                                            <div>
                                                Rembang, 19 Juli 2026<br />
                                                <span className="font-bold">PT. MAJU KONSTRUKSI</span>
                                            </div>
                                            <div>
                                                <span className="font-bold underline text-[10px]">Ir. Budi Santoso</span><br />
                                                Direktur Utama
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* SUB-TAB 2: SURAT PERJANJIAN KSO */}
            {adminSubTab === 'kso' && (
                <KsoSection 
                    selectedKsoPartnerId={selectedKsoPartnerId}
                    setSelectedKsoPartnerId={setSelectedKsoPartnerId}
                    ksoPartnersList={ksoPartnersList}
                    adminKsoName={adminKsoName}
                    setAdminKsoName={setAdminKsoName}
                    adminKsoLeaderShare={adminKsoLeaderShare}
                    setAdminKsoLeaderShare={setAdminKsoLeaderShare}
                    adminKsoMemberShare={adminKsoMemberShare}
                    setAdminKsoMemberShare={setAdminKsoMemberShare}
                    setKsoModalShare={setKsoModalShare}
                    setKsoShareStatus={setKsoShareStatus}
                    adminKsoUploadedFile={adminKsoUploadedFile}
                    handleUploadKsoFile={handleUploadKsoFile}
                    tenderMeta={tenderMeta}
                />
            )}

            {/* SUB-TAB 3: JAMINAN PENAWARAN */}
            {adminSubTab === 'jaminan' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                        {/* Bid Bond Form */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 self-start">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Kalkulator Jaminan Penawaran</h3>
                                <span className="text-[8px] font-extrabold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                                    HPS: 2.8M
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                                    <input 
                                        type="checkbox" 
                                        id="bidbond-required-toggle"
                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                                        checked={adminBidBondRequired}
                                        onChange={e => {
                                            setAdminBidBondRequired(e.target.checked);
                                            if(!e.target.checked) {
                                                handleUploadBidBondFile({ target: { files: [] } });
                                                setAiLogs([]);
                                            }
                                        }}
                                    />
                                    <label htmlFor="bidbond-required-toggle" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                                        Jaminan Penawaran Disyaratkan
                                    </label>
                                </div>

                                {adminBidBondRequired && (
                                    <>
                                        <div>
                                            <label className={LABEL}>Besaran Jaminan (% HPS)</label>
                                            <input 
                                                type="number" 
                                                className={INPUT_STYLE + " w-full font-bold"} 
                                                value={adminBidBondPercent}
                                                onChange={e => setAdminBidBondPercent(parseFloat(e.target.value) || 0)}
                                            />
                                            <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                                                Nilai Nominal Hitung: <span className="text-indigo-600 font-bold">Rp {Math.floor((tenderMeta?.hps || 2880000000) * (adminBidBondPercent / 100)).toLocaleString('id-ID')}</span>
                                            </span>
                                        </div>

                                        <div>
                                            <label className={LABEL}>Jangka Waktu Jaminan (Hari Kalender)</label>
                                            <input 
                                                type="number" 
                                                className={INPUT_STYLE + " w-full"} 
                                                value={adminBidBondDays}
                                                onChange={e => setAdminBidBondDays(parseInt(e.target.value) || 0)}
                                            />
                                        </div>

                                        <div>
                                            <label className={LABEL}>Target Lembaga Penjamin (Bank/Surety)</label>
                                            <input 
                                                type="text" 
                                                className={INPUT_STYLE + " w-full"} 
                                                value={adminBidBondIssuer}
                                                onChange={e => setAdminBidBondIssuer(e.target.value)}
                                            />
                                        </div>

                                        <div className="pt-2 border-t border-slate-200 space-y-3">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase">Unduh Surat Permohonan</div>
                                            <button 
                                                onClick={() => {
                                                    setAdminBidBondRequestDownloaded(true);
                                                    setAiLogs(logs => [...logs, { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "Sistem Penyusunan", msg: "Surat Permohonan Jaminan Penawaran diunduh untuk diajukan ke Lembaga Penjamin." }]);
                                                }}
                                                className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <Download size={13} /> {adminBidBondRequestDownloaded ? "Unduh Ulang" : "Unduh Surat Permohonan"}
                                            </button>

                                            <div className="space-y-1.5">
                                                <div className="text-[9px] text-slate-400 font-semibold uppercase">Unggah File Scan Jaminan Asli yang Terbit</div>
                                                <label className="w-full py-2 bg-indigo-50 border border-dashed border-indigo-300 hover:bg-indigo-100/50 text-indigo-700 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 text-center">
                                                    <Eye size={13} />
                                                    {adminBidBondUploadedFile ? "Ganti File Scan Jaminan" : "Pilih File & Unggah"}
                                                    <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleUploadBidBondFile} />
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Bid Bond Preview & AI Audit Terminal */}
                        <div className="flex-1 space-y-4">
                            {adminBidBondRequired ? (
                                <div className="space-y-4">
                                    {/* AI Audit Terminal */}
                                    {adminBidBondUploadedFile && (
                                        <AiLogPanel 
                                            logs={adminBidBondAiLogs}
                                            isScanning={adminIsScanningBidBond}
                                        />
                                    )}

                                    {/* Permohonan Letter Preview */}
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase">Pratinjau Surat Permohonan Jaminan (A4 Portrait)</div>
                                        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex justify-center max-h-[380px] overflow-y-auto w-full">
                                            <div className="a4-portrait font-mono text-[9px] text-slate-700 space-y-4 leading-normal shadow-lg relative print-area shrink-0 overflow-y-auto">
                                                <div className="text-center border-b-2 border-slate-800 pb-2 space-y-1">
                                                    <h2 className="text-xs font-extrabold text-slate-900 tracking-wider">PT. MAJU KONSTRUKSI</h2>
                                                    <p className="text-[7.5px] text-slate-500 font-semibold">Gedung Graha Construction Lt. 4, Jakarta | Telp: 021-555666</p>
                                                </div>

                                                <div className="space-y-0.5">
                                                    <div>Nomor : 023/DIR-MK/VII/2026</div>
                                                    <div>Perihal: Permohonan Penerbitan Jaminan Penawaran (Bid Bond)</div>
                                                </div>

                                                <div className="pt-2">
                                                    Kepada Yth.<br />
                                                    Pimpinan <span className="font-bold">{adminBidBondIssuer}</span><br />
                                                    di Tempat
                                                </div>

                                                <p className="text-justify indent-8">
                                                    Dengan ini kami mengajukan permohonan penerbitan Jaminan Penawaran (Bid Bond) sehubungan dengan keikutsertaan kami pada tender pengadaan pekerjaan konstruksi <span className="font-bold">"{tenderMeta?.namaPaket}"</span> dengan detail jaminan sebagai berikut:
                                                </p>

                                                <div className="pl-4 grid grid-cols-[160px_10px_1fr] gap-0.5 text-[8.5px]">
                                                    <div>Penerima Jaminan</div><div>:</div><div className="font-bold">{tenderMeta?.pokja}</div>
                                                    <div>Besaran Nilai Jaminan</div><div>:</div><div className="font-bold">Rp {Math.floor((tenderMeta?.hps || 2880000000) * (adminBidBondPercent / 100)).toLocaleString('id-ID')},00 ({adminBidBondPercent}% dari HPS)</div>
                                                    <div>Jangka Waktu Jaminan</div><div>:</div><div className="font-bold">{adminBidBondDays} hari kalender</div>
                                                    <div>Efektif Mulai</div><div>:</div><div>19 Juli 2026 s.d. {(19 + adminBidBondDays) > 30 ? "17 Oktober 2026" : "19 Agustus 2026"}</div>
                                                </div>

                                                <p className="text-justify">
                                                    Kami bersedia memenuhi segala persyaratan dan jaminan kontra yang disyaratkan oleh pihak Bank/Asuransi demi kelancaran penerbitan warkat jaminan penawaran ini.
                                                </p>

                                                <div className="pt-4 flex justify-between">
                                                    <div></div>
                                                    <div className="text-center w-44 space-y-8">
                                                        <div>PT. Maju Konstruksi,</div>
                                                        <div className="font-bold underline">Ir. Budi Santoso</div>
                                                        <div className="text-[7.5px] text-slate-500">Direktur Utama</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                    <ShieldAlert size={36} className="text-slate-300 mb-2" />
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Jaminan Penawaran Tidak Disyaratkan</h4>
                                    <p className="text-[11px] max-w-sm mt-1">
                                        Pokja menetapkan Jaminan Penawaran hanya disyaratkan secara ketat untuk HPS &ge; Rp 10 Miliar. Untuk tender Hibah Barang ini (Rp2.88 M), Jaminan tidak diwajibkan oleh LDP. Aktifkan checkbox di kiri jika ingin menyertakan secara opsional.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
