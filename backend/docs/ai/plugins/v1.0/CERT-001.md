# CERT-001: Plugin Certification Standard
## Version 1.0

### 1. Objective
To guarantee that every Plugin entering Era-4 meets the rigorous standards of the TeamTender Enterprise Platform.

### 2. Mandatory Files
A certified plugin package MUST include:
- `manifest.json` (Compliant with SPEC-105)
- `ADR.md`
- `RFC.md`
- `SPEC.md`
- `SECURITY_REPORT.md`
- `PERFORMANCE_REPORT.md`

### 3. Mandatory Tests
- **Contract Test**: 100% coverage on input/output schemas of exported capabilities.
- **Dependency Scan**: 0 critical/high vulnerabilities in `npm audit`.
- **License Scan**: Compliance with TeamTender enterprise licensing.

### 4. Signing Requirements
Every plugin package MUST be hashed and signed. The build output will produce a `Checksum`. The TeamTender Marketplace will verify this Checksum against the registered Signature before permitting `Mount` in the Plugin Host.
