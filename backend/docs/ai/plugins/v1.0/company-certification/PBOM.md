# Plugin Bill of Materials (PBOM)
## Plugin: Company Plugin (Golden Reference v1.0)

### 1. General Identification
- **Plugin ID**: `teamtender.plugin.company`
- **Plugin Version**: `1.0.0`
- **Manifest Version**: `2.1`
- **Publisher**: `TeamTender Global`

### 2. Exported Capabilities
1. `company.profile.analyze` (SLA: 500ms, Cost: $0.005)
2. `company.trust.verify` (SLA: 1000ms, Cost: $0.01)
3. `company.seo.index` (SLA: 2000ms, Cost: $0.001) [Disabled by default]

### 3. Contributed Workflows
1. `company.workflow.qualification` (v1.0.0 DAG)

### 4. Contributed Tools
1. `CompanyAuditTool`
2. `TrustVerificationTool`

### 5. Knowledge Adapters
1. `CompanyProfileAdapter` (Nodes, Relationships, Snapshots)
2. `CompanyTrustAdapter` (Nodes, Relationships, Snapshots)

### 6. Contributed UI Contracts
- Navigation: `/workspace/company`
- Widgets: `PublicTrustWidget`
- Command Palette: `Analyze Company Profile`, `Verify Trust Audit`
- Quick Actions: `Export Experience Portfolio`
- Search Provider: `CompanySearchProvider`
- Settings Provider: `CompanySettingsProvider`

### 7. Resource Quotas
- Max Memory: `256 MB`
- Max CPU Time: `5000 ms`
- Max AI Tokens: `50,000`
- Max Concurrent Sessions: `10`
