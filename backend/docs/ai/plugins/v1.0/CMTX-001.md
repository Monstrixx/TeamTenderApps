# CMTX-001: Compatibility Matrix
## Version 1.0

### 1. Architectural Version Alignment

| Component | Minimum Version | Verified Version | Status |
|---|---|---|---|
| AI Core Kernel (Era-1) | v1.0.0 | v1.0.x | 🔒 Supported |
| Runtime Layer (Era-2) | v1.0.0 | v1.0.x | 🔒 Supported |
| Plugin Platform (Era-3) | v1.0.0 | v1.0.x | 🔒 Supported |
| Domain Plugins (Era-4) | v1.0.0 | v1.0.x | 🔄 Upcoming |

### 2. Cross-Version Policy
- **Minor Updates (1.x.0)**: Plugins are guaranteed to work continuously on the Host without recompilation.
- **Major Updates (2.0.0)**: Deprecation notice will be supplied 180 days prior. Requires re-certification via `CERT-001`.
