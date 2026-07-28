export const DocumentUIContract = {
    navigation: {
        label: "Document Intelligence",
        path: "/workspace/document",
        icon: "document-icon"
    },
    pages: {
        DocumentDashboard: "/workspace/document",
        DocumentDetail: "/workspace/document/:documentId",
        OCRViewer: "/workspace/document/:documentId/ocr",
        SemanticCitationViewer: "/workspace/document/:documentId/citations"
    },
    widgets: [
        "ActiveDocumentsWidget",
        "ExtractionAccuracyWidget",
        "KnowledgeTraceabilityWidget"
    ],
    commandPalette: [
        "Parse Document",
        "Extract Tables",
        "Generate Citations",
        "Scan Compliance"
    ],
    artifactViewers: {
        DocumentFingerprintArtifact: "FingerprintViewer",
        LayoutArtifact: "LayoutViewer",
        ClassificationArtifact: "ClassificationViewer",
        KnowledgePackageArtifact: "KnowledgePackageViewer",
        ComplianceReportArtifact: "ComplianceReportViewer"
    }
} as const;
