# Contributing to TeamTender Frontend

Thank you for contributing to the TeamTender Frontend! This document outlines the standards and conventions we follow to maintain a clean, performant, and production-ready codebase.

## Core Philosophical Rules

1. **Do not abstract what is already simple.**
   If a component is only used once and is small, keep it inline. Avoid premature abstraction.
2. **Anything not visible on first paint should be a lazy-loading candidate.**
   Performance is a feature. Modals, heavy tables, and lower-fold content should be lazy-loaded using `React.lazy()` and `Suspense`.
3. **Don't apply barrel exports indiscriminately.**
   Use barrel exports (`index.js`) *only* for public collection folders (e.g., `src/components/ui`, `src/hooks`). Do not use them for internal component modules where it obfuscates the dependency tree.

## Development Standards

### 1. Components
- Use Functional Components and React Hooks exclusively.
- Use `lucide-react` for icons.
- Prefer Tailwind CSS for styling. Avoid writing custom CSS unless absolutely necessary.
- **Accessibility (a11y)**: All dialogs and interactive elements must be accessible. Use the `useDialogA11y` hook for managing focus traps and returning focus upon closing.

### 2. Error Handling
- Use `react-error-boundary` to isolate failures.
- Never let a component failure crash the whole application.
- Provide a recovery mechanism (e.g., "Reload Section" or "Back to Dashboard") in fallback UI, rather than a dead-end error message.

### 3. File Structure
- `src/app`: Application entry point and router configuration.
- `src/components`: Shared components (UI primitives).
- `src/config`: Environment, API, and Feature Flag configurations.
- `src/hooks`: Global custom hooks.
- `src/modules`: Domain-specific components grouped by feature (e.g., `workspace/personil`).
- `src/pages`: Top-level route components.

### 4. Pull Requests
- Ensure the bundle size budget is met (Initial JS < 400KB).
- Run `npm run build` to verify there are no rollup errors.
- Ensure all debug logs and TODOs (except those marked for future Waves) are cleaned up before merging.
