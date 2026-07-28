# Frontend Module Structure

## Metadata
- **Document ID:** TT-PROD-WS-FMS-001
- **Version:** 1.0
- **Status:** Review
- **Owner:** Frontend Lead
- **Last Updated:** 2026-07-28

## Target Directory Structure

```text
src/
├── layouts/
│   └── WorkspaceLayout/       # The new SaaS shell
│       ├── Sidebar/           # Primary navigation
│       ├── Topbar/            # Search, Profile, Context switcher
│       ├── Breadcrumb/        # Path navigation
│       └── StatusBar/         # System status & AI metrics
├── modules/
│   ├── workspace/             # Tenant settings, members, creation
│   ├── company/               # Legal entity profiles
│   ├── personnel/             # HR and Roles
│   ├── equipment/             # Asset registry
│   ├── supplier/              # Partners and vendors
│   ├── tender/                # Bidding (Extracted from old Workspace.jsx)
│   ├── document/              # Global document hub
│   ├── analytics/             # Dashboards
│   ├── ai/                    # AI logs and settings
│   ├── settings/              # User preferences
│   └── shared/                # Common components across modules
```

## Responsibilities

### Layouts
Handles visual structure only. Injects common UI components (Navigation, Headers) around the dynamic `Outlet` or `children`. Does not contain domain business logic.

### Modules
Self-contained domains. Each module directory should ideally contain its own:
- `/pages`: Route entry points.
- `/components`: Domain-specific UI.
- `/hooks`: Data fetching (e.g., React Query).
- `/utils`: Helper functions.

### Shared
Cross-module utilities, generic UI components (buttons, modals), and global state slices (e.g., Auth Context) that do not belong to a single domain.
