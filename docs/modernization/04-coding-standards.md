# Coding Standards

## Purpose
This document provides specific tactical coding standards for the TeamTender repository, ensuring uniformity in naming, file structure, and technical implementations.

## Version
1.0.0

## Status
Final

## Author
Antigravity (AI Engineering Agent)

## Last Updated
2026-07-22

---

## 1. Naming Conventions
- **Files & Folders**: 
  - React Components: `PascalCase.jsx`
  - Helpers/Engines/Services: `camelCase.js`
  - Folders: `kebab-case`
- **Variables & Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces** (if using TS/JSDoc): `PascalCase`

## 2. Folder Structure
- `src/components`: Reusable, dumb UI components.
- `src/pages`: Top-level route components.
- `src/containers`: Logic-heavy orchestrators (e.g., RBAC, data fetching).
- `src/engines`: Pure business logic (e.g., validation rules, calculations).
- `src/shared/helpers`: Pure utility functions (e.g., generators, formatters).
- `src/services`: External system interactions (APIs, LocalStorage).

## 3. Imports and Exports
- Use named exports for almost everything (`export function doSomething()`).
- Default exports are strictly reserved for React `pages` to support dynamic lazy loading.
- Group imports logically:
  1. External libraries (`react`, `react-router-dom`)
  2. Internal absolute/alias imports (`@/components/...`)
  3. Relative imports (`./styles.css`)

## 4. Hooks
- Custom hooks (`useSomething.js`) must strictly reside in `src/hooks` or domain-specific `hooks` folders.
- Hooks are for sharing React state logic, not for business calculations (which belong in Engines).

## 5. Helpers vs Engines vs Services
- **Helpers**: Formatters, string manipulation, minor pure utilities. No state.
- **Engines**: Core business calculations, complex rulesets, pure domain logic. No state.
- **Services**: API calls, side-effects, async operations.

## 6. State Management
- Keep state as local as possible.
- Avoid passing massive prop chains; consider Context or specialized containers for deeply nested needs.
- Business state (e.g., total calculation) should be derived via Engines on the fly rather than synchronized manually across multiple `useState` hooks.
