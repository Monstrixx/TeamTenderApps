# Prompt Standard

## Purpose
This document establishes the standard structure for AI prompts used in modernizing the TeamTender repository, ensuring consistent, high-quality, and predictable code transformations.

## Version
1.0.0

## Status
Final

## Author
Antigravity (AI Engineering Agent)

## Last Updated
2026-07-22

---

## Mandatory Structure

All major refactoring or feature extraction prompts must adhere to the following sections:

### 1. Objective
A clear, single-sentence definition of what the prompt intends to achieve.
*Example: Extract the document validation logic into a reusable business engine.*

### 2. Strict Rules (DO NOT)
A bulleted list of negative constraints to prevent scope creep and behavioral regressions.
*Example:*
- *DO NOT change UI.*
- *DO NOT change state.*
- *DO NOT modify existing tests.*

### 3. Action Items (ONLY DO)
A sequential, step-by-step checklist of exactly what needs to be created, moved, and modified. Must specify exact file paths and target locations.

### 4. Verification Steps
Instructions for the agent to verify the work locally before completing the prompt.
*Example: Run production build, execute unit tests, and verify no linting errors.*

### 5. Reporting
A required output format summarizing the changes made, lines of code moved, and overall success metrics for audit purposes.
