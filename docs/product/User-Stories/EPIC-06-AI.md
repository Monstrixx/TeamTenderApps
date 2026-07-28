# EPIC-06: AI

## Metadata
- **Epic ID:** EPIC-06
- **Domain:** AI
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [EPIC-05: Tender](./EPIC-05-Tender.md)
- **Next:** None
- **Parent:** [Product README](../README.md)
- **Related Documents:** None

## Purpose
To introduce foundational artificial intelligence capabilities into the platform, paving the way for advanced automation and insights.

## Business Value
Reduces manual toil for users by automating data entry, extracting information from complex documents, and providing intelligent search capabilities, living up to our North Star promise.

## Capabilities
- AI integration layer (LLM connectivity).
- Automated document data extraction (e.g., parsing compliance PDFs).
- Intelligent search across Workspace entities.

## Dependencies
- **EPIC-01 to EPIC-05:** AI requires the underlying data structures to be in place so it has data to index, extract, and analyze.

## User Stories
1. **US-AI-01:** As a Bid Manager, I want the system to automatically extract key dates and requirements from a Tender PDF so I don't have to type them manually.
2. **US-AI-02:** As a User, I want to search across all my company's data using natural language so I can find information faster.

## Acceptance Criteria
- LLM integrations are secure, respecting tenant boundaries (data from Workspace A does not train models for Workspace B).
- Data extraction from standard PDFs achieves at least an 85% accuracy rate in UAT.
- Search latency remains under 500ms for standard queries.

## Definition of Done
- Code complete and tested against mock AI responses.
- Security and data privacy review passed regarding third-party LLM APIs.
- Deployed to UAT.
- End-user documentation updated.

## Future Enhancements
- Generative AI for drafting tender responses.
- Predictive analytics for tender win probability.
