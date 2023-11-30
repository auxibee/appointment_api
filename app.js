const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
require("express-async-errors");

const healthRoutes = require("./server/health/health.routes");
const authRoutes = require("./server/auth/auth.routes");
const adminRoutes = require("./server/admin/admin.router");
const appointmentRoutes = require("./server/appointment/appointment.routes");
const {
  errorHandler,
  noRouteHandler,
} = require("./server/shared/middlewares/errorHandler");

const { requireAuth } = require("./server/shared/middlewares/authRequired");
const { createSuperAdmin } = require("./server/shared/utils/createSuperAdmin");
const config = require("./server/config/general");

const app = express();

// middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/admin", requireAuth, adminRoutes);
app.use("/appointment", requireAuth, appointmentRoutes);

// error middlewares
app.use(noRouteHandler);
app.use(errorHandler);

module.exports = app;
