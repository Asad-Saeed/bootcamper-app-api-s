class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;

// /**
//  * Custom error class for API responses
//  * @extends Error
//  */
// class ErrorResponse extends Error {
//   /**
//    * Creates an ErrorResponse instance
//    * @param {string|object} message - Error message or error object
//    * @param {number} statusCode - HTTP status code
//    * @param {object} [additionalInfo] - Additional error information
//    */
//   constructor(message, statusCode, additionalInfo = {}) {
//     // Handle if message is an object
//     const errorMessage = message instanceof Object ?
//       message.message || 'Internal Server Error' :
//       message;

//     super(errorMessage);

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true;  // Indicates if error is operational or programming

//     // Add additional error information
//     Object.assign(this, additionalInfo);

//     // Add timestamp
//     this.timestamp = new Date().toISOString();

//     // Capture stack trace
//     Error.captureStackTrace(this, this.constructor);

//     // Optional: Add request ID if you're using one
//     // this.requestId = additionalInfo.requestId;
//   }

//   /**
//    * Creates a formatted error response
//    * @returns {Object} Formatted error response
//    */
//   toJSON() {
//     return {
//       status: this.status,
//       statusCode: this.statusCode,
//       message: this.message,
//       ...(process.env.NODE_ENV === 'development' && {
//         stack: this.stack,
//         timestamp: this.timestamp
//       }),
//       ...(this.additionalInfo && { details: this.additionalInfo })
//     };
//   }

//   /**
//    * Creates a 404 Not Found error
//    * @param {string} [message] - Custom error message
//    * @returns {ErrorResponse}
//    */
//   static notFound(message = 'Resource not found') {
//     return new ErrorResponse(message, 404);
//   }

//   /**
//    * Creates a 400 Bad Request error
//    * @param {string} [message] - Custom error message
//    * @returns {ErrorResponse}
//    */
//   static badRequest(message = 'Bad request') {
//     return new ErrorResponse(message, 400);
//   }

//   /**
//    * Creates a 401 Unauthorized error
//    * @param {string} [message] - Custom error message
//    * @returns {ErrorResponse}
//    */
//   static unauthorized(message = 'Unauthorized access') {
//     return new ErrorResponse(message, 401);
//   }

//   /**
//    * Creates a 403 Forbidden error
//    * @param {string} [message] - Custom error message
//    * @returns {ErrorResponse}
//    */
//   static forbidden(message = 'Forbidden access') {
//     return new ErrorResponse(message, 403);
//   }

//   /**
//    * Creates a 500 Internal Server error
//    * @param {string} [message] - Custom error message
//    * @returns {ErrorResponse}
//    */
//   static internal(message = 'Internal server error') {
//     return new ErrorResponse(message, 500);
//   }
// }

// export default ErrorResponse;

// //// Basic Usage////////////

// // Basic usage
// throw new ErrorResponse('User not found', 404);

// // With additional info
// throw new ErrorResponse('Validation failed', 400, {
//   fields: ['email', 'password'],
//   details: 'Invalid email format'
// });

// // Using static methods
// throw ErrorResponse.notFound('User not found');
// throw ErrorResponse.unauthorized('Invalid credentials');
// throw ErrorResponse.forbidden('Insufficient permissions');
// throw ErrorResponse.badRequest('Invalid input');
// throw ErrorResponse.internal('Database connection failed');

// // In your controllers:
// try {
//   const user = await User.findById(id);
//   if (!user) {
//     throw ErrorResponse.notFound('User not found');
//   }
// } catch (err) {
//   next(err);
// }
