// ── TenderPlugin UI Contract v1.0 ────────────────────────────────────────────
// Discovered via manifest.json → ui section (Lock 35 Domain Declaration)
// ─────────────────────────────────────────────────────────────────────────────
export const TenderUIContract = {
    navigation: {
        label: "Tender Intelligence",
        path: "/workspace/tender",
        icon: "tender-icon",
        badgeProvider: "TenderBadgeProvider"
    },
    pages: {
        TenderDashboard:   "/workspace/tender",
        TenderDetail:      "/workspace/tender/:tenderId",
        BidWorkspace:      "/workspace/tender/:tenderId/bid",
        EligibilityReport: "/workspace/tender/:tenderId/eligibility",
        ComplianceReport:  "/workspace/tender/:tenderId/compliance",
        BidStrategy:       "/workspace/tender/:tenderId/strategy",
        AwardPrediction:   "/workspace/tender/:tenderId/prediction",
        TenderHistory:     "/workspace/tender/history"
    },
    widgets: [
        "ActiveTendersWidget",
        "BidStatusWidget",
        "EligibilityScoreWidget",
        "AwardPredictionWidget",
        "ComplianceStatusWidget",
        "TenderTimelineWidget"
    ],
    commandPalette: [
        "Search Tenders",
        "Assess Eligibility",
        "Create Bid Draft",
        "Optimize Bid Strategy",
        "Review Compliance",
        "Generate Recommendation",
        "Predict Award Outcome"
    ],
    quickActions: ["Start New Tender Analysis", "Submit Pending Bid", "Export Bid Strategy"],
    searchProvider: "TenderSearchProvider",
    settingsProvider: "TenderSettingsProvider",
    // Lock 32: Artifact Viewers
    artifactViewers: {
        EligibilityReportArtifact: "EligibilityReportViewer",
        BidAnalysisArtifact:       "BidAnalysisViewer",
        BidStrategyArtifact:       "BidStrategyViewer",
        ComplianceReportArtifact:  "ComplianceReportViewer",
        RecommendationArtifact:    "RecommendationViewer",
        PredictionArtifact:        "PredictionViewer"
    }
} as const;
