import React, { useState, useEffect } from 'react';
import { Sparkles, Printer, Send, FileText, CheckCircle2, QrCode, Settings, Type, Edit3, Wand2, User, Search, MapPin, AlignLeft, Bold, Italic, Underline, Shield, Table, Plus, Trash2 } from 'lucide-react';

const INPUT_STYLE = "px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
const SELECT_STYLE = "px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer";
const LABEL = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

export default function SuratMenyurat({ setActiveRoute }) {
    // Dummy Data
    const tenders = [
        { id: 'T001', namaPaket: "Hibah Barang Pembangunan Gedung PGRI Rembang", pokja: "Pokja Pemilihan Hibah Barang Gedung PGRI" },
        { id: 'T002', namaPaket: "Pembangunan Jalan Poros Desa", pokja: "Pokja Konstruksi Kab. Rembang" },
        { id: 'T003', namaPaket: "Rehabilitasi Jaringan Irigasi", pokja: "Pokja SDA Kementerian PUPR" }
    ];
    
    const supplierDirectory = [
        { id: 'R001', nama: "PT. Konstruksi Hebat", pic: "Bpk. Hendra", type: "Mitra KSO", alamat: "Jl. Industri Raya No. 12, Semarang" },
        { id: 'R002', nama: "CV. Baja Nusantara", pic: "Ibu Ratna", type: "Supplier", alamat: "Kawasan Industri Kendal, Jawa Tengah" },
        { id: 'R003', nama: "PT. Bumi Alat Berat", pic: "Bpk. Tommy", type: "Subkontraktor", alamat: "Jl. Soekarno Hatta No. 45, Demak" },
    ];

    const [documentType, setDocumentType] = useState('permohonan');
    const [recipientMode, setRecipientMode] = useState('direktori');
    const [tenderMode, setTenderMode] = useState('pilih');
    const [selectedTenderId, setSelectedTenderId] = useState(tenders[0].id);
    const [manualTender, setManualTender] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(supplierDirectory[1].id);
    const [requestLetterNo, setRequestLetterNo] = useState("015/SP-MK/VII/2026");
    const [showPoweredBy, setShowPoweredBy] = useState(true);
    
    // Table Editor State
    const [showTableEditor, setShowTableEditor] = useState(false);
    const [tableData, setTableData] = useState({
        headers: ['No', 'Uraian Barang/Jasa', 'Kuantitas', 'Keterangan'],
        rows: [
            ['1', 'Baja Tulangan U32', '1000 kg', 'Sesuai SNI'],
            ['2', 'Semen Portland', '500 zak', 'Kualitas 1']
        ]
    });
    
    // Manual Recipient State
    const [manualRecipient, setManualRecipient] = useState({ nama: '', jabatan: 'Pimpinan', alamat: '' });

    // AI & Editor State
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [fontFamily, setFontFamily] = useState('font-serif');
    const [letterContent, setLetterContent] = useState('');
    const [zoom, setZoom] = useState(0.7); // 70% default zoom so it fits without vertical scroll

    const activeTender = tenderMode === 'pilih' ? tenders.find(t => t.id === selectedTenderId) : { namaPaket: manualTender, pokja: 'Pokja Pemilihan' };
    const activeSupplier = recipientMode === 'direktori' ? supplierDirectory.find(s => s.id === selectedSupplier) : null;

    // Derived Recipient Info
    const recipientName = recipientMode === 'direktori' ? activeSupplier?.nama : manualRecipient.nama;
    const recipientTitle = recipientMode === 'direktori' ? 'Pimpinan' : manualRecipient.jabatan;
    const recipientAddress = recipientMode === 'direktori' ? activeSupplier?.alamat : manualRecipient.alamat;

    // Update default content when document type changes
    useEffect(() => {
        let defaultContent = '';
        if (documentType === 'permohonan') {
            defaultContent = `Dengan hormat,

Sehubungan dengan keikutsertaan kami dalam proses tender pengadaan pekerjaan konstruksi yang diselenggarakan oleh Pokja Pemilihan, dengan rincian paket sebagai berikut:

Nama Paket : ${activeTender?.namaPaket || '[NAMA PAKET]'}
Sistem : Tender Umum / Pasca Kualifikasi

Maka melalui surat ini, kami memohon kesediaan Perusahaan Bapak/Ibu untuk dapat menerbitkan Surat Dukungan guna memenuhi persyaratan teknis dalam tender tersebut. Demikian permohonan ini, atas perhatiannya diucapkan terima kasih.`;
        } else if (documentType === 'pakta') {
            defaultContent = `Saya yang bertanda tangan di bawah ini, selaku pimpinan perusahaan, menyatakan dengan sesungguhnya bahwa:

1. Tidak akan melakukan praktik Korupsi, Kolusi, dan Nepotisme (KKN).
2. Akan melaporkan kepada APIP atau LKPP apabila mengetahui ada indikasi KKN dalam proses tender ${activeTender?.namaPaket || '[NAMA PAKET]'}.
3. Akan mengikuti proses pengadaan secara bersih, transparan, dan profesional untuk memberikan hasil kerja terbaik sesuai ketentuan peraturan perundang-undangan.

Apabila melanggar hal-hal tersebut di atas, kami siap menerima sanksi sesuai dengan peraturan yang berlaku.`;
        } else if (documentType === 'kustom') {
            defaultContent = `Ketik isi surat Anda di sini...`;
        }
        setLetterContent(defaultContent);
    }, [documentType, activeTender]);

    const handleGenerateAI = () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        setTimeout(() => {
            setLetterContent(`[Dihasilkan oleh AI Draft]nnMenindaklanjuti rencana pelaksanaan pekerjaan ${activeTender?.namaPaket || 'tersebut'}, ${aiPrompt}. nnOleh karena itu, kami berharap dapat menjadwalkan pertemuan lanjutan untuk membahas rincian spesifikasi teknis dan lini masa pengiriman material ke lokasi site.nnDemikian kami sampaikan, atas kerja sama yang baik, kami ucapkan terima kasih.`);
            setIsGenerating(false);
            setAiPrompt('');
        }, 1500);
    };

    const handleAddRow = () => {
        const newRow = Array(tableData.headers.length).fill('');
        setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
    };

    const handleAddColumn = () => {
        setTableData({
            headers: [...tableData.headers, `Kolom ${tableData.headers.length + 1}`],
            rows: tableData.rows.map(row => [...row, ''])
        });
    };

    const handleHeaderChange = (index, value) => {
        const newHeaders = [...tableData.headers];
        newHeaders[index] = value;
        setTableData({ ...tableData, headers: newHeaders });
    };

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newRows = [...tableData.rows];
        newRows[rowIndex][colIndex] = value;
        setTableData({ ...tableData, rows: newRows });
    };

    const handleRemoveRow = (rowIndex) => {
        if (tableData.rows.length <= 1) return;
        const newRows = tableData.rows.filter((_, i) => i !== rowIndex);
        setTableData({ ...tableData, rows: newRows });
    };

    const handleRemoveColumn = (colIndex) => {
        if (tableData.headers.length <= 1) return;
        const newHeaders = tableData.headers.filter((_, i) => i !== colIndex);
        const newRows = tableData.rows.map(row => row.filter((_, i) => i !== colIndex));
        setTableData({ headers: newHeaders, rows: newRows });
    };

    const insertTablePlaceholder = () => {
        setLetterContent(prev => prev + '\n\n{{tabel}}\n\n');
        setShowTableEditor(true);
    };

    const renderTableHtml = () => {
        if (!showTableEditor) return null;
        return (
            <div className="my-6 w-full overflow-hidden border border-slate-300 rounded">
                <table className="w-full text-left border-collapse text-[11px] font-sans">
                    <thead>
                        <tr className="bg-slate-100">
                            {tableData.headers.map((h, i) => (
                                <th key={i} className="border-b border-slate-300 px-3 py-2 font-bold text-slate-800">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-slate-200 last:border-0">
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex} className="px-3 py-2 text-slate-700">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Mock Hash for QR
    const qrHash = "a3f9b2c8d1e4f6a7b8c9d0e1f2a3b4c5";
    const verificationUrl = `trust.teamtender.id/verify/${qrHash.substring(0,8)}`;

    return (
        <div className="w-full space-y-6 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Edit3 className="text-blue-600" /> Smart Document Editor
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Buat berbagai jenis dokumen, atur penerima fleksibel, atau minta AI menuliskan draf untuk Anda.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col xl:flex-row h-[80vh]">
                {/* Panel Kiri: Pengaturan & Editor */}
                <div className="w-full xl:w-[400px] border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
                    
                    <div className="p-5 border-b border-slate-200 bg-white">
                        <label className={LABEL}>Jenis Dokumen</label>
                        <select 
                            className={SELECT_STYLE + " w-full font-bold text-slate-800 bg-slate-50 text-sm"}
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                        >
                            <option value="permohonan">Surat Permohonan Dukungan</option>
                            <option value="pakta">Pakta Integritas</option>
                            <option value="kustom">Surat Kustom Bebas</option>
                        </select>
                    </div>

                    <div className="p-5 overflow-y-auto flex-1 space-y-6">
                        
                        {/* Section AI Drafter */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                            <h3 className="text-[11px] font-bold text-indigo-800 flex items-center gap-1.5 mb-3">
                                <Sparkles size={14} className="text-indigo-500" /> AI Letter Drafter
                            </h3>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Contoh: Buatkan surat undangan survey lapangan..." 
                                    className="flex-1 px-3 py-2 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={aiPrompt}
                                    onChange={e => setAiPrompt(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleGenerateAI()}
                                />
                                <button 
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating || !aiPrompt.trim()}
                                    className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                                >
                                    {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Wand2 size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Detail Proyek & Meta */}
                        <div className="space-y-4">
                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                <div className="flex bg-slate-100 p-1 border-b border-slate-200">
                                    <button 
                                        className={`flex-1 py-1.5 text-xs font-bold rounded ${tenderMode === 'pilih' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        onClick={() => setTenderMode('pilih')}
                                    >
                                        Pilih Tender
                                    </button>
                                    <button 
                                        className={`flex-1 py-1.5 text-xs font-bold rounded ${tenderMode === 'manual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        onClick={() => setTenderMode('manual')}
                                    >
                                        Kustom
                                    </button>
                                </div>
                                <div className="p-4 space-y-2">
                                    <label className={LABEL}>Referensi Paket Tender</label>
                                    {tenderMode === 'pilih' ? (
                                        <select className={SELECT_STYLE + " w-full"} value={selectedTenderId} onChange={(e) => setSelectedTenderId(e.target.value)}>
                                            {tenders.map(t => <option key={t.id} value={t.id}>{t.namaPaket}</option>)}
                                        </select>
                                    ) : (
                                        <input type="text" placeholder="Masukkan nama paket tender manual..." className={INPUT_STYLE + " w-full"} value={manualTender} onChange={e => setManualTender(e.target.value)} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className={LABEL}>Nomor Surat</label>
                                <input type="text" className={INPUT_STYLE + " w-full font-mono font-bold"} value={requestLetterNo} onChange={e => setRequestLetterNo(e.target.value)} />
                            </div>
                        </div>

                        {/* Penerima Fleksibel */}
                        {documentType !== 'pakta' && (
                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                <div className="flex bg-slate-100 p-1 border-b border-slate-200">
                                    <button 
                                        className={`flex-1 py-1.5 text-xs font-bold rounded ${recipientMode === 'direktori' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        onClick={() => setRecipientMode('direktori')}
                                    >
                                        Pilih Direktori
                                    </button>
                                    <button 
                                        className={`flex-1 py-1.5 text-xs font-bold rounded ${recipientMode === 'manual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        onClick={() => setRecipientMode('manual')}
                                    >
                                        Input Manual
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recipientMode === 'direktori' ? (
                                        <select className={SELECT_STYLE + " w-full"} value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
                                            {supplierDirectory.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
                                        </select>
                                    ) : (
                                        <>
                                            <input type="text" placeholder="Nama Instansi / Perusahaan" className={INPUT_STYLE + " w-full"} value={manualRecipient.nama} onChange={e => setManualRecipient({...manualRecipient, nama: e.target.value})} />
                                            <input type="text" placeholder="Jabatan (Opsional)" className={INPUT_STYLE + " w-full"} value={manualRecipient.jabatan} onChange={e => setManualRecipient({...manualRecipient, jabatan: e.target.value})} />
                                            <input type="text" placeholder="Alamat (Opsional)" className={INPUT_STYLE + " w-full"} value={manualRecipient.alamat} onChange={e => setManualRecipient({...manualRecipient, alamat: e.target.value})} />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Editor Konten Surat */}
                        <div className="space-y-2">
                            <label className={LABEL}>Isi Surat / Badan Dokumen</label>
                            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white flex flex-col">
                                <div className="bg-slate-50 p-2 border-b border-slate-200 flex items-center gap-2">
                                    <select className="text-xs bg-transparent font-medium text-slate-700 outline-none cursor-pointer" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                                        <option value="font-serif">Serif (Formal)</option>
                                        <option value="font-sans">Sans-Serif (Modern)</option>
                                    </select>
                                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                                    <button className="p-1 hover:bg-slate-200 rounded text-slate-600"><Bold size={14}/></button>
                                    <button className="p-1 hover:bg-slate-200 rounded text-slate-600"><Italic size={14}/></button>
                                    <button className="p-1 hover:bg-slate-200 rounded text-slate-600"><Underline size={14}/></button>
                                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                                    <button 
                                        onClick={() => setShowTableEditor(!showTableEditor)}
                                        className={`p-1 rounded flex items-center gap-1 text-xs font-bold transition-colors ${showTableEditor ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-200 text-slate-600'}`}
                                        title="Sisipkan Tabel"
                                    >
                                        <Table size={14}/> Tabel
                                    </button>
                                    {showTableEditor && !letterContent.includes('{{tabel}}') && (
                                        <button onClick={insertTablePlaceholder} className="text-[10px] text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded border border-blue-200 ml-1">
                                            Sisipkan {'{{tabel}}'} di teks
                                        </button>
                                    )}
                                </div>
                                <textarea 
                                    className="w-full h-40 p-3 text-xs text-slate-800 focus:outline-none resize-none leading-relaxed"
                                    value={letterContent}
                                    onChange={(e) => setLetterContent(e.target.value)}
                                ></textarea>
                            </div>
                            
                            {/* Mini Table Editor */}
                            {showTableEditor && (
                                <div className="mt-3 border border-blue-200 bg-blue-50/50 rounded-lg p-3">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-xs font-bold text-blue-800 flex items-center gap-1.5"><Table size={14}/> Editor Tabel Lampiran</h4>
                                        <div className="flex gap-2">
                                            <button onClick={handleAddColumn} className="text-[10px] flex items-center gap-1 bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"><Plus size={12}/> Kolom</button>
                                            <button onClick={handleAddRow} className="text-[10px] flex items-center gap-1 bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"><Plus size={12}/> Baris</button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto pb-2">
                                        <div className="inline-flex flex-col gap-1 min-w-full">
                                            {/* Headers */}
                                            <div className="flex gap-1">
                                                {tableData.headers.map((h, i) => (
                                                    <div key={i} className="relative group">
                                                        <input 
                                                            type="text" 
                                                            value={h}
                                                            onChange={e => handleHeaderChange(i, e.target.value)}
                                                            className="w-32 px-2 py-1.5 text-[10px] font-bold bg-white border border-slate-300 rounded focus:border-blue-500 focus:outline-none text-center"
                                                        />
                                                        {tableData.headers.length > 1 && (
                                                            <button onClick={() => handleRemoveColumn(i)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={10}/></button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Rows */}
                                            {tableData.rows.map((row, rowIndex) => (
                                                <div key={rowIndex} className="flex gap-1 relative group items-center">
                                                    {row.map((cell, colIndex) => (
                                                        <input 
                                                            key={colIndex}
                                                            type="text"
                                                            value={cell}
                                                            onChange={e => handleCellChange(rowIndex, colIndex, e.target.value)}
                                                            className="w-32 px-2 py-1.5 text-[10px] bg-white border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                                                        />
                                                    ))}
                                                    {tableData.rows.length > 1 && (
                                                        <button onClick={() => handleRemoveRow(rowIndex)} className="ml-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2 mt-3 p-3 bg-white border border-slate-200 rounded-lg">
                                <input type="checkbox" id="showFooter" checked={showPoweredBy} onChange={e => setShowPoweredBy(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                                <label htmlFor="showFooter" className="text-xs font-medium text-slate-700 cursor-pointer">Tampilkan logo "Powered by TeamTender" pada dokumen</label>
                            </div>
                        </div>

                    </div>
                    
                    <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-2 mt-auto">
                        <button className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                            <Printer size={14} /> Cetak PDF
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
                            <Send size={14} /> Kirim WhatsApp
                        </button>
                    </div>
                </div>

                {/* Panel Kanan: Live Preview A4 Document dengan Skala Responsif */}
                <div className="flex-1 bg-slate-300/80 overflow-y-auto flex flex-col relative items-center">
                    
                    {/* Floating Zoom Controls */}
                    <div className="sticky top-4 z-10 bg-slate-900/80 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-4 text-xs font-medium shadow-lg mb-8 mt-4">
                        <span className="opacity-70">Zoom</span>
                        <input type="range" min="0.4" max="1.2" step="0.05" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-24 accent-blue-500" />
                        <span className="w-10 text-right">{Math.round(zoom * 100)}%</span>
                    </div>

                    <div 
                        className={`w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] flex flex-col text-[12pt] ${fontFamily} text-slate-900 leading-normal origin-top mb-12`}
                        style={{ transform: `scale(${zoom})` }}
                    >
                        {/* Kop Surat */}
                        <div className="border-b-[3px] border-slate-900 pb-4 mb-8 flex items-center justify-between">
                            <div className="w-20 h-20 bg-blue-600 flex items-center justify-center text-white font-black text-2xl">
                                MK
                            </div>
                            <div className="text-right flex-1 ml-6">
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-1">PT. MAJU KONSTRUKSI</h1>
                                <p className="text-sm text-slate-600 font-sans">
                                    Jl. Jenderal Sudirman Kav. 21, Jakarta Pusat, DKI Jakarta 10220<br/>
                                    Telp: (021) 1234-5678 | Email: info@majukonstruksi.co.id
                                </p>
                            </div>
                        </div>

                        {/* Header Surat */}
                        <div className="flex-1">
                            <table className="mb-6">
                                <tbody>
                                    <tr>
                                        <td className="w-24 pb-1">Nomor</td>
                                        <td className="pb-1">: {requestLetterNo}</td>
                                    </tr>
                                    <tr>
                                        <td className="pb-1">Lampiran</td>
                                        <td className="pb-1">: 1 (satu) Berkas</td>
                                    </tr>
                                    <tr>
                                        <td className="align-top pb-1">Perihal</td>
                                        <td className="font-bold">: {documentType === 'permohonan' ? 'Permohonan Dukungan Alat/Bahan' : documentType === 'pakta' ? 'Pakta Integritas' : 'Surat Resmi'}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {documentType !== 'pakta' && recipientName && (
                                <div className="mb-6">
                                    <p className="mb-1">Kepada Yth.</p>
                                    <p className="font-bold">{recipientTitle} {recipientName}</p>
                                    {recipientAddress && <p>{recipientAddress}</p>}
                                    <p className="mt-1">di Tempat</p>
                                </div>
                            )}

                            {/* Isi Surat Dinamis dengan Tabel */}
                            {(() => {
                                if (!letterContent.includes('{{tabel}}')) {
                                    return (
                                        <>
                                            <div className="space-y-4 text-justify whitespace-pre-wrap">{letterContent}</div>
                                            {renderTableHtml()}
                                        </>
                                    );
                                }
                                const parts = letterContent.split('{{tabel}}');
                                return (
                                    <>
                                        <div className="space-y-4 text-justify whitespace-pre-wrap">{parts[0]}</div>
                                        {renderTableHtml()}
                                        <div className="space-y-4 text-justify whitespace-pre-wrap">{parts[1]}</div>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Signatures & Validation Footer */}
                        <div className="mt-16 flex justify-between items-end">
                            
                            {/* Validation QR System */}
                            <div 
                                onClick={() => setActiveRoute && setActiveRoute('verify')}
                                className="w-[75mm] border border-slate-300 rounded-lg p-3 bg-slate-50 flex items-start gap-3 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group font-sans"
                                title="Klik untuk simulasi scan QR"
                            >
                                <div className="w-16 h-16 bg-white border border-slate-200 rounded p-1 shrink-0 flex items-center justify-center group-hover:border-blue-300">
                                    <QrCode size={48} className="text-slate-800 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <div className="pt-0.5 overflow-hidden w-full">
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <Shield size={10} className="text-emerald-500 shrink-0" /> Dokumen Valid
                                    </div>
                                    <div className="text-[9px] text-slate-700 leading-tight mb-2">
                                        Scan kode atau kunjungi:<br/>
                                        <span className="font-mono text-blue-600 font-bold break-all block">{verificationUrl}</span>
                                    </div>
                                    <div className="text-[6px] text-slate-400 font-mono mb-1 truncate">{qrHash}</div>
                                    {showPoweredBy && (
                                        <div className="text-[7px] text-slate-400 font-bold border-t border-slate-200 pt-1 mt-1">
                                            Powered by TeamTender
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center w-64">
                                <p className="mb-20">Jakarta, 20 Juli 2026<br/><strong>PT. Maju Konstruksi</strong></p>
                                <p className="font-bold underline">Budi Santoso, ST.</p>
                                <p className="text-sm">Direktur Utama</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
