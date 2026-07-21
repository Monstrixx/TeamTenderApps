# TeamTender Software Inventory

## Executive Summary
This document provides a comprehensive inventory and architectural analysis of the TeamTender web application codebase. TeamTender is a React-based web application tailored for construction tender management, document automation (RAB/BOQ, AHSP PUPR 2025, KSO matching, document generation), and vendor management.

## Technology Stack

- **Framework**: React 19 (`react` ^19.2.7, `react-dom` ^19.2.7)
- **Build Tool**: Vite 8 (`vite` ^8.1.1, `@vitejs/plugin-react` ^6.0.3)
- **Styling**: Tailwind CSS 4 (`tailwindcss` ^4.3.3, `@tailwindcss/postcss` ^4.3.3, `autoprefixer` ^10.5.4)
- **Libraries**: `lucide-react` (^1.25.0), `react-helmet-async` (^3.0.0)
- **Package Count**: 4 direct runtime dependencies, 7 development dependencies (Total: 11 direct packages)

## Folder Structure

```
teamtender-react/
├── docs/
│   └── modernization/
│       ├── 00-engineering-constitution.md
│       ├── 01-architecture-principles.md
│       ├── 02-prompt-standard.md
│       ├── 03-validation-gates.md
│       ├── 04-modernization-program.md
│       ├── CHANGELOG.md
│       └── README.md
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── SEO.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   └── blogSchema.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── DirektoriRelasi.jsx
│   │   ├── LandingPage.jsx
│   │   ├── MitraKso.jsx
│   │   ├── ProfilPerusahaan.jsx
│   │   ├── SuratMenyurat.jsx
│   │   ├── TenderAktif.jsx
│   │   ├── TenderArsip.jsx
│   │   ├── TenderBaru.jsx
│   │   ├── ValidationPage.jsx
│   │   └── Workspace.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
└── vite.config.js
```

## Pages Inventory

| Name | File | Purpose | Approx. Size (LOC) |
|------|------|---------|-------------------|
| LandingPage | `src/pages/LandingPage.jsx` | Public landing page & "Under Construction" preview with SEO metadata | 67 |
| Dashboard | `src/pages/Dashboard.jsx` | Main dashboard displaying tender stats, active feeds, and activity summary | 169 |
| ProfilPerusahaan | `src/pages/ProfilPerusahaan.jsx` | Management of company qualification documents, legalities, experience, and certificates | 1,614 |
| DirektoriRelasi / Vendor Hub | `src/pages/DirektoriRelasi.jsx` | Vendor Hub directory and partner management | 169 |
| MitraKso | `src/pages/MitraKso.jsx` | KSO partner discovery, matching, and qualification tracking | 288 |
| TenderBaru | `src/pages/TenderBaru.jsx` | Exploration and discovery of new public/LPSE tender opportunities | 500 |
| TenderAktif | `src/pages/TenderAktif.jsx` | Overview of ongoing active tender submissions | 95 |
| TenderArsip | `src/pages/TenderArsip.jsx` | Historical repository for archived tender submissions | 402 |
| Workspace | `src/pages/Workspace.jsx` | Core workspace for RAB/BOQ calculations, AHSP 2025 PUPR analysis, requirements compliance, and tender submission drafting | 3,357 |
| SuratMenyurat | `src/pages/SuratMenyurat.jsx` | Smart document and official letter generator with AI drafting and table injection | 470 |
| ValidationPage | `src/pages/ValidationPage.jsx` | Public QR code validation & trust center verification page | 138 |

## Components Inventory

| Name | Location | Used By |
|------|----------|---------|
| Layout | `src/components/Layout.jsx` | `src/App.jsx` (Wraps all authenticated pages with header and sidebar layout) |
| Sidebar | `src/components/Sidebar.jsx` | `src/components/Layout.jsx` (Navigation sidebar) |
| SEO | `src/components/SEO.jsx` | `src/pages/LandingPage.jsx` (Injects Meta Tags, OpenGraph, and JSON-LD structured data) |

## Hooks Inventory

No custom hooks found.

*(All state management relies on standard React `useState` hooks inside individual page components).*

## Services Inventory

No service layer found.

*(All data is currently static mockup data embedded directly within page components).*

## Utilities Inventory

The project currently contains Node.js maintenance/transformation scripts in the project root used during prior iterative development:
- `adjust_rab_ui.cjs`, `balance.cjs`, `debug.cjs`, `fix.cjs`, `fix_jsx.cjs`, `fix_jsx2.cjs`, `fix_workspace.cjs`, `implement_rmpk.cjs`, `implement_smart_rab.cjs`, `implement_teknis_phase1.cjs`, `implement_teknis_phase2.cjs`, `implement_ultimate_rab.cjs`, `inject_dropzone.cjs`, `parse_debug.cjs`, `parse_test.cjs`, `redesign_overview.cjs`, `refactor.cjs`, `refactor_dashboard.cjs`, `update_rkk_narrative.cjs`.

## Assets Inventory

- `src/assets/hero.png` - Main hero section banner image asset
- `src/assets/react.svg` - React logo SVG asset
- `src/assets/vite.svg` - Vite logo SVG asset
- `public/favicon.svg` - Application SVG favicon
- `public/icons.svg` - Application SVG icon set

## State Management

Current state management is entirely component-local, utilizing React's native `useState` hook inside individual page components (e.g. `App.jsx`, `Workspace.jsx`, `SuratMenyurat.jsx`). State is passed via props down the component tree or kept isolated within single page views. There is currently no centralized global state management library (such as Redux, Zustand, or React Context API).

## Routing

Routing is implemented via custom state-based navigation within `src/App.jsx`. A string state (`activeRoute`, initialized to `'landing'`) determines which page component to render via a switch statement inside `renderPage()`. The application does not currently use a declarative URL-based router (such as React Router or TanStack Router).

## External Dependencies

Major third-party dependencies:
- **`react` & `react-dom`** (^19.2.7): Core UI library.
- **`lucide-react`** (^1.25.0): Icon library used extensively across UI components.
- **`react-helmet-async`** (^3.0.0): Document head & SEO metadata management.
- **`tailwindcss` & `@tailwindcss/postcss`** (^4.3.3): Utility-first CSS framework (Tailwind v4).
- **`vite`** (^8.1.1): Next-generation frontend build tool.
- **`oxlint`** (^1.71.0): High-performance JavaScript/JSX linter.

## Architecture Observations

1. **Monolithic Page Components**: Key pages such as `Workspace.jsx` (3,357 LOC) and `ProfilPerusahaan.jsx` (1,614 LOC) contain massive inline presentation, state, calculation logic, and mockup data within a single file.
2. **Coupled Presentation & Mock Data**: Business logic and static data arrays are co-located directly inside JSX rendering functions without separation into dedicated data access layers or domain models.
3. **State-Based Navigation**: Page transitions update internal React state rather than browser URL paths, preventing direct URL bookmarking or browser back/forward history navigation for internal pages.

## Technical Debt

1. **Massive File Sizes**: Single files exceeding 3,000 LOC reduce code readability, increase cognitive load, and hamper concurrent multi-developer workflows.
2. **Lack of Data Layer**: Absence of API services or abstraction layers requires manual inline editing of hardcoded arrays whenever data models change.
3. **Root Script Clutter**: 19 legacy CommonJS `.cjs` utility scripts reside in the repository root directory.
4. **Lack of Automated Testing**: No unit test framework (e.g., Vitest, Jest) or end-to-end test runner is currently configured.

## Modernization Opportunities

1. **Component Decomposition**: Decompose monolithic pages (`Workspace.jsx`, `ProfilPerusahaan.jsx`) into smaller, domain-driven sub-components.
2. **Declarative URL Routing**: Integrate React Router or TanStack Router to support URL routes (e.g., `/workspace`, `/surat`, `/profil`).
3. **Centralized State & Service Layer**: Introduce a lightweight state store (e.g., Zustand) and service abstractions for API communication.
4. **Tooling & Test Infrastructure**: Setup Vitest for automated testing and organize root utility scripts into a dedicated `scripts/` folder.
