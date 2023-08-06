const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { REGEX_YEAR } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа, введено {VALUE}.'],
      maxlength: [300, 'Максимальная длина поля 300 символа, введено {VALUE}.'],
      required: true,
    },
    nameEN: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа, введено {VALUE}.'],
      maxlength: [300, 'Максимальная длина поля 300 символа, введено {VALUE}.'],
      required: true,
    },
    description: {
      type: String,
      minlength: [10, 'Минимальная длина поля 10 символа, введено {VALUE}.'],
      maxlength: [3000, 'Максимальная длина поля 3000 символа, введено {VALUE}.'],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    country: {
      type: String,
      minlength: [3, 'Минимальная длина поля 3 символа, введено {VALUE}.'],
      maxlength: [600, 'Максимальная длина поля 600 символа, введено {VALUE}.'],
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

movieSchema.index({ movieId: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
