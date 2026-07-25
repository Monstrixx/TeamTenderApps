# API Versioning Strategy

All API endpoints must be prefixed with their respective version.
Currently, the active version is **v1**.

Base URL: `/api/v1/`

Example: `/api/v1/health`

When backwards-incompatible changes are introduced, a new version (e.g., `v2`) should be created while maintaining `v1` until deprecation timelines are met.
