const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth-err');
const { DEV_SECRET } = require('../utils/config');
const { errorMessage } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    return next(new UnauthorizedError(errorMessage.auth.MISSING_TOKEN));
  }

  try {
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);

    next();
  } catch (error) {
    next(new UnauthorizedError(errorMessage.auth.MISSING_TOKEN));
  }
};
