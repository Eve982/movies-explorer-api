const mongoose = require('mongoose');
const Movie = require('../models/movies');
const NotFoundError = require('../errors/not_found_error');
const BadRequestError = require('../errors/bad_request_error');
const DataExistError = require('../errors/data_exist_error');
const { CREATED } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId }).select({}).sort({ _id: -1 })
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
        return next(new NotFoundError('invalidData'));
      } if (err.code === 11000) {
        return next(new DataExistError('movieExistError', req.body.movieId));
      } return next(err);
    });
};

// module.exports.deleteMovie = (req, res, next) => {
//   // console.log('req.user._id: ', req.user._id);
//   // console.log('req.params.movieId: ', req.params.movieId);
//   // console.log('typeof req.params.movieId: ', typeof req.params.movieId);
//   // console.log('typeof req.user._id: ', typeof req.user._id);
//   Movie.find({ movieId: req.params.movieId, owner: req.user._id })
//     .then((movie) => console.log('movie: ', movie))
//     .then((movie) => {
//       Movie.findOneAndDelete({ _id: movie._id }).exec();
//     })
//     .then((moviesData) => res.send(moviesData))
//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         return next(new BadRequestError('invalidData'));
//       }
//       return next(err);
//     });
// };

module.exports.deleteMovie = (req, res, next) => {
  Movie.deleteOne({ movieId: req.params.movieId, owner: req.user._id })
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new NotFoundError('movieNotFound');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('invalidData'));
      }
      return next(err);
    });
};
