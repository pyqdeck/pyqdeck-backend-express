const errorFormatter = {
  formatError(error, _statusCode = 500) {
    const isOperational = error instanceof Error && error.statusCode;

    if (isOperational) {
      return {
        status: 'error',
        message: error.message,
        code: error.code || 'INTERNAL_ERROR',
        statusCode: error.statusCode,
      };
    }

    return {
      status: 'error',
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
    };
  },
};

export default errorFormatter;
