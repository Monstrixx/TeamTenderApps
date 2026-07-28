# Contributing to TeamTender Enterprise Platform

Thank you for your interest in contributing to TeamTender!

## Governance & Architecture Frozen Policy

Please note that **Era-1 (AI Core Kernel)**, **Era-2 (Runtime Layer)**, and **Era-3 (Plugin Platform)** are **🔒 ARCHITECTURE FROZEN**.

### Permanent Pull Request (PR) Governance Rule
Direct architectural changes via Pull Requests are strictly prohibited. Pull Requests are exclusively mechanisms for implementing approved architectural decisions.

All architectural modifications to core layers MUST follow the mandatory protocol:
```text
RFC -> Architecture Review -> ADR -> Implementation -> Certification -> Release
```

PRs attempting to bypass this protocol or mutate core contracts will be automatically rejected.

## Domain Plugins (Era-4)

All new business features MUST be implemented as independent **Domain Plugins** built on top of `PluginSDK v1.0`.

Plugins MUST satisfy:
1. `COMP-001` Plugin Compliance Specification
2. `CERT-001` Plugin Certification Standard
3. Zero cross-plugin direct imports
4. Zero direct database/kernel access

For questions or RFC proposals, please contact the Architecture Review Board.
