import React, { useState } from 'react';
import { 
    ShieldCheck, FileSignature, Settings2, Calculator, 
    Plus, Info, ChevronDown, Trash2, FolderOutput, 
    FileText, X, Check, FileCheck
} from 'lucide-react';
import { useDialogA11y } from '../hooks/ui/useDialogA11y';

const INPUT = "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400";
const SELECT = "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer";
const LABEL = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

import { requirementsDB as initialRequirementsDB } from '../data/mock/tenderBaru';
import { useTenderBaru } from '../hooks/tenderBaru/useTenderBaru';


export default function TenderBaru({ setActiveRoute }) {
    const {
        requirementsDB, setRequirementsDB,
        openSections, setOpenSections,
        isDocumentUploaded, setIsDocumentUploaded,
        isExtracting, setIsExtracting,
        extractionProgress, setExtractionProgress,
        isModalOpen, setIsModalOpen,
        targetSection, setTargetSection,
        subType, setSubType,
        modalForm, setModalForm,
        actions: {
            toggle,
            deleteItem,
            handleFormChange,
            startExtraction,
            openModalForSection,
            saveRequirement
        }
    } = useTenderBaru();

    const { dialogRef } = useDialogA11y(isModalOpen, () => setIsModalOpen(false));

    const totalReqs = Object.values(requirementsDB).reduce((a, b) => a + b.length, 0);

    const AccordionSection = ({ id, icon: Icon, color, title, isOpen, children }) => (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/50 border-b border-slate-100">
                <button onClick={() => toggle(id)} className="flex flex-1 items-center gap-3 text-left cursor-pointer focus:outline-none">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}><Icon size={16} className="text-white" /></div>
                    <span className="font-bold text-sm text-slate-800">{title}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <button 
                    onClick={(e) => openModalForSection(id, e)} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg transition-all cursor-pointer shadow-sm ml-4"
                >
                    <Plus size={13} /> Tambah Syarat
                </button>
            </div>
            {isOpen && <div className="border-t border-slate-100 bg-white">{children}</div>}
        </div>
    );

    const ChecklistItem = ({ item, category }) => (
        <div className="flex items-start gap-3.5 px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
            <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 cursor-not-allowed" checked readOnly />
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 mb-0.5">{item.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed mb-2">{item.desc}</div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-500">
                    <FileText size={10} /> {item.ref}
                </span>
            </div>
            <button onClick={() => deleteItem(category, item.id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 cursor-pointer"><Trash2 size={15} /></button>
        </div>
    );

    const DataTable = ({ title, headers, rows, category }) => (
        <div className="px-5 py-4 border-b border-slate-100 last:border-0">
            <div className="text-sm font-bold text-slate-700 mb-3">{title}</div>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead><tr className="bg-slate-50 border-b border-slate-200">
                        {headers.map((h, i) => <th key={i} className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>)}
                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-14 text-center">Aksi</th>
                    </tr></thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 text-slate-500 w-10">{idx + 1}</td>
                                {row.cells.map((c, i) => <td key={i} className="px-4 py-3 text-slate-700 font-medium">{c}</td>)}
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => deleteItem(category, row.id)} className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    if (!isDocumentUploaded) {
        return (
            <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
                {/* Header */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-slate-800">Mode Pembaca Persyaratan Dokumen Tender Baru</h1>
                            <p className="text-xs text-slate-500 font-medium">Unggah berkas LDP/LDK PDF dan tautkan halaman SPSE untuk diekstraksi otomatis.</p>
                        </div>
                    </div>
                </div>

                {/* Onboarding Guide Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 space-y-3.5 shadow-sm">
                    <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Info size={14} /> Panduan Onboarding Pengisian Tender Baru
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-600 text-xs">
                        <div className="p-3.5 bg-white/90 rounded-xl border border-blue-100/50 space-y-1.5 shadow-sm">
                            <div className="font-bold text-blue-800 flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">1</span> Salin URL SPSE</div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Cari tender Anda di portal LPSE pemerintah, lalu salin URL halaman Pengumuman Lelang resmi (misal: <code>https://spse.inaproc.id/...</code>).</p>
                        </div>
                        <div className="p-3.5 bg-white/90 rounded-xl border border-blue-100/50 space-y-1.5 shadow-sm">
                            <div className="font-bold text-blue-800 flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">2</span> Unggah PDF LDP/LDK</div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Unduh Dokumen Pemilihan (PDF LDP/LDK) dari portal SPSE, kemudian seret berkas tersebut ke area dropzone di bawah.</p>
                        </div>
                        <div className="p-3.5 bg-white/90 rounded-xl border border-blue-100/50 space-y-1.5 shadow-sm">
                            <div className="font-bold text-blue-800 flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">3</span> Ekstraksi AI</div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">Klik tombol ekstraksi. AI akan memindai halaman SPSE & berkas LDP untuk menyusun daftar syarat penawaran secara instan.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={startExtraction} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                    {/* SPSE URL Announcement Input */}
                    <div>
                        <label className={LABEL}>URL Halaman Pengumuman Tender pada SPSE</label>
                        <input 
                            type="url" 
                            className={INPUT} 
                            placeholder="Contoh: https://spse.inaproc.id/pu/lelang/10150966000/pengumumanlelang"
                            value={spseUrl}
                            onChange={e => setSpseUrl(e.target.value)}
                            required
                        />
                        <span className="block text-[9px] text-slate-400 mt-1 font-medium">Link pengumuman SPSE digunakan AI untuk menarik data jadwal, HPS, dan rincian kualifikasi utama.</span>
                    </div>

                    {/* Drag Zone */}
                    <div>
                        <label className={LABEL}>Unggah Berkas Dokumen Pemilihan (LDP / LDK PDF)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer">
                            <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
                                <FolderOutput size={22} className="rotate-90" />
                            </div>
                            <h3 className="text-xs font-bold text-slate-700">Seret & Letakkan File LDP/LDK PDF Di Sini</h3>
                            <p className="text-[10px] text-slate-400 mt-1">atau klik untuk memilih file dari komputer Anda (Maks. 25MB)</p>
                        </div>
                    </div>



                    {isExtracting && (
                        <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                            <div className="flex justify-between text-xs text-slate-500 font-semibold">
                                <span>AI Scanner sedang mengekstraksi persyaratan dari berkas LDP & URL SPSE...</span>
                                <span>{extractionProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${extractionProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isExtracting}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all disabled:opacity-50"
                    >
                        {isExtracting ? "Sedang Menganalisis Dokumen & URL SPSE..." : "Mulai Ekstraksi AI & Baca Persyaratan"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* AI Banner */}
            <div className="flex items-start gap-3 p-4 mb-6 bg-amber-50 border border-amber-200 rounded-xl shadow-sm animate-in fade-in duration-200">
                <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <div className="text-sm font-bold text-amber-800 mb-0.5">AI dapat melakukan kesalahan — harap cek ulang daftar persyaratan.</div>
                    <div className="text-xs text-amber-700/80">Daftar persyaratan di bawah diekstraksi dari dokumen pemilihan. Validasi setiap item sebelum melanjutkan.</div>
                </div>
            </div>

            {/* Project Info Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 mb-1">{uploadForm.name}</h1>
                            <div className="text-xs text-slate-500 font-medium">ID RUP: {uploadForm.idRup}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nilai HPS</div>
                            <div className="text-xl font-black text-emerald-600">Rp {Number(uploadForm.hps).toLocaleString('id-ID', { minimumFractionDigits: 2 })}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 pt-5 border-t border-slate-100">
                        {[
                            ['Nama Pokja Pemilihan', uploadForm.pokja],
                            ['Alamat Pokja', 'Bagian PBJ, Setda Kab. Rembang'],
                            ['Lokasi Pekerjaan', uploadForm.lokasi],
                            ['Sumber Dana', 'APBD Kab. Rembang 2026'],
                            ['Jadwal Pelaksanaan', '150 Hari Kalender'],
                            ['Sistem Evaluasi', 'Pascakualifikasi, Harga Terendah'],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</div>
                                <div className="text-sm font-semibold text-slate-700">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-800">Database Persyaratan Tender</h2>
                    </div>

                    <AccordionSection id="kualifikasi" icon={ShieldCheck} color="bg-blue-600" title="A. Persyaratan Kualifikasi" isOpen={openSections.kualifikasi}>
                        {requirementsDB.kualifikasi.map(item => <ChecklistItem key={item.id} item={item} category="kualifikasi" />)}
                    </AccordionSection>

                    <AccordionSection id="administrasi" icon={FileSignature} color="bg-purple-600" title="B. Persyaratan Administrasi" isOpen={openSections.administrasi}>
                        {requirementsDB.administrasi.map(item => <ChecklistItem key={item.id} item={item} category="administrasi" />)}
                    </AccordionSection>

                    <AccordionSection id="teknis" icon={Settings2} color="bg-emerald-600" title="C. Persyaratan Teknis & RKK" isOpen={openSections.teknis}>
                        <DataTable title="1. Personel Manajerial" headers={['No', 'Jabatan', 'Sertifikat/SKK', 'Pengalaman', 'Ref']} category="personel"
                            rows={requirementsDB.personel.map((p) => ({ id: p.id, cells: [p.jabatan, p.skk, `${p.pengalaman} Tahun`, p.ref] }))} />
                        <DataTable title="2. Peralatan Utama" headers={['No', 'Jenis Alat', 'Kapasitas', 'Jumlah', 'Ref']} category="peralatan"
                            rows={requirementsDB.peralatan.map((p) => ({ id: p.id, cells: [p.jenis, p.kapasitas, `${p.jumlah} Unit`, p.ref] }))} />
                        <DataTable title="3. RKK (Rencana Keselamatan Konstruksi)" headers={['No', 'Uraian Pekerjaan', 'Identifikasi Bahaya', 'Ref']} category="rkk"
                            rows={requirementsDB.rkk.map((r) => ({ id: r.id, cells: [r.uraian, r.bahaya, r.ref] }))} />
                        <div className="px-5 py-3 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">Syarat Teknis Lainnya</div>
                        {requirementsDB.teknis_umum.map(item => <ChecklistItem key={item.id} item={item} category="teknis_umum" />)}
                    </AccordionSection>

                    <AccordionSection id="harga" icon={Calculator} color="bg-amber-600" title="D. Persyaratan Harga" isOpen={openSections.harga}>
                        {requirementsDB.harga.map(item => <ChecklistItem key={item.id} item={item} category="harga" />)}
                    </AccordionSection>

                    <AccordionSection id="dokumen_lain" icon={FileCheck} color="bg-rose-600" title="E. Dokumen Lainnya" isOpen={openSections.dokumen_lain}>
                        {requirementsDB.dokumen_lain.map(item => <ChecklistItem key={item.id} item={item} category="dokumen_lain" />)}
                    </AccordionSection>
                </div>

                {/* Right Column */}
                <div>
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm sticky top-6">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-5">
                            <FolderOutput size={18} className="text-blue-600" /> Ringkasan Kesiapan
                        </h3>
                        <div className="text-center py-5 mb-5 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-4xl font-black text-slate-900">{totalReqs}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Syarat Teridentifikasi</div>
                        </div>
                        <div className="space-y-2 text-xs mb-5">
                            {[
                                ['Kualifikasi', requirementsDB.kualifikasi.length, 'bg-blue-600'],
                                ['Administrasi', requirementsDB.administrasi.length, 'bg-purple-600'],
                                ['Teknis', requirementsDB.teknis_umum.length + requirementsDB.personel.length + requirementsDB.peralatan.length + requirementsDB.rkk.length, 'bg-emerald-600'],
                                ['Harga', requirementsDB.harga.length, 'bg-amber-600'],
                                ['Dokumen Lainnya', requirementsDB.dokumen_lain.length, 'bg-rose-600'],
                            ].map(([label, count, bg]) => (
                                <div key={label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${bg}`}></div><span className="font-medium text-slate-600">{label}</span></div>
                                    <span className="font-bold text-slate-800">{count}</span>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => {
                                alert("Workspace Tender sukses dibuat! Persyaratan kualifikasi, administrasi, teknis, dan harga telah diatur. Silakan akses di halaman 'Tender Aktif' untuk mulai berkolaborasi.");
                                setIsDocumentUploaded(false); // Reset to default upload mode
                                setActiveRoute('tender-aktif');
                            }} 
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg shadow-md transition-all cursor-pointer"
                        >
                            <FolderOutput size={16} /> Buat Workspace Tender
                        </button>
                    </div>
                </div>
            </div>

            {/* ========== MODAL ========== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"></div>
                    <div 
                        ref={dialogRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tender-modal-title"
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 outline-none" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 id="tender-modal-title" className="text-base font-bold text-slate-800">
                                Tambah Persyaratan {targetSection === 'dokumen_lain' ? 'Dokumen Lainnya' : targetSection.charAt(0).toUpperCase() + targetSection.slice(1)}
                            </h3>
                            <button aria-label="Tutup Dialog" onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"><X size={18} /></button>
                        </div>
                        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
                            
                            {/* If Teknis, choose sub-type first */}
                            {targetSection === 'teknis' && (
                                <div>
                                    <label className={LABEL}>Sub Kategori Persyaratan</label>
                                    <select className={SELECT} value={subType} onChange={e => setSubType(e.target.value)}>
                                        <option value="personel">Personel Manajerial</option>
                                        <option value="peralatan">Peralatan Utama</option>
                                        <option value="rkk">Rencana Keselamatan Kerja (RKK)</option>
                                        <option value="umum">Syarat Teknis Umum (Metode/RMPK/Lab/dll)</option>
                                    </select>
                                </div>
                            )}

                            {/* Dynamically render fields based on section and subType */}
                            {targetSection === 'teknis' && subType === 'personel' && (
                                <div className="space-y-4 pt-2">
                                    <div>
                                        <label className={LABEL}>Jabatan / Posisi</label>
                                        <input className={INPUT} name="jabatan" value={modalForm.jabatan} onChange={handleFormChange} placeholder="Cth: Site Manager" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={LABEL}>Sertifikat / SKK</label>
                                            <input className={INPUT} name="skk" value={modalForm.skk} onChange={handleFormChange} placeholder="Cth: SKK Pelaksana Bangunan" />
                                        </div>
                                        <div>
                                            <label className={LABEL}>Pengalaman Min. (Tahun)</label>
                                            <input type="number" className={INPUT} name="pengalaman" value={modalForm.pengalaman} onChange={handleFormChange} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {targetSection === 'teknis' && subType === 'peralatan' && (
                                <div className="space-y-4 pt-2">
                                    <div>
                                        <label className={LABEL}>Jenis Alat</label>
                                        <input className={INPUT} name="jenisAlat" value={modalForm.jenisAlat} onChange={handleFormChange} placeholder="Cth: Dump Truck" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={LABEL}>Kapasitas Alat</label>
                                            <input className={INPUT} name="kapasitasAlat" value={modalForm.kapasitasAlat} onChange={handleFormChange} placeholder="Cth: 4 m³" />
                                        </div>
                                        <div>
                                            <label className={LABEL}>Jumlah (Unit)</label>
                                            <input type="number" className={INPUT} name="jumlahAlat" value={modalForm.jumlahAlat} onChange={handleFormChange} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {targetSection === 'teknis' && subType === 'rkk' && (
                                <div className="space-y-4 pt-2">
                                    <div>
                                        <label className={LABEL}>Uraian Pekerjaan</label>
                                        <input className={INPUT} name="uraianPekerjaan" value={modalForm.uraianPekerjaan} onChange={handleFormChange} placeholder="Cth: Pekerjaan Beton Pondasi" />
                                    </div>
                                    <div>
                                        <label className={LABEL}>Identifikasi Bahaya</label>
                                        <textarea className={INPUT} name="identifikasiBahaya" value={modalForm.identifikasiBahaya} onChange={handleFormChange} rows={2} placeholder="Cth: Bahaya terperosok ke galian, debu semen..." />
                                    </div>
                                </div>
                            )}

                            {/* Default title / desc for general inputs (Kualifikasi, Administrasi, Harga, Dokumen Lainnya, Teknis Umum) */}
                            {((targetSection !== 'teknis') || (targetSection === 'teknis' && subType === 'umum')) && (
                                <div className="space-y-4">
                                    <div>
                                        <label className={LABEL}>Nama Persyaratan / Dokumen</label>
                                        <input className={INPUT} name="judul" value={modalForm.judul} onChange={handleFormChange} placeholder={targetSection === 'dokumen_lain' ? "Cth: Pakta Integritas" : "Cth: Jaminan Penawaran Asli"} />
                                    </div>
                                    <div>
                                        <label className={LABEL}>Keterangan / Rincian</label>
                                        <textarea className={INPUT} name="desc" value={modalForm.desc} onChange={handleFormChange} rows={3} placeholder="Jelaskan deskripsi persyaratan yang dipersyaratkan..." />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className={LABEL}>Referensi Dokumen Pemilihan</label>
                                <input className={INPUT} name="ref" value={modalForm.ref} onChange={handleFormChange} placeholder="Cth: LDP Hal X atau IKP Pasal Y" />
                            </div>

                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">Batal</button>
                            <button onClick={saveRequirement} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"><Check size={15} /> Simpan Syarat</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
