import { useState, useEffect } from 'react';
import { tenders, supplierDirectory } from '../../data/mock/suratMenyurat';

export function useSuratMenyurat() {
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
            setLetterContent(`[Dihasilkan oleh AI Draft]\n\nMenindaklanjuti rencana pelaksanaan pekerjaan ${activeTender?.namaPaket || 'tersebut'}, ${aiPrompt}. \n\nOleh karena itu, kami berharap dapat menjadwalkan pertemuan lanjutan untuk membahas rincian spesifikasi teknis dan lini masa pengiriman material ke lokasi site.\n\nDemikian kami sampaikan, atas kerja sama yang baik, kami ucapkan terima kasih.`);
            setIsGenerating(false);
            setAiPrompt('');
        }, 1500);
    };

    return {
        documentType, setDocumentType,
        recipientMode, setRecipientMode,
        tenderMode, setTenderMode,
        selectedTenderId, setSelectedTenderId,
        manualTender, setManualTender,
        selectedSupplier, setSelectedSupplier,
        requestLetterNo, setRequestLetterNo,
        showPoweredBy, setShowPoweredBy,
        showTableEditor, setShowTableEditor,
        tableData, setTableData,
        manualRecipient, setManualRecipient,
        aiPrompt, setAiPrompt,
        isGenerating, setIsGenerating,
        fontFamily, setFontFamily,
        letterContent, setLetterContent,
        zoom, setZoom,
        activeTender,
        activeSupplier,
        recipientName,
        recipientTitle,
        recipientAddress,
        actions: {
            handleGenerateAI
        }
    };
}
