# HANDBOOK-001: Plugin Development Handbook
## Version 1.0

### Introduction
Welcome to the Era-4 Development Guide. This handbook is the definitive guide to constructing Domain Plugins (like Company Plugin) atop the frozen TeamTender Platform.

### Chapter 1: The Golden Rule
**"Never Call Another Plugin Directly. Never Touch The Kernel."**
You must inject the `PluginSDK` to do all heavy lifting.

### Chapter 2: Building Your First Plugin
1. **Define the Manifest**: Write `manifest.json` following `SPEC-105`. Ensure you declare quotas and capabilities.
2. **Implement Knowledge Adapters**: If your plugin reads files (e.g., Tender PDFs), implement an adapter and register it to the Plugin SDK.
3. **Define Workflows**: Use DAG-style definitions for any business logic (e.g., Rab parsing).
4. **Export Tools**: Make sure tools follow the Input/Output schemas strictly.
5. **Testing**: Run local Contract Tests before pushing.

### Chapter 3: Certification
Before you PR, ensure `COMP-001` checklist is fully green. The CI/CD pipeline will automatically run `Signature Validator`.

### Chapter 4: Telemetry
Always inject `this.context.telemetry.record(tag)` at the end of capabilities for observability.
