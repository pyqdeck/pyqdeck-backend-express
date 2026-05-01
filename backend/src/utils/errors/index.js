class BaseError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
      },
    };
  }
}

class ValidationError extends BaseError {
  constructor(message = 'Validation error', code = 'VALIDATION_ERROR') {
    super(message, 400, code);
  }
}

class NotFoundError extends BaseError {
  constructor(message = 'Resource not found', code = 'NOT_FOUND') {
    super(message, 404, code);
  }
}

class RateLimitError extends BaseError {
  constructor(message = 'Too many requests', code = 'RATE_LIMITED') {
    super(message, 429, code);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized', code = 'UNAUTHORIZED') {
    super(message, 401, code);
  }
}

class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden', code = 'FORBIDDEN') {
    super(message, 403, code);
  }
}

class ConflictError extends BaseError {
  constructor(message = 'Resource conflict', code = 'CONFLICT') {
    super(message, 409, code);
  }
}

export {
  BaseError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};
