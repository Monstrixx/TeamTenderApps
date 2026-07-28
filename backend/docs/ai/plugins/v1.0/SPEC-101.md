# SPEC-101: Plugin Platform Specification
## Version 1.0

### 1. Abstract
This specification defines the universal architecture of the TeamTender AI Plugin Platform (Era-3). It transitions the TeamTender ecosystem from a core AI engine into an extensible Enterprise AI Operating System.

### 2. Architecture Boundary
The Plugin Platform sits strictly above the `Runtime Layer` (Era-2) and `AI Core Kernel` (Era-1). No Domain Plugin (Era-4) is allowed to bypass the Platform to interact with the Kernel directly.

### 3. Key Components
1. **Plugin SDK**: The public contract boundary.
2. **Plugin Runtime**: The execution engine that wraps the plugin inside a Sandbox.
3. **Plugin Host**: The dependency injection container.
4. **Marketplace & Discovery**: The module responsible for resolving semantic capabilities.

### 4. Zero Cross-Plugin Communication Policy
Plugins are structurally forbidden to communicate directly (e.g., Company Plugin cannot invoke Tender Plugin methods). All interactions must traverse the `Event Publisher` or `Capability Resolution` provided by the Platform.
