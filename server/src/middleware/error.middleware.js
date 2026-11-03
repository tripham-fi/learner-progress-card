
const HttpException = require('../exception/http-exception.model');

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.errorCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof HttpException) {
    statusCode = err.errorCode;
    message = err.message;
  }

  res.status(statusCode).json({
    status: statusCode,
    message: message
  });
};

module.exports = errorMiddleware;