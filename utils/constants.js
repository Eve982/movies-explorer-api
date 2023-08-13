const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTORIZED = 401;
const SERVER_ERROR = 500;
const REGEX_LINK = /^https?:\/\/(www.)?\S+\.\S+#?/i;
const REGEX_YEAR = /^(19\d{2}|20\d{2})$/;
const ALLOWED_CORS = [
  'https://eve982.movies.nomoredomains.xyz',
  'http://eve982.movies.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];
const LOGIN_MESSAGE = 'Вход выполнен успешно!';
const LOGOUT_MESSAGE = 'Вы вышли из аккаунта.';
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,14}$/;
// const REGEX_COUNTRY = /^[^"]+"([^"]+)"$/;
// const REGEX_RU_LANG = /^[а-яА-ЯёЁ\s]+$/;
// const REGEX_EN_LANG = /^[a-zA-Z\s\d\-()]+$/;

module.exports = {
  CREATED,
  BAD_REQUEST,
  UNAUTORIZED,
  SERVER_ERROR,
  REGEX_LINK,
  REGEX_YEAR,
  ALLOWED_CORS,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
  REGEX_EMAIL,
  // REGEX_PASSWORD,
  // REGEX_COUNTRY,
  // REGEX_RU_LANG,
  // REGEX_EN_LANG,

};
