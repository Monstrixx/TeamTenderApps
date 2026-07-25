import re

with open('src/pages/TenderArsip.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "    const [selectedTender, setSelectedTender] = useState(null);"
end_pattern = r'                `Hormat kami,\\n\\nPT\. MAJU KONSTRUKSI\\n\\n\\n\\n\(Pimpinan Perusahaan\)`\n            \);\n        \}, 1500\);\n    \};\n'

start_idx = content.find(start_marker)
match = re.search(end_pattern, content[start_idx:], re.DOTALL)
if match and start_idx != -1:
    end_idx = start_idx + match.end()
    
    new_state_block = '''    const {
        selectedTender, setSelectedTender,
        activeTab, setActiveTab,
        evaluasiInput, setEvaluasiInput,
        aiSanggahDraft, setAiSanggahDraft,
        isAnalyzing, setIsAnalyzing,
        isSyncing, setIsSyncing,
        archivedTenders, setArchivedTenders,
        actions: {
            handleTenderClick,
            handleSyncSchedule,
            handleAnalyzeEvaluasi
        }
    } = useTenderArsip();
'''
    new_content = content[:start_idx] + new_state_block + content[end_idx:]
    
    import_line = "import { useTenderArsip } from '../hooks/tenderArsip/useTenderArsip';\n"
    # Also add import for stats and archivedTenders mock if needed, but they are defined inside or from mock.
    # Actually, stats is defined inside the file right before the state. So I need to ensure it's not deleted.
    # Wait, start_marker is `const [selectedTender` which is above stats. So stats will be DELETED by this replacement!
    # Ah! I need to put `stats` back in the new_state_block or let it be defined.
    # Let me add stats to the block.
    
    new_state_block_with_stats = '''    const {
        selectedTender, setSelectedTender,
        activeTab, setActiveTab,
        evaluasiInput, setEvaluasiInput,
        aiSanggahDraft, setAiSanggahDraft,
        isAnalyzing, setIsAnalyzing,
        isSyncing, setIsSyncing,
        archivedTenders, setArchivedTenders,
        actions: {
            handleTenderClick,
            handleSyncSchedule,
            handleAnalyzeEvaluasi
        }
    } = useTenderArsip();

    const stats = [
        { label: "Total Tender Diikuti", value: "18 Paket", sub: "Tahun Anggaran 2026", icon: BarChart3, color: "bg-blue-50 text-blue-600 border-blue-100" },
        { label: "Kemenangan (Won)", value: "8 Paket", sub: "Nilai Kontrak Rp 24.5 M", icon: Award, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
        { label: "Gugur & Sanggah", value: "6 Paket", sub: "2 Sanggahan Diterima", icon: ShieldAlert, color: "bg-amber-50 text-amber-600 border-amber-100" },
        { label: "Rasio Kemenangan", value: "57.1%", sub: "Di atas rata-rata industri", icon: CheckCircle2, color: "bg-purple-50 text-purple-600 border-purple-100" },
    ];
'''
    new_content = content[:start_idx] + new_state_block_with_stats + content[end_idx:]
    new_content = new_content.replace(
        "export default function TenderArsip() {",
        "import { useTenderArsip } from '../hooks/tenderArsip/useTenderArsip';\n\nexport default function TenderArsip() {"
    )
    
    with open('src/pages/TenderArsip.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Replaced successfully')
else:
    print('Failed to find start or end')
