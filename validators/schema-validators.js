const validate = require('mongoose-validator');
const validator = require('validator');

module.exports.urlValidator = validate({
  validator: (value) => validator.isURL(
    value,
    {
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: true,
    },
  ),
  message: 'Передан невалидный URL',
});

module.exports.emailValidator = validate({
  validator: (value) => validator.isEmail(value),
  message: 'Передан невалидный e-mail',
});
