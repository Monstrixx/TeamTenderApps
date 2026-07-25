export class ApiError extends Error {
  public statusCode: number;
  public codeString: string;
  public details?: unknown;

  constructor(statusCode: number, message: string, codeString?: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.codeString = codeString || statusCode.toString();
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(400, message, '400', details);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message: string = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message: string = 'Resource not found') {
    return new ApiError(404, message);
  }

  static internal(message: string = 'Internal server error') {
    return new ApiError(500, message);
  }
}
