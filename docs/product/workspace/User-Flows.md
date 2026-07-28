# User Flows

## Metadata
- **Document ID:** TT-PROD-WS-FLW-001
- **Version:** 1.0
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [Workspace Modules](./Workspace-Modules.md)
- **Next:** [Layout Standards](./Layout-Standards.md)
- **Parent:** [Workspace README](./README.md)
- **Related Documents:** None

## Core User Journeys

### 1. Login and Workspace Selection
```mermaid
flowchart TD
    A[User visits Login] --> B[Enter Credentials]
    B --> C{Authenticated?}
    C -- No --> D[Show Error]
    C -- Yes --> E{Belongs to multiple workspaces?}
    E -- Yes --> F[Workspace Selection Dashboard]
    E -- No --> G[Auto-route to single Workspace]
    F --> G
    G --> H[Load Workspace Home]
```

### 2. Create Workspace
```mermaid
flowchart TD
    A[Click Create Workspace] --> B[Enter Workspace Name]
    B --> C[Set Billing Details]
    C --> D[System Provisions Tenant]
    D --> E[Assign Owner Role]
    E --> F[Redirect to new Workspace Settings]
```

### 3. Invite Member and Accept Invitation
```mermaid
flowchart TD
    A[Admin: Send Invite Email] --> B[System generates token]
    B --> C[User receives Email]
    C --> D[Click Link]
    D --> E{Has Account?}
    E -- No --> F[Sign Up Flow]
    E -- Yes --> G[Accept Invite]
    F --> G
    G --> H[Added to Workspace with assigned Role]
```

### 4. Create Personnel
```mermaid
flowchart TD
    A[Navigate to Personnel] --> B[Click Add Employee]
    B --> C[Fill Employee Details]
    C --> D[Upload Certifications]
    D --> E[Save Record]
    E --> F[Profile Active in Directory]
```

### 5. Open Tender
```mermaid
flowchart TD
    A[Navigate to Tender Module] --> B[Click Create Tender]
    B --> C[Input RFP Details]
    C --> D[Save as Draft]
    D --> E[Tender Dashboard Opens]
```

### 6. Search Document & AI Validation
```mermaid
flowchart TD
    A[Upload Document to Tender] --> B[Trigger AI Validation]
    B --> C[AI Extracts text/metadata]
    C --> D{Data matches requirements?}
    D -- Yes --> E[Mark Document Valid]
    D -- No --> F[Flag for Manual Review]
    E --> G[Document Indexed for Search]
    F --> G
```

### 7. Logout
```mermaid
flowchart TD
    A[Click Profile] --> B[Select Logout]
    B --> C[Clear local tokens]
    C --> D[Invalidate session on server]
    D --> E[Redirect to Login]
```
