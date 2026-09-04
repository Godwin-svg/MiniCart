const pino = require("pino");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: {
    service: "minicart-backend",
    environment: process.env.NODE_ENV || "development"
  }
});

module.exports = logger;