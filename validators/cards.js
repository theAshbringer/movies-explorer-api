const { celebrate, Joi } = require('celebrate');
const { OBJECT_ID_PATTERN, LINK_PATTERN } = require('../utils/constants');

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(OBJECT_ID_PATTERN),
  }),
});

module.exports.cardDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(LINK_PATTERN),
  }),
});
