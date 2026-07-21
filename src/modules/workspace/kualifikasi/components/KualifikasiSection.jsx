import React from 'react';
import { Lock, CheckCircle2, RefreshCw, Printer, Users } from 'lucide-react';
import { SELECT_STYLE, LABEL_STYLE as LABEL } from '../../config/fields';

export default function KualifikasiSection({
    kualifikasiSubTab = 'validation',
    setKualifikasiSubTab = () => {},
    simulatedRole = 'owner',
    setSimulatedRole = () => {},
    handleValidateAll = () => {},
    isValidatingAll = false,
    docValidation = {},
    handleValidateDoc = () => {},
    tenderMeta = {},
    isKdSkpPrinted = false,
    setIsKdSkpPrinted = () => {},
    setAiLogs = () => {},
    isFormulirSaved = false,
    setIsFormulirSaved = () => {},
    selectedKsoPartnerId = '',
    setSelectedKsoPartnerId = () => {},
    ksoPartnersList = [],
    ksoModalShare = 0,
    setKsoModalShare = () => {},
    ksoShareStatus = 'Unsynced',
    setKsoShareStatus = () => {},
    setSubTab = () => {}
}) {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-200">
            {/* Inner Sub-tabs Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex gap-2">
                    {[
                        { id: 'validation', label: 'Sync & Validasi Dokumen' },
                        { id: 'kdskp', label: 'Kalkulator KD & SKP' },
                        { id: 'spse', label: 'Formulir Kualifikasi SPSE' },
                        { id: 'kso', label: 'KSO & Kolaborator (RBAC)' }
                    ].map(sub => (
                        <button
                            key={sub.id}
                            onClick={() => setKualifikasiSubTab(sub.id)}
                            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer
                                ${kualifikasiSubTab === sub.id 
                                    ? 'border-emerald-600 text-emerald-600' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>
                {simulatedRole !== 'owner' && (
                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] px-2.5 py-1 rounded-full font-bold">
                        <Lock size={11} /> Mode Simulasi Peran: {simulatedRole.toUpperCase()}
                        <button onClick={() => setSimulatedRole('owner')} className="underline hover:text-amber-900 ml-1">Kembali</button>
                    </div>
                )}
            </div>

            {/* SUB-TAB 1: VALIDASI DOKUMEN LEGAL */}
            {kualifikasiSubTab === 'validation' && (
                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div className="text-xs text-slate-600">
                            <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-0.5">
                                <CheckCircle2 className="text-emerald-600" size={14} /> Sinkronisasi & Validasi Profil Legalitas
                            </div>
                            Data kualifikasi ditarik dari profil legalitas aktif. Anda dapat memicu audit kualifikasi satu per satu atau secara sekuensial.
                        </div>
                        <button 
                            onClick={handleValidateAll}
                            disabled={isValidatingAll}
                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
                        >
                            <RefreshCw size={13} className={isValidatingAll ? "animate-spin" : ""} />
                            {isValidatingAll ? "Memproses Validasi..." : "Validasi Semua Dokumen"}
                        </button>
                    </div>

                    {/* Document Validation Table/List */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-4 py-3 w-10">No</th>
                                    <th className="px-4 py-3">Nama Dokumen Kualifikasi</th>
                                    <th className="px-4 py-3">Nilai / Deskripsi Dokumen</th>
                                    <th className="px-4 py-3 w-40 text-center">Status</th>
                                    <th className="px-4 py-3 w-32 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(docValidation).map(([key, doc], idx) => {
                                    return (
                                        <tr key={key} className="border-b border-slate-150 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 py-3 text-slate-400 font-bold">{idx + 1}</td>
                                            <td className="px-4 py-3">
                                                <div className="font-bold text-slate-800">{doc.name}</div>
                                                <div className="text-[10px] text-slate-400 font-medium mt-0.5">{doc.detail}</div>
                                            </td>
                                            <td className="px-4 py-3 font-mono text-[11px] text-slate-650 bg-slate-50/30">
                                                {doc.value}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {doc.status === 'unvalidated' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                        Belum Divalidasi
                                                    </span>
                                                )}
                                                {doc.status === 'validating' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 animate-pulse">
                                                        <RefreshCw size={10} className="animate-spin" /> Memverifikasi...
                                                    </span>
                                                )}
                                                {doc.status === 'valid' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                                        ✓ Valid & Lolos
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => handleValidateDoc(key)}
                                                    disabled={doc.status === 'validating' || doc.status === 'valid'}
                                                    className="px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 disabled:text-slate-400 bg-blue-50 disabled:bg-slate-50 border border-blue-200 disabled:border-slate-200 rounded cursor-pointer transition-all"
                                                >
                                                    {doc.status === 'valid' ? 'Valid' : 'Validasi'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* SUB-TAB 2: KALKULATOR KD & SKP */}
            {kualifikasiSubTab === 'kdskp' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* KD Card */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perhitungan Kemampuan Dasar (KD)</h4>
                            <div className="text-xl font-black text-slate-800">Rp 3.300.000.000,00</div>
                            <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 space-y-1 leading-normal font-semibold">
                                <div className="text-slate-700 font-bold">Rumus: KD = 3 x NPt</div>
                                <div>NPt (Pengalaman Tertinggi Sejenis): Rp 1.100.000.000,00</div>
                                <div>Sub-Klasifikasi: BG009 (Konstruksi Gedung)</div>
                                <div className="text-emerald-600 font-bold">Syarat LDP (KD &gt;= HPS): LOLOS (KD &gt; Rp {(tenderMeta?.hps || 2880000000).toLocaleString('id-ID')})</div>
                            </div>
                        </div>

                        {/* SKP Card */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perhitungan Sisa Kemampuan Paket (SKP)</h4>
                            <div className="text-xl font-black text-slate-800">3 Paket Tersedia</div>
                            <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 space-y-1 leading-normal font-semibold">
                                <div className="text-slate-700 font-bold">Rumus: SKP = 5 - Jumlah Paket Berjalan</div>
                                <div>Paket Sedang Berjalan: 2 Pekerjaan Aktif</div>
                                <div>Batas Maksimum Paket Konstruksi: 5 Paket</div>
                                <div className="text-emerald-600 font-bold">Status Evaluasi Pokja: LOLOS (Sisa kuota paket memenuhi syarat)</div>
                            </div>
                        </div>
                    </div>

                    {/* Declaration Letter Section */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div className="text-xs font-bold text-slate-700">Draf Dokumen Pernyataan Perhitungan KD & SKP</div>
                            <button 
                                onClick={() => {
                                    setIsKdSkpPrinted(true);
                                    setAiLogs(logs => [...logs, { time: "09:40", agent: "Sistem Penyusunan", msg: "Dokumen Perhitungan KD & SKP resmi berkop surat ditandatangani dan berhasil dicetak." }]);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-lg transition-all cursor-pointer"
                            >
                                <Printer size={12} /> {isKdSkpPrinted ? "Cetak Ulang" : "Cetak Dokumen Resmi"}
                            </button>
                        </div>

                        {isKdSkpPrinted && (
                            <div className="p-3 bg-emerald-50 border-b border-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1.5 animate-in slide-in-from-top-2 duration-150">
                                <CheckCircle2 size={13} className="text-emerald-600" /> Dokumen Pernyataan Resmi berhasil dicetak dan disematkan sebagai Dokumen Penawaran Kualifikasi.
                            </div>
                        )}

                        {/* Headed Paper Letter Preview (A4 Portrait) */}
                        <div className="p-4 bg-slate-100 flex flex-col">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                <span>Pratinjau Surat Pernyataan KD & SKP (A4 Portrait)</span>
                                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[8px] font-bold">210mm x 297mm</span>
                            </div>
                            <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-slate-350/30 p-4 flex justify-center max-h-[450px]">
                                <div className="a4-portrait font-mono text-[9px] text-slate-700 space-y-4 leading-normal shadow-lg">
                                {/* Header / Kop */}
                                <div className="text-center border-b-2 border-slate-800 pb-3 space-y-1">
                                    <h2 className="text-xs font-extrabold text-slate-900 tracking-wider">PT. MAJU KONSTRUKSI</h2>
                                    <p className="text-[8px] text-slate-500 font-semibold">Gedung Graha Construction Lt. 4, Jl. Jend. Sudirman Kav. 21, Jakarta Selatan</p>
                                    <p className="text-[7px] text-slate-400">Telp: 021-555666 | Email: tender@majunk.co.id</p>
                                </div>

                                {/* Letter Details */}
                                <div className="space-y-0.5">
                                    <div>Nomor: 019/DIR-MK/VII/2026</div>
                                    <div>Hal  : Surat Pernyataan Perhitungan Kemampuan Dasar (KD) & SKP</div>
                                </div>

                                <div className="text-center font-bold text-slate-900 text-xs py-2 underline uppercase">
                                    Surat Pernyataan Perhitungan Kualifikasi
                                </div>

                                <p>Yang bertanda tangan di bawah ini:</p>
                                <div className="pl-6 space-y-0.5">
                                    <div>Nama      : Ir. Budi Santoso</div>
                                    <div>Jabatan   : Direktur Utama</div>
                                    <div>Bertindak : mewakili PT. Maju Konstruksi</div>
                                </div>

                                <p className="indent-8">Menyatakan dengan sesungguhnya bahwa untuk memenuhi persyaratan kualifikasi pada paket pekerjaan <span className="font-bold">"{tenderMeta?.namaPaket}"</span>, perusahaan kami memiliki perhitungan kualifikasi sebagai berikut:</p>

                                {/* Calculations Table */}
                                <table className="w-full border-collapse border border-slate-800 text-[8px] text-slate-800">
                                    <thead>
                                        <tr className="bg-slate-50">
                                            <th className="border border-slate-800 p-1.5 text-center w-8">No</th>
                                            <th className="border border-slate-800 p-1.5">Uraian Kualifikasi</th>
                                            <th className="border border-slate-800 p-1.5">Nilai Perhitungan</th>
                                            <th className="border border-slate-800 p-1.5">Keterangan Syarat LDP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-slate-800 p-1.5 text-center">1</td>
                                            <td className="border border-slate-800 p-1.5 font-bold">Kemampuan Dasar (KD)</td>
                                            <td className="border border-slate-800 p-1.5 font-bold">Rp 3.300.000.000,00</td>
                                            <td className="border border-slate-800 p-1.5">KD minimal harus Rp {(tenderMeta?.hps || 2880000000).toLocaleString('id-ID')} (Lolos)</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-slate-800 p-1.5 text-center">2</td>
                                            <td className="border border-slate-800 p-1.5 font-bold">Sisa Kemampuan Paket (SKP)</td>
                                            <td className="border border-slate-800 p-1.5 font-bold">3 Paket Tersedia</td>
                                            <td className="border border-slate-800 p-1.5">SKP maksimal 5 paket berjalan (Lolos)</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="indent-8">Demikian pernyataan ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagai kelengkapan penawaran kualifikasi tender kami.</p>

                                {/* Signature */}
                                <div className="pt-4 flex justify-between">
                                    <div></div>
                                    <div className="text-center space-y-8 w-44">
                                        <div>PT. Maju Konstruksi,</div>
                                        <div className="font-bold underline">Ir. Budi Santoso</div>
                                        <div className="text-[7px] text-slate-500">Direktur Utama</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* SUB-TAB 3: FORMULIR KUALIFIKASI SPSE */}
            {kualifikasiSubTab === 'spse' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-xl">
                        <div>
                            <h3 className="text-xs font-bold text-slate-800">Formulir Isian Kualifikasi SPSE (Sesuai Lampiran)</h3>
                            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Format Dokumen KSO LKPP standar Penawaran. Silakan periksa, simpan, atau unduh.</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => {
                                    setIsFormulirSaved(true);
                                    setAiLogs(logs => [...logs, { time: "09:42", agent: "Sistem Validasi", msg: "Formulir Isian Kualifikasi SPSE disimpan sebagai berkas penawaran." }]);
                                }}
                                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-sm transition-all"
                            >
                                {isFormulirSaved ? "Telah Disimpan & Divalidasi" : "Simpan & Terapkan Berkas"}
                            </button>
                        </div>
                    </div>

                    {isFormulirSaved && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[10px] font-bold animate-in slide-in-from-top-2 flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-emerald-600" />
                            Formulir isian kualifikasi siap diunduh/copy-paste ke portal LPSE. Simulasi Evaluasi Pokja: 99.99% Lolos Kepatuhan LDP.
                        </div>
                    )}

                    {/* A4 Paper Device View for SPSE Forms */}
                    <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col items-center gap-8 overflow-y-auto max-h-[600px]">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between w-[210mm]">
                            <span>Dokumen Isian Kualifikasi (4 Halaman A4)</span>
                            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[8px] font-bold">A4 Portrait (210mm x 297mm)</span>
                        </div>

                        {/* PAGE 1 (- 90 -) */}
                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                            <div className="text-right text-[8px] text-slate-400">- 90 -</div>
                            
                            <h2 className="text-center font-bold text-slate-900 text-[11px] underline uppercase tracking-wider my-4">
                                FORMULIR ISIAN KUALIFIKASI UNTUK ANGGOTA KSO
                            </h2>

                            <p className="mt-4">Saya yang bertanda tangan di bawah ini:</p>
                            
                            <div className="pl-4 grid grid-cols-[150px_10px_1fr] gap-y-2">
                                <div className="font-bold">Nama</div>
                                <div>:</div>
                                <div className="border-b border-dashed border-slate-350 pb-0.5">Ir. Budi Santoso</div>
                                
                                <div className="font-bold">Jabatan</div>
                                <div>:</div>
                                <div className="border-b border-dashed border-slate-350 pb-0.5">Direktur Utama</div>
                                
                                <div className="font-bold">Bertindak untuk dan atas nama</div>
                                <div>:</div>
                                <div className="border-b border-dashed border-slate-350 pb-0.5">PT. Maju Konstruksi (Anggota KSO)</div>
                                
                                <div className="font-bold">Alamat</div>
                                <div>:</div>
                                <div className="border-b border-dashed border-slate-350 pb-0.5">Gedung Graha Construction Lt. 4, Jl. Jend. Sudirman Kav. 21, Jakarta Selatan</div>
                                
                                <div className="font-bold">Telepon/Fax</div>
                                <div>:</div>
                                <div className="border-b border-dashed border-slate-350 pb-0.5">021-555666 / 021-555777</div>
                                
                                <div className="font-bold">Email</div>
                                <div>:</div>
                                <div className="border-b border-dashed border-slate-350 pb-0.5">tender@majunk.co.id</div>
                            </div>

                            <p className="pt-2">menyatakan dengan sesungguhnya bahwa:</p>
                            
                            <div className="space-y-2 text-justify text-[8.5px]">
                                <div className="flex gap-2">
                                    <span>1.</span>
                                    <span>saya secara hukum bertindak untuk dan atas nama badan usaha berdasarkan <span className="font-bold underline">Akta Pendirian No. 12 Tanggal 14 Mei 2018</span> yang diterbitkan oleh Notaris R. Suprapto, SH;</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>2.</span>
                                    <span>saya bukan sebagai pegawai K/L/PD [bagi pegawai K/L/PD yang sedang cuti diluar tanggungan negara ditulis sebagai berikut: "Saya merupakan pegawai K/L/PD yang sedang cuti diluar tanggungan negara"];</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>3.</span>
                                    <span>saya tidak sedang menjalani sanksi pidana;</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>4.</span>
                                    <span>saya tidak sedang dan tidak akan terlibat pertentangan kepentingan dengan para pihak yang terkait, langsung maupun tidak langsung dalam proses pengadaan ini;</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>5.</span>
                                    <span>badan usaha yang saya wakili tidak masuk dalam Daftar Hitam, tidak dalam pengawasan pengadilan, tidak pailit, dan kegiatan usahanya tidak sedang dihentikan;</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>6.</span>
                                    <span>data-data badan usaha yang saya wakili adalah sebagai berikut:</span>
                                </div>
                            </div>
                        </div>

                        {/* PAGE 2 (- 91 -) */}
                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                            <div className="text-right text-[8px] text-slate-400">- 91 -</div>
                            
                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-2">A. Data Administrasi</h3>
                            <table className="w-full border-collapse border border-slate-850 text-[8px]">
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-850 p-1.5 w-44">1. Nama Badan Usaha</td>
                                        <td className="border border-slate-850 p-1.5 font-bold">: PT. Maju Konstruksi</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-850 p-1.5">2. Status</td>
                                        <td className="border border-slate-850 p-1.5">: [x] Pusat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ ] Cabang</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-850 p-1.5 valign-top">3. Alamat Kantor Pusat</td>
                                        <td className="border border-slate-850 p-1.5">
                                            Jl. Jend. Sudirman Kav. 21, Graha Construction Lt. 4, Jakarta Selatan<br />
                                            No. Telepon: 021-555666<br />
                                            No. Fax: 021-555777<br />
                                            E-Mail: tender@majunk.co.id
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-850 p-1.5 valign-top">4. Alamat Kantor Cabang</td>
                                        <td className="border border-slate-850 p-1.5">
                                            -<br />
                                            No. Telepon: -<br />
                                            No. Fax: -<br />
                                            E-Mail: -
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">B. Landasan Hukum Pendirian Badan Usaha</h3>
                            <div className="space-y-3 pl-2">
                                <div>
                                    <div className="font-bold">1. Akta Pendirian Perusahaan/Anggaran Dasar:</div>
                                    <div className="pl-4 grid grid-cols-[100px_10px_1fr] gap-0.5 text-[8px]">
                                        <div>a. Nomor</div><div>:</div><div>12</div>
                                        <div>b. Tanggal</div><div>:</div><div>14 Mei 2018</div>
                                        <div>c. Nama Notaris</div><div>:</div><div>R. Suprapto, SH</div>
                                        <div>d. Nomor Pengesahan</div><div>:</div><div>AHU-001294.AH.01.01.Tahun 2018</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">2. Akta/Anggaran Dasar Perubahan Terakhir:</div>
                                    <div className="pl-4 grid grid-cols-[100px_10px_1fr] gap-0.5 text-[8px]">
                                        <div>a. Nomor</div><div>:</div><div>04</div>
                                        <div>b. Tanggal</div><div>:</div><div>18 April 2024</div>
                                        <div>c. Nama Notaris</div><div>:</div><div>H. Wibowo, SH, M.Kn</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">C. Pengurus Badan Usaha</h3>
                            <table className="w-full border-collapse border border-slate-850 text-[8px] text-center">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="border border-slate-850 p-1.5 w-10">No.</th>
                                        <th className="border border-slate-850 p-1.5">Nama</th>
                                        <th className="border border-slate-850 p-1.5">No. Identitas</th>
                                        <th className="border border-slate-850 p-1.5">Jabatan dalam Badan Usaha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-850 p-1.5">1</td>
                                        <td className="border border-slate-850 p-1.5 font-bold text-left">Ir. Budi Santoso</td>
                                        <td className="border border-slate-850 p-1.5">3321041203770001</td>
                                        <td className="border border-slate-850 p-1.5 text-left">Direktur Utama</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-850 p-1.5">2</td>
                                        <td className="border border-slate-850 p-1.5 font-bold text-left">Rahmat Hidayat, SE</td>
                                        <td className="border border-slate-850 p-1.5">3321042508820002</td>
                                        <td className="border border-slate-850 p-1.5 text-left">Komisaris Utama</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">D. Izin Usaha</h3>
                            <div className="pl-2 space-y-1 text-[8px]">
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>1. Surat Izin Berusaha di bidang Jasa Konstruksi</div>
                                    <div>:</div>
                                    <div>a. Nomor: 9120004561239<br />b. Tanggal: 20 September 2021</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>2. Masa berlaku Izin Berusaha</div>
                                    <div>:</div>
                                    <div>Seumur Hidup / Selama Berusaha</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>3. Instansi Penerbit</div>
                                    <div>:</div>
                                    <div>Lembaga OSS / BKPM</div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">E. Sertifikat Badan Usaha</h3>
                            <div className="pl-2 space-y-1 text-[8px]">
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>1. Sertifikat Badan Usaha</div>
                                    <div>:</div>
                                    <div>a. Nomor: SBU-00912-BG009-2023<br />b. Tanggal: 15 Maret 2023</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>2. Masa Berlaku</div>
                                    <div>:</div>
                                    <div>14 Maret 2026 (Diperpanjang s/d 14 Maret 2029)</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>3. Instansi Penerbit</div>
                                    <div>:</div>
                                    <div>LPJK Kementerian PUPR</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>4. Kualifikasi</div>
                                    <div>:</div>
                                    <div>Menengah (M1)</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>5. Klasifikasi</div>
                                    <div>:</div>
                                    <div>BG009</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>6. Sub bidang klasifikasi/layanan</div>
                                    <div>:</div>
                                    <div>BG009 - Konstruksi Gedung Pendidikan</div>
                                </div>
                            </div>
                        </div>

                        {/* PAGE 3 (- 92 -) */}
                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                            <div className="text-right text-[8px] text-slate-400">- 92 -</div>
                            
                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-2">F. Sertifikat Lainnya (apabila disyaratkan)</h3>
                            <div className="pl-2 space-y-1 text-[8px]">
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>1. Sertifikat ISO 9001:2015</div>
                                    <div>:</div>
                                    <div>a. Nomor: ISO-9001-88912<br />b. Tanggal: 10 Okt 2024</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>2. Masa Berlaku</div>
                                    <div>:</div>
                                    <div>09 Oktober 2027</div>
                                </div>
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                    <div>3. Instansi Penerbit</div>
                                    <div>:</div>
                                    <div>PT. SGS Indonesia</div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">G. Data Keuangan</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="font-bold">1. Susunan Kepemilikan Saham (untuk PT) / Susunan Persero (untuk CV/Firma)</div>
                                    <table className="w-full border-collapse border border-slate-850 text-[7px] text-center mt-1">
                                        <thead>
                                            <tr className="bg-slate-50 font-bold">
                                                <th className="border border-slate-850 p-1 w-10">No</th>
                                                <th className="border border-slate-850 p-1">Nama</th>
                                                <th className="border border-slate-850 p-1">No. Identitas</th>
                                                <th className="border border-slate-850 p-1">Alamat</th>
                                                <th className="border border-slate-850 p-1">Persentase</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-slate-850 p-1">1</td>
                                                <td className="border border-slate-850 p-1 text-left font-bold">Ir. Budi Santoso</td>
                                                <td className="border border-slate-850 p-1">3321041203770001</td>
                                                <td className="border border-slate-850 p-1 text-left">Graha Construction Lt. 4, Jakarta</td>
                                                <td className="border border-slate-850 p-1">60%</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-slate-850 p-1">2</td>
                                                <td className="border border-slate-850 p-1 text-left font-bold">Rahmat Hidayat, SE</td>
                                                <td className="border border-slate-850 p-1">3321042508820002</td>
                                                <td className="border border-slate-850 p-1 text-left">Graha Construction Lt. 4, Jakarta</td>
                                                <td className="border border-slate-850 p-1">40%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5 text-[8px] mt-2">
                                    <div className="font-bold">2. Pajak (Nomor Pokok Wajib Pajak)</div>
                                    <div>:</div>
                                    <div className="font-mono font-bold">01.234.567.8-012.000</div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">H. Data Pengalaman Perusahaan (15 Tahun Terakhir)</h3>
                            <table className="w-full border-collapse border border-slate-850 text-[6px] leading-snug text-center">
                                <thead>
                                    <tr className="bg-slate-50 font-bold">
                                        <th className="border border-slate-850 p-1" rowSpan="2">No.</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Nama Paket Pekerjaan</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Sub Klasifikasi</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Ringkasan Lingkup</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Lokasi</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Pemberi Kerja</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Kontrak</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Tgl Selesai / PHO</th>
                                    </tr>
                                    <tr className="bg-slate-50 font-bold">
                                        <th className="border border-slate-850 p-1">Nama</th>
                                        <th className="border border-slate-850 p-1">Alamat/Telp</th>
                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                        <th className="border border-slate-850 p-1">Nilai</th>
                                        <th className="border border-slate-850 p-1">Kontrak</th>
                                        <th className="border border-slate-850 p-1">BA Serah Terima</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-850 p-1">1</td>
                                        <td className="border border-slate-850 p-1 text-left font-bold">Pembangunan Gedung Serbaguna</td>
                                        <td className="border border-slate-850 p-1">BG009</td>
                                        <td className="border border-slate-850 p-1 text-left">Pekerjaan struktur beton & arsitektur gedung</td>
                                        <td className="border border-slate-850 p-1">Kab. Rembang</td>
                                        <td className="border border-slate-850 p-1">Dinas PUPR Rembang</td>
                                        <td className="border border-slate-850 p-1">Jl. Pemuda No. 5</td>
                                        <td className="border border-slate-850 p-1">602/KTR/IV/2025</td>
                                        <td className="border border-slate-850 p-1 text-right">Rp 4.100.000.000</td>
                                        <td className="border border-slate-850 p-1">20 Okt 2025</td>
                                        <td className="border border-slate-850 p-1">BAST-77/X/2025</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">I. Data Pengalaman Perusahaan Dalam Kurun Waktu 4 Tahun Terakhir</h3>
                            <table className="w-full border-collapse border border-slate-850 text-[6px] leading-snug text-center">
                                <thead>
                                    <tr className="bg-slate-50 font-bold">
                                        <th className="border border-slate-850 p-1" rowSpan="2">No.</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Nama Paket Pekerjaan</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Ringkasan Lingkup</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Lokasi</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Pemberi Kerja</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Kontrak</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Tgl Selesai / PHO</th>
                                    </tr>
                                    <tr className="bg-slate-50 font-bold">
                                        <th className="border border-slate-850 p-1">Nama</th>
                                        <th className="border border-slate-850 p-1">Alamat/Telp</th>
                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                        <th className="border border-slate-850 p-1">Nilai</th>
                                        <th className="border border-slate-850 p-1">Kontrak</th>
                                        <th className="border border-slate-850 p-1">BA Serah Terima</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-850 p-1">1</td>
                                        <td className="border border-slate-850 p-1 text-left font-bold">Pembangunan Jaringan Irigasi D.I. Kedung Uling</td>
                                        <td className="border border-slate-850 p-1 text-left">Pembangunan bendung & saluran sekunder beton</td>
                                        <td className="border border-slate-850 p-1">Kab. Grobogan</td>
                                        <td className="border border-slate-850 p-1">Dinas PUPR Grobogan</td>
                                        <td className="border border-slate-850 p-1">Jl. Gajah Mada No. 12</td>
                                        <td className="border border-slate-850 p-1">403/KTR/V/2026</td>
                                        <td className="border border-slate-850 p-1 text-right">Rp 4.250.000.000</td>
                                        <td className="border border-slate-850 p-1">18 Juli 2026</td>
                                        <td className="border border-slate-850 p-1">BAST-21/VII/2026</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* PAGE 4 (- 93 -) */}
                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                            <div className="text-right text-[8px] text-slate-400">- 93 -</div>
                            
                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-2">J. Data Pekerjaan yang Sedang Dilaksanakan (Wajib Diisi untuk Menghitung SKP)</h3>
                            <table className="w-full border-collapse border border-slate-850 text-[6px] leading-snug text-center">
                                <thead>
                                    <tr className="bg-slate-50 font-bold">
                                        <th className="border border-slate-850 p-1" rowSpan="2">No.</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Nama Paket Pekerjaan</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Klasifikasi/Sub Klasifikasi</th>
                                        <th className="border border-slate-850 p-1" rowSpan="2">Lokasi</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Pemberi Kerja</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Kontrak</th>
                                        <th className="border border-slate-850 p-1" colSpan="2">Total Progres</th>
                                    </tr>
                                    <tr className="bg-slate-50 font-bold">
                                        <th className="border border-slate-850 p-1">Nama</th>
                                        <th className="border border-slate-850 p-1">Alamat/Telp</th>
                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                        <th className="border border-slate-850 p-1">Nilai</th>
                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                        <th className="border border-slate-850 p-1">Total Nilai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-850 p-1">1</td>
                                        <td className="border border-slate-850 p-1 text-left font-bold">Gedung Laboratorium Terpadu UNS</td>
                                        <td className="border border-slate-850 p-1">BG009</td>
                                        <td className="border border-slate-850 p-1">Kota Surakarta</td>
                                        <td className="border border-slate-850 p-1">UNS Surakarta</td>
                                        <td className="border border-slate-850 p-1">Jl. Ir. Sutami 36</td>
                                        <td className="border border-slate-850 p-1">02/KTR-UNS/2026</td>
                                        <td className="border border-slate-850 p-1 text-right">Rp 12.800.000.000</td>
                                        <td className="border border-slate-850 p-1">Progres 80%</td>
                                        <td className="border border-slate-850 p-1 text-right">Rp 10.240.000.000</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="pt-4 text-justify text-[7.5px] leading-relaxed">
                                Demikian Formulir Isian Kualifikasi ini saya buat dengan sebenarnya dan penuh rasa tanggung jawab. Jika dikemudian hari ditemui bahwa data/dokumen yang saya sampaikan tidak benar dan/atau ada pemalsuan, maka badan usaha yang saya wakili bersedia dikenakan sanksi berupa sanksi administratif, sanksi pencantuman dalam Daftar Hitam, gugatan secara perdata, dan/atau pelaporan secara pidana kepada pihak berwenang sesuai dengan ketentuan peraturan perundang-undangan.
                            </div>

                            {/* Signature Block */}
                            <div className="pt-6 flex justify-between text-[8px]">
                                <div></div>
                                <div className="text-center w-60 space-y-6">
                                    <div>
                                        Jakarta, 19 Juli 2026<br />
                                        <span className="font-bold">PT. MAJU KONSTRUKSI</span>
                                    </div>
                                    <div className="border border-slate-350 w-24 mx-auto p-1 text-[6px] text-slate-400 border-dashed">
                                        Meterai Rp10.000,00 dan Tanda Tangan
                                    </div>
                                    <div>
                                        <span className="font-bold underline text-[9px]">Ir. Budi Santoso</span><br />
                                        Direktur Utama
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SUB-TAB 4: KSO & KOLABORATOR (RBAC) */}
            {kualifikasiSubTab === 'kso' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* KSO Connection Panel */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                <Users size={16} className="text-indigo-600" /> Penautan & Integrasi Rekanan KSO
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <label className={LABEL}>Pilih Rekanan KSO (Dari Direktori Global)</label>
                                    <select 
                                        className={SELECT_STYLE + " w-full"}
                                        value={selectedKsoPartnerId}
                                        onChange={e => {
                                            setSelectedKsoPartnerId(e.target.value);
                                            setKsoModalShare(0); // Reset share until synced from doc
                                            setKsoShareStatus('Unsynced');
                                        }}
                                    >
                                        <option value="">-- Pilih Rekanan KSO --</option>
                                        {ksoPartnersList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                                    </select>
                                </div>

                                {selectedKsoPartnerId && (
                                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3.5 animate-in zoom-in-95 duration-150">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Porsi Kepemilikan KSO</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                                                ${ksoShareStatus === 'Synced' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                                                {ksoShareStatus}
                                            </span>
                                        </div>

                                        {ksoShareStatus === 'Unsynced' ? (
                                            <div className="space-y-2">
                                                <p className="text-[10px] text-rose-600 font-bold leading-relaxed">
                                                    Persentase porsi modal KSO belum ditarik dari dokumen administrasi (Surat Perjanjian KSO).
                                                </p>
                                                <button 
                                                    onClick={() => {
                                                        setKsoModalShare(40); // 40% KSO share pulled
                                                        setKsoShareStatus('Synced');
                                                        setAiLogs(logs => [...logs, { time: "09:45", agent: "Sistem Penyusunan", msg: "Sinkronisasi porsi modal KSO (Leader: 60%, Member: 40%) dari berkas administrasi berhasil." }]);
                                                    }}
                                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition-all"
                                                >
                                                    Hubungkan Porsi Modal KSO (Tarik dari Administrasi)
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2 animate-in fade-in duration-200">
                                                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                                                    <div>Leader (PT. Maju Konstruksi):</div>
                                                    <div className="text-right text-slate-900">60%</div>
                                                    <div>Mitra ({ksoPartnersList.find(x => x.id === selectedKsoPartnerId)?.nama}):</div>
                                                    <div className="text-right text-slate-900">40%</div>
                                                </div>
                                                
                                                {/* Combined calculations box */}
                                                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[10px] text-slate-500 font-semibold">
                                                    <div className="text-slate-800 font-bold">Rasio KD & SKP Gabungan KSO:</div>
                                                    <div>KD Gabungan KSO: Rp 6.100.000.000,00</div>
                                                    <div className="text-[9px] text-slate-400 italic">Rumus: KD_Leader + (Porsi_Member / Porsi_Leader) * KD_Member</div>
                                                    <div className="text-emerald-600 font-bold">Evaluasi KSO: LOLOS (KD Gabungan KSO &gt; HPS)</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RBAC Simulation Panel */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                <Lock size={16} className="text-blue-600" /> Simulasi Hak Akses Kolaborator (RBAC)
                            </h3>
                            
                            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                Uji batasan hak akses portal untuk kolaborator eksternal atau staf khusus Anda:
                            </p>

                            <div className="space-y-2.5">
                                {[
                                    { role: 'owner', label: 'Login sebagai Pemilik Akun / Admin Utama', desc: 'Akses penuh ke seluruh menu dan workspace' },
                                    { role: 'estimator', label: 'Login sebagai Staf Estimator (RBAC)', desc: 'Hanya diizinkan mengakses menu RAB & BOQ Workspace' },
                                    { role: 'partner', label: 'Login sebagai Rekanan KSO Partner (RBAC)', desc: 'Hanya dapat memperbarui berkas kualifikasi internal rekanan' }
                                ].map(item => (
                                    <button
                                        key={item.role}
                                        onClick={() => {
                                            setSimulatedRole(item.role);
                                            if (item.role === 'estimator') {
                                                setSubTab('rab');
                                            } else if (item.role === 'partner') {
                                                setSubTab('kualifikasi');
                                                setKualifikasiSubTab('validation');
                                            }
                                        }}
                                        className={`w-full p-3 text-left border rounded-xl transition-all cursor-pointer flex flex-col gap-0.5
                                            ${simulatedRole === item.role 
                                                ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/10' 
                                                : 'bg-white hover:bg-slate-100 border-slate-200'}`}
                                    >
                                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                                        <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
