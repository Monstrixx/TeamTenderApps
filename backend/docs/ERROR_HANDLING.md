# Error Handling Strategy

We utilize a Global Error Handler middleware to ensure consistency across all API responses.

## Standard Error Format
All errors return a predictable JSON structure matching the OpenAPI definition:

```json
{
  "success": false,
  "error": {
    "code": "400",
    "message": "Invalid input",
    "details": { ... }
  },
  "meta": {
    "requestId": "uuid-...",
    "timestamp": "2026-07-22T21:50:00Z"
  }
}
```

## Throwing Errors
Within controllers and services, throw instances of `ApiError`:
```ts
throw ApiError.badRequest("Invalid input", { field: "email" });
```
