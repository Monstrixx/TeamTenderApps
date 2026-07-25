# Database Schema (Prisma)

The initial schema includes a foundational Role-Based Access Control (RBAC) model.

## Entities
1. **User**: Core identity.
2. **Role**: Defines a group of permissions (e.g., Admin, User).
3. **Permission**: Specific atomic rights (e.g., `read:workspace`).
4. **UserRole**: Junction table linking Users to Roles.
5. **RolePermission**: Junction table linking Roles to Permissions.
6. **Workspace**: Sample business entity.

*See `prisma/schema.prisma` for the exact definitions.*
