const noRouteHandler = async (req, res, next) => {
  const error = new Error('No matching route');
  error.statusCode = 404;
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = async (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  res.status(status).json({ error: message });
};

module.exports = { noRouteHandler, errorHandler };
