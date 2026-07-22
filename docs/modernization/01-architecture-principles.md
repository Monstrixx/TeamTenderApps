# Architecture Principles

## Purpose
This document defines the core architectural guidelines and structural patterns for TeamTender to ensure maintainability, scalability, and clarity.

## Version
1.0.0

## Status
Final

## Author
Antigravity (AI Engineering Agent)

## Last Updated
2026-07-22

---

## 1. Separation of Concerns
UI components must only handle rendering and user interactions. Business logic, calculations, and data fetching must be delegated to specialized modules (Helpers, Engines, Services).

## 2. Layered Architecture
- **Presentation Layer (`src/components`, `src/pages`)**: Displays data, handles user inputs.
- **Container Layer (`src/containers`)**: Orchestrates data and permissions (e.g., RBAC).
- **Business Logic Layer (`src/engines`, `src/shared/helpers`)**: Pure, stateless calculations and transformations.
- **Service Layer (`src/services`)**: Data persistence and API communication.

## 3. Domain Boundaries
Features are organized into distinct domains inside `src/modules/` (e.g., `workspace`, `rab`, `ahsp`).
Cross-domain dependencies must be minimized and clearly injected via props or centralized state.

## 4. Dependency Direction
Dependencies must flow inward towards pure business logic:
`UI -> Container -> Service -> Engine -> Helper`
Engines and Helpers must never depend on React, the DOM, or external APIs.

## 5. Pure Business Logic
Calculations and state mutations (like document validation) must be implemented as pure functions, enabling high testability and predictable behavior.
