const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unautorized_error');

module.exports = (req, res, next) => {
  const jwtToken = () => {
    if (req.cookies.jwt) {
      return req.cookies.jwt;
    }
    return next(new UnauthorizedError('unauthorized'));
  };
  let payload;
  try {
    payload = jwt.verify(jwtToken(), NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('unauthorized'));
  }
  req.user = payload;
  return next();
};
