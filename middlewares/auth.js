const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth-err');
const { MSG_MISSING_AUTH_HEADER } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    return next(new UnauthorizedError(MSG_MISSING_AUTH_HEADER));
  }

  try {
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');

    next();
  } catch (error) {
    next(new UnauthorizedError(MSG_MISSING_AUTH_HEADER));
  }
};
