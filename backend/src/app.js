const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinoHttp = require("pino-http");

const logger = require("./config/logger");
const productRoutes = require("./routes/productRoutes");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"]
  })
);

app.use(express.json({ limit: "100kb" }));

app.use(
  pinoHttp({
    logger,
    genReqId(req, res) {
      const requestId =
        req.headers["x-request-id"] || crypto.randomUUID();

      res.setHeader("X-Request-ID", requestId);
      return requestId;
    }
  })
);

app.get("/", (req, res) => {
  return res.status(200).json({
    application: "MiniCart",
    service: "Backend API",
    message: "MiniCart backend API is running"
  });
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    application: "MiniCart",
    service: "Backend API",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/products", productRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;