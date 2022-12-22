const { DEFAULT_ERROR, MSG_DEFAULT } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || DEFAULT_ERROR;

  const message = statusCode === DEFAULT_ERROR ? MSG_DEFAULT : err.message;
  res.status(statusCode).send({ message });
  next();
};
