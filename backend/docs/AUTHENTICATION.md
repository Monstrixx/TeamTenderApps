# Authentication Architecture

## Overview
TeamTender uses a robust, production-ready authentication and authorization system based on JSON Web Tokens (JWT) for access and secure HttpOnly cookies for refresh tokens. 

The architecture strictly follows the Open Web Application Security Project (OWASP) recommendations for SPA architectures.

## Strategy
1. **Access Token (JWT)**
   - Short-lived (e.g., 15 minutes).
   - Contains claims such as `userId`, `roles`, and `permissions` for fast RBAC checks.
   - Sent to the frontend in the JSON response payload upon login/refresh.
   - Used via the `Authorization: Bearer <token>` header.

2. **Refresh Token (Opaque String)**
   - Long-lived (e.g., 7 days).
   - Cryptographically random 256-bit string, hashed via SHA-256 before storing in the database.
   - Sent to the frontend exclusively via `HttpOnly`, `Secure`, `SameSite=Lax` cookies.
   - Immune to XSS attacks since JavaScript cannot access it.

3. **Global Logout & Invalidation**
   - Implemented via a `tokenVersion` field on the `User` model.
   - Incrementing `tokenVersion` immediately invalidates all existing JWTs for that user.

## Endpoints
- `POST /api/v1/auth/login`: Authenticates user, returns Access Token in body and Refresh Token in cookie.
- `POST /api/v1/auth/refresh`: Validates cookie Refresh Token, returns new tokens.
- `POST /api/v1/auth/logout`: Revokes Refresh Token and clears cookie.
- `GET /api/v1/auth/me`: Retrieves the current user's profile based on the Access Token.

## RBAC Configuration
Roles and Permissions are enforced using specific middleware:
- `authenticate`: Enforces a valid access token.
- `requireRole(role)`: Validates if the user has the specified role.
- `requirePermission(perm)`: Validates if the user has the required permission.

## Security Practices
- Password hashing is enforced using `bcrypt`.
- IP logging is used for audit trails during login and token refresh.
- Detailed audit logging is captured for all authentication events.
