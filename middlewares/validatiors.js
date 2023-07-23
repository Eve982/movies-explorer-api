const { Joi, celebrate } = require('celebrate');

const { object, string } = Joi.types();
const {
  REGEX_LINK, REGEX_COUNTRY, REGEX_RU_LANG, REGEX_EN_LANG, REGEX_YEAR,
} = require('../utils/constants');

module.exports.validateCreateUser = celebrate({
  body: object.keys({
    name: string.min(2).max(30),
    email: string.required().email(),
    password: string.required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: object.keys({
    email: string.required().email(),
    password: string.required(),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: object.keys({
    name: string.required().min(2).max(30),
    email: string.required().email(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: object.keys({
    movieId: Joi.number().required(),
    nameRU: string.required().min(2).max(30).regex(REGEX_RU_LANG),
    nameEN: string.required().min(2).max(30).regex(REGEX_EN_LANG),
    description: string.required().min(10).max(300),
    country: string.required().min(4).max(60).regex(REGEX_COUNTRY),
    director: string.required().min(3).max(50),
    thumbnail: string.required().regex(REGEX_LINK),
    image: string.required().regex(REGEX_LINK),
    trailerLink: string.required().regex(REGEX_LINK),
    duration: Joi.number().required().greater(0),
    year: string.required().min(4).max(4).regex(REGEX_YEAR),
  }),
});

module.exports.validateMovieId = celebrate({
  params: object.keys({
    movieId: Joi.number().required(),
  }),
});
