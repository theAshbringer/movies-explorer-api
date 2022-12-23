const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  DEV_SECRET,
  statusCode,
  errorMessage,
  errorName,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const ValidationError = require('../errors/validation-err');

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          secure: NODE_ENV === 'production',
          sameSite: false,
        })
        .status(statusCode.SUCCESS)
        .send({ data: { _id: user._id, email: user.email } });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt', { httpOnly: true })
    .status(statusCode.NO_CONTENT)
    .end();
};

module.exports.createUser = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...req.body, password: hash,
    }))
    .then((newUser) => res.status(statusCode.CREATED).send(newUser))
    .catch((err) => {
      if (err.code === statusCode.USER_NOT_UNIQUE_ERROR) {
        return next(new ConflictError(errorMessage.user.REGISTERED_USER));
      }
      if (err.name === errorName.VALIDATION_ERROR) {
        return next(new ValidationError(errorMessage.user.INVALID_DATA));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { returnDocument: 'after', runValidators: true },
  ).orFail(new NotFoundError(errorMessage.user.NOT_FOUND))
    .then((user) => res.status(statusCode.SUCCESS).send(user))
    .catch((err) => {
      if (err.name === errorName.VALIDATION_ERROR) {
        return next(new ValidationError(errorMessage.user.INVALID_DATA));
      }
      return next(err);
    });
};

module.exports.getProfile = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).orFail(new NotFoundError(errorMessage.user.NOT_FOUND))
    .then((user) => res.status(statusCode.SUCCESS).send(user))
    .catch(next);
};
