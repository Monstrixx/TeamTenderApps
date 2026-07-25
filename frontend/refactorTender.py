import re

with open('src/pages/TenderBaru.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "    const [requirementsDB, setRequirementsDB] = useState(initialRequirementsDB);"
end_pattern = r'        setRequirementsDB\(db\);\n        setIsModalOpen\(false\);\n    \};\n'

start_idx = content.find(start_marker)
match = re.search(end_pattern, content[start_idx:], re.DOTALL)
if match and start_idx != -1:
    end_idx = start_idx + match.end()
    
    new_state_block = '''    const {
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
'''
    new_content = content[:start_idx] + new_state_block + content[end_idx:]
    
    # Also add import for useTenderBaru
    import_line = "import { useTenderBaru } from '../hooks/tenderBaru/useTenderBaru';\n"
    new_content = new_content.replace(
        "import { requirementsDB as initialRequirementsDB } from '../data/mock/tenderBaru';",
        "import { requirementsDB as initialRequirementsDB } from '../data/mock/tenderBaru';\n" + import_line
    )
    
    with open('src/pages/TenderBaru.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Replaced successfully')
else:
    print('Failed to find start or end')
