const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const NotFoundError = require('../errors/not_found_error');
const ForbiddenError = require('../errors/forbidden_error');
const {
  REGEX_RU_LANG, REGEX_EN_LANG, REGEX_COUNTRY, REGEX_YEAR,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    nameRU: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа, введено {VALUE}.'],
      maxlength: [30, 'Максимальная длина поля 30 символа, введено {VALUE}.'],
      match: [REGEX_RU_LANG, 'Поле должно содержать только кириллицу.'],
      required: true,
    },
    nameEN: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа, введено {VALUE}.'],
      maxlength: [30, 'Максимальная длина поля 30 символа, введено {VALUE}.'],
      match: [REGEX_EN_LANG, 'Поле должно содержать только латиницу.'],
      required: true,
    },
    description: {
      type: String,
      minlength: [10, 'Минимальная длина поля 10 символа, введено {VALUE}.'],
      maxlength: [300, 'Максимальная длина поля 300 символа, введено {VALUE}.'],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    country: {
      type: String,
      minlength: [4, 'Минимальная длина поля 4 символа, введено {VALUE}.'],
      maxlength: [60, 'Максимальная длина поля 60 символа, введено {VALUE}.'],
      validate: {
        validator(v) {
          return REGEX_COUNTRY.test(v);
        },
        message: 'Значение поля {VALUE} не соответствует формату названия страны.',
      },
      required: true,
    },
    director: {
      type: String,
      minlength: [3, 'Минимальная длина поля 3 символа, введено {VALUE}.'],
      maxlength: [50, 'Максимальная длина поля 50 символа, введено {VALUE}.'],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v), message: 'Некорректная ссылка на миниатюру постера.',
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v), message: 'Некорректная ссылка на постер.',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v), message: 'Некорректный URL-адрес.',
      },
    },
    duration: {
      type: Number,
      min: [1, 'Продолжительность фильма не может быть меньше минуты, введено {VALUE}.'],
      required: true,
    },
    year: {
      type: String,
      required: true,
      minlength: [4, 'Минимальная длина поля 4 символа, введено {VALUE}.'],
      maxlength: [4, 'Максимальная длина поля 4 символа, введено {VALUE}.'],
      match: [REGEX_YEAR, 'Поле должно содержать 4 цифры, введено {VALUE}.'],
    },
  },
  { versionKey: false },
);

movieSchema.statics.isMovieOwner = function (movieId, userId) {
  return this.findOne({ movieId }).orFail(new NotFoundError('movieNotFound'))
    .then((movie) => {
      const movieOwnerId = JSON.stringify(movie.owner._id);
      const userID = JSON.stringify(userId);
      if (movieOwnerId !== userID) {
        return Promise.reject(new ForbiddenError('notOwnMovie'));
      }
      return movie;
    });
};

module.exports = mongoose.model('movie', movieSchema);
