import re

with open('src/pages/SuratMenyurat.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "    const [documentType, setDocumentType] = useState('permohonan');"
end_pattern = r'    const handleGenerateAI = \(\) => \{.*?\n        \}, 1500\);\n    \};\n'

start_idx = content.find(start_marker)
match = re.search(end_pattern, content[start_idx:], re.DOTALL)
if match and start_idx != -1:
    end_idx = start_idx + match.end()
    
    new_state_block = '''    const {
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
        actions: { handleGenerateAI }
    } = useSuratMenyurat();
'''
    new_content = content[:start_idx] + new_state_block + content[end_idx:]
    
    # Also add import for useSuratMenyurat
    import_line = "import { useSuratMenyurat } from '../hooks/suratMenyurat/useSuratMenyurat';\n"
    new_content = new_content.replace(
        "import { tenders, supplierDirectory } from '../data/mock/suratMenyurat';",
        "import { tenders, supplierDirectory } from '../data/mock/suratMenyurat';\n" + import_line
    )
    
    with open('src/pages/SuratMenyurat.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Replaced successfully')
else:
    print('Failed to find start or end')
