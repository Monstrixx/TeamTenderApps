export interface CompanyUIDiscoveryContract {
    navigation: { label: string; path: string };
    widgets: string[];
    commandPalette: string[];
    quickActions: string[];
    searchProvider: string;
    settingsProvider: string;
}

export class CompanyUIContract {
    public getUIContract(): CompanyUIDiscoveryContract {
        return {
            navigation: { label: "Company Intelligence", path: "/workspace/company" },
            widgets: ["PublicTrustWidget"],
            commandPalette: ["Analyze Company Profile", "Verify Trust Audit"],
            quickActions: ["Export Experience Portfolio"],
            searchProvider: "CompanySearchProvider",
            settingsProvider: "CompanySettingsProvider"
        };
    }
}
