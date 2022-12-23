const { celebrate, Joi } = require('celebrate');
const { OBJECT_ID_PATTERN, LINK_PATTERN } = require('../utils/constants');

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(OBJECT_ID_PATTERN),
  }),
});

module.exports.movieDataValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_PATTERN),
    trailerLink: Joi.string().required().pattern(LINK_PATTERN),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(LINK_PATTERN),
    movieId: Joi.number().required(),
  }),
});
