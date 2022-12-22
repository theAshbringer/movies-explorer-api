const Movie = require('../models/movie');
const {
  SUCCESS,
  CREATED,
  CARD_DELETED,
  MSG_CARD_NOT_FOUND,
  MSG_FORBIDDEN,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
} = require('../utils/constants');
const { throwMessage } = require('../utils/common');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;

  Movie.create({ name, link, owner: req.user })
    .then(({ _id }) => Movie.findById(_id)
      .orFail(new NotFoundError(MSG_CARD_NOT_FOUND))
      .populate(['owner'])
      .then((newCard) => res.status(CREATED).send(newCard)))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationError(MSG_INVALID_CARD_DATA));
      }
      return next(err);
    });
};

module.exports.getMovie = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .sort({ _id: -1 })
    .then((cards) => res.status(SUCCESS).send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(cardId).orFail(new NotFoundError(MSG_CARD_NOT_FOUND))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (String(card.owner) !== userId) {
        return Promise.reject(new ForbiddenError(MSG_FORBIDDEN));
      }
    })
    .then(() => Movie.deleteOne({ _id: cardId }).orFail(new NotFoundError(MSG_CARD_NOT_FOUND)))
    .then(() => res.status(SUCCESS).send(throwMessage(CARD_DELETED)))
    .catch(next);
};