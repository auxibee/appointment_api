function setBearerToken(req, res, next) {
  if (
    req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    req.token = token;
  }
  next();
}

module.exports = { setBearerToken };
