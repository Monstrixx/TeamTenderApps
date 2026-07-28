# AI Architecture

TeamTender integrates Artificial Intelligence as a core layer sitting above the Knowledge and Data layers, providing intelligent automation and decision support across the application.

## Overview
The AI Architecture is designed to be modular, provider-independent, and focused on operational intelligence. It abstracts external providers and ensures safety and traceability in AI decisions.

## Logical Sections

### LLM Gateway
A centralized routing proxy that handles all communication with external Large Language Models (LLMs).
- Abstracts provider differences (OpenAI, Gemini, Anthropic).
- Manages API keys, rate limiting, and cost tracking.
- Implements fallback strategies for high availability.

### Prompt Engine
The central repository and execution engine for all prompts.
- Provides version control for prompt templates.
- Handles dynamic parameter injection.
- Enables A/B testing of prompt variations.

### Memory
Manages context across interactions.
- **Short-Term Memory**: Tracks the immediate context of a user's current session or chat.
- **Long-Term Memory**: Stores user preferences and persistent context in the Knowledge Graph.

### Agent Runtime
The execution environment for autonomous and semi-autonomous AI agents.
- Orchestrates multi-step workflows.
- Manages state, retries, and error handling during complex tasks.

### Reasoning
The logic determining *how* the AI makes decisions.
- Utilizes Chain-of-Thought (CoT) processing.
- Implements step-back prompting and validation loops to improve accuracy.

### Tool Calling
The interface allowing AI agents to interact with the rest of the TeamTender platform.
- Agents can call defined internal APIs (e.g., to draft a document or query a supplier status).
- **Constraint**: As per our [Architecture Principles](./Architecture-Principles.md), all tool calls that modify business state are subject to strict Human Approval.
