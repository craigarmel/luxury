const errorHandler = (err, req, res, next) => {
  // Check if response was already sent
  if (res.headersSent) {
    return next(err);
  }

  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = {
      message: 'Resource not found',
      statusCode: 404
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = {
      message: 'Duplicate field value entered',
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error = {
      message: Object.values(err.errors).map(val => val.message).join(', '),
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      statusCode: 401
    };
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;