const app = require("./app");
const logger = require("./config/logger");

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

const server = app.listen(port, host, () => {
  logger.info({ host, port }, "MiniCart backend started");
});

function shutdown(signal) {
  logger.info({ signal }, "Shutdown signal received");

  server.close((error) => {
    if (error) {
      logger.error({ error }, "Backend failed to shut down cleanly");
      process.exit(1);
    }

    logger.info("MiniCart backend stopped");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));