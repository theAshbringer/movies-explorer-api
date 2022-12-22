const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  SUCCESS,
  CREATED,
  MSG_USER_NOT_FOUND,
  MSG_REGISTERED_USER,
  VALIDATION_ERROR,
  MSG_INVALID_USER_DATA,
  USER_NOT_UNIQUE_ERROR,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const ValidationError = require('../errors/validation-err');

// module.exports.login = (req, res, next) => {
//   const { NODE_ENV, JWT_SECRET } = process.env;
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
//         { expiresIn: '7d' },
//       );
//       res
//         .cookie('jwt', token, {
//           maxAge: 3600000 * 24 * 7, httpOnly: true, secure: NODE_ENV === 'production', sameSite: false,
//         })
//         .status(SUCCESS)
//         .send({ data: { _id: user._id, email: user.email } });
//     })
//     .catch(next);
// };

// module.exports.logout = (req, res) => {
//   res
//     .clearCookie('jwt', { httpOnly: true })
//     .status(204)
//     .end();
// };

// module.exports.createUser = (req, res, next) => {
//   const { password } = req.body;

//   bcrypt.hash(password, 10)
//     .then((hash) => User.create({
//       ...req.body, password: hash,
//     }))
//     .then(({
//       name, about, avatar, email,
//     }) => res.status(CREATED).send({
//       name, about, avatar, email,
//     }))
//     .catch((err) => {
//       if (err.code === USER_NOT_UNIQUE_ERROR) {
//         return next(new ConflictError(MSG_REGISTERED_USER));
//       }
//       if (err.name === VALIDATION_ERROR) {
//         return next(new ValidationError(MSG_INVALID_USER_DATA));
//       }
//       return next(err);
//     });
// };

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { returnDocument: 'after', runValidators: true },
  ).orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationError(MSG_INVALID_USER_DATA));
      }
      return next(err);
    });
};

module.exports.getProfile = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => res.status(SUCCESS).send(user))
    .catch(next);
};
