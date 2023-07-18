const mongoose = require('mongoose');
const Movie = require('../models/movies');
const NotFoundError = require('../errors/not_found_error');
const BadRequestError = require('../errors/bad_request_error');
const { CREATED } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).select({}).sort({ _id: -1 })
    .then((moviesData) => {
      res.send(moviesData);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    movieId, nameRU, nameEN, description, country, director, thumbnail, image, trailerLink,
    duration, year,
  } = req.body;
  Movie.create({
    movieId,
    nameRU,
    nameEN,
    description,
    owner: req.user._id,
    country,
    director,
    thumbnail,
    image,
    trailerLink,
    duration,
    year,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new NotFoundError('Переданы некорректные данные при создании карточки.'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.isMovieOwner(req.params.movieId, req.user._id)
    .then((movie) => movie.remove())
    .then((moviesData) => res.send(moviesData))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      }
      return next(err);
    });
};
