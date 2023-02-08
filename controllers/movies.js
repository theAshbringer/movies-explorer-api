const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');
const {
  statusCode, errorMessage, errorName, MOVIE_DELETED,
} = require('../utils/constants');

module.exports.createMovie = async (req, res, next) => {
  const movie = req.body;
  const alreadyExist = await Movie.exists({ ...movie, owner: req.user });

  if (!alreadyExist) {
    Movie.create({ ...movie, owner: req.user })
      .then(({ _id }) => Movie.findById(_id)
        .orFail(new NotFoundError(errorMessage.movie.NOT_FOUND))
        .populate(['owner'])
        .then((newMovie) => res.status(statusCode.CREATED).send(newMovie)))
      .catch((err) => {
        if (err.name === errorName.VALIDATION_ERROR) {
          return next(new ValidationError(errorMessage.movie.INVALID_DATA));
        }
        return next(err);
      });
  }
  res.status(statusCode.NO_CONTENT);
};

module.exports.getMovies = (req, res, next) => {
  const { _id: userId } = req.user;
  Movie.find({ owner: userId })
    .sort({ _id: -1 })
    .then((movies) => res.status(statusCode.SUCCESS).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(id)
    .orFail(new NotFoundError(errorMessage.movie.NOT_FOUND))
    .then((movie) => {
      if (String(movie.owner) !== userId) {
        return Promise.reject(new ForbiddenError(errorMessage.movie.FOREIGN));
      }
      return movie;
    })
    .then(() => Movie.deleteOne({ _id: id }).orFail(
      new NotFoundError(errorMessage.movie.NOT_FOUND),
    ))
    .then(() => res.status(statusCode.SUCCESS).send(({ message: MOVIE_DELETED })))
    .catch(next);
};
