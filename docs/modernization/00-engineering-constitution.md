# Engineering Constitution

## Purpose
This document establishes the fundamental rules and values for the TeamTender engineering team. It serves as the ultimate source of truth for engineering culture, coding philosophy, and repository governance.

## Scope
This constitution applies to all source code, architecture decisions, code reviews, and tooling within the TeamTender repository.

## Version
1.0.0

## Status
Final

## Author
Antigravity (AI Engineering Agent)

## Last Updated
2026-07-22

---

## Coding Philosophy
1. **Repository First**: All logic must reside in code. No hidden configurations.
2. **Testability First**: Code must be designed to be testable. Use pure functions where possible.
3. **Configuration Over Hardcoding**: Extract variable data into parameters or environment variables.
4. **Reusability Over Special Cases**: Design generalized helpers rather than context-specific hacks.
5. **Documentation Is Code**: Keep governance and technical documentation in the repository, synchronized with code changes.

## Repository Rules
- The `main` branch must always remain deployable.
- No direct commits to `main` without passing CI pipelines.
- Commits must follow semantic commit guidelines.

## Architecture Ownership
- Changes to cross-cutting concerns (authentication, routing, data access) require architectural review.
- Domain modules (`src/modules/*`) are owned by feature teams and may be iterated independently provided they adhere to core interfaces.

## Review Policy
- All Pull Requests must have at least one approval.
- Code coverage must not decrease.
- PRs must link to a valid tracking issue or feature request.
