const logger = require("../config/logger");

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  logger.error(
    {
      error: {
        name: error.name,
        message: error.message,
        stack:
          process.env.NODE_ENV === "production"
            ? undefined
            : error.stack
      },
      request: {
        id: req.id,
        method: req.method,
        path: req.originalUrl
      },
      statusCode
    },
    "Request failed"
  );

  const message =
    statusCode === 500
      ? "An unexpected server error occurred."
      : error.message;

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      requestId: req.id
    }
  });
}

module.exports = errorHandler;