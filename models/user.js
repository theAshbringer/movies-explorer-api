const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/unauth-err');
const { MSG_USER_UNAUTHORIZED } = require('../utils/constants');
const { emailValidator } = require('../validators/schema-validators');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    validate: emailValidator,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail(new UnauthorizedError(MSG_USER_UNAUTHORIZED))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError(MSG_USER_UNAUTHORIZED));
      }

      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
