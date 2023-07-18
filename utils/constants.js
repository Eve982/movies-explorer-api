const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTORIZED = 401;
const SERVER_ERROR = 500;
const REGEX_LINK = /^https?:\/\/(www.)?\S+\.\S+#?/i;
const REGEX_COUNTRY = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const REGEX_RU_LANG = /^[\p{L}\s\d\-\(\)]+$/u;
const REGEX_EN_LANG = /^[a-zA-Z\s\d\-\(\)]+$/;
const REGEX_YEAR = /^(19\d{2}|20\d{2})$/;
const ALLOWED_CORS = [
  'https://eve982.movies.nomoredomains.xyz',
  'http://eve982.movies.nomoredomains.xyz',
  'http://localhost:3001',
  'http://localhost:3002',
];

module.exports = {
  BAD_REQUEST,
  UNAUTORIZED,
  SERVER_ERROR,
  CREATED,
  REGEX_LINK,
  REGEX_COUNTRY,
  REGEX_RU_LANG,
  REGEX_EN_LANG,
  REGEX_YEAR,
  ALLOWED_CORS,
};
