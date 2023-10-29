const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
require('express-async-errors');

const healthRoutes = require('./server/health/health.routes');
const { errorHandler, noRouteHandler } = require('./server/shared/middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/health', healthRoutes);

app.use(noRouteHandler);
app.use(errorHandler);

module.exports = app;
