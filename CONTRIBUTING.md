# Contributing to TeamTender Enterprise Platform

Thank you for your interest in contributing to TeamTender!

## Governance & Architecture Frozen Policy

Please note that **Era-1 (AI Core Kernel)**, **Era-2 (Runtime Layer)**, and **Era-3 (Plugin Platform)** are **🔒 ARCHITECTURE FROZEN**.

Direct modifications to:
- `backend/src/ai/kernel/`
- `backend/src/ai/api/`
- `backend/src/ai/platform/`

are strictly prohibited unless approved via an official Architectural Decision Record (ADR) and RFC process.

## Domain Plugins (Era-4)

All new business features MUST be implemented as independent **Domain Plugins** built on top of `PluginSDK v1.0`.

Plugins MUST satisfy:
1. `COMP-001` Plugin Compliance Specification
2. `CERT-001` Plugin Certification Standard
3. Zero cross-plugin direct imports
4. Zero direct database/kernel access

For questions or RFC proposals, please contact the Architecture Review Board.
