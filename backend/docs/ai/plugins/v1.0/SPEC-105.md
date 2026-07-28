# SPEC-105: Plugin Manifest v2.1 Specification
## Version 2.1

### 1. Abstract
The Plugin Manifest v2.1 is the single source of truth for any plugin's identity, requirements, permissions, and lifecycle.

### 2. Required Fields
- `identity`: { id, version, type, owner, description }
- `capabilities`: Array of capability descriptors provided by the plugin.
- `workflows`: DAG definitions contributed to the Runtime.
- `tools`: Tools injected into the AI Service Mesh.
- `permissions`: Required RBAC/ABAC and System scopes.
- `quotas`: Max Memory, Max CPU, Max Tokens requested.
- `telemetry`: List of specific telemetry tags emitted.
- `dependencies`: Strict references to required Plugin Capabilities.
- `compatibility`: Map of required Platform/Kernel versions.
- `certification`: Certification reports and results.
- `signature`: Developer Hash, Checksum, and TeamTender Signature.
- `lifecycle`: Hook endpoints (e.g., onInit, onSuspend).
- `support_policy`: SLA and end-of-life commitments.

### 3. Rejection Criteria
Any manifest missing the above fields, or containing an invalid `signature`, will result in `ERR_CERTIFICATION_FAILED` at load time.
