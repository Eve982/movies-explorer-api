const { Joi, celebrate } = require('celebrate');

const {
  REGEX_LINK, REGEX_COUNTRY, REGEX_RU_LANG, REGEX_EN_LANG, REGEX_YEAR,
} = require('../utils/constants');

module.exports.validateCreateUser = celebrate({
  body: Joi.object.keys({
    name: Joi.string.min(2).max(30).required(),
    email: Joi.string.email().required(),
    password: Joi.string.required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object.keys({
    email: Joi.string.email().required(),
    password: Joi.string.required(),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object.keys({
    name: Joi.string.min(2).max(30).required(),
    email: Joi.string.email().required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object.keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string.required().min(2).max(30).regex(REGEX_RU_LANG),
    nameEN: Joi.string.required().min(2).max(30).regex(REGEX_EN_LANG),
    description: Joi.string.required().min(10).max(300),
    country: Joi.string.required().min(4).max(60).regex(REGEX_COUNTRY),
    director: Joi.string.required().min(3).max(50),
    thumbnail: Joi.string.required().regex(REGEX_LINK),
    image: Joi.string.required().regex(REGEX_LINK),
    trailerLink: Joi.string.required().regex(REGEX_LINK),
    duration: Joi.number().required().greater(0),
    year: Joi.string.required().min(4).max(4).regex(REGEX_YEAR),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object.keys({
    movieId: Joi.number().required(),
  }),
});
