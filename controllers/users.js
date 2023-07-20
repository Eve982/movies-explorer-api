const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not_found_error');
const EmailExistError = require('../errors/email_exist_error');
const BadRequestError = require('../errors/bad_request_error');
const { CREATED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getMyPage = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователя с таким ID не существует.'))
    .then((userData) => res.send(userData))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователя с таким ID не существует.'))
    .then((userData) => res.send(userData))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new NotFoundError('Переданы некорректные данные при создании пользователя.'));
      } if (err.code === 11000) {
        return next(new EmailExistError(`Пользователь с email ${req.body.email} уже зарегистрирован.`));
      } return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name, email, password: hash }))
    .then((user) => res.status(CREATED)
      .send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new NotFoundError('Переданы некорректные данные при создании пользователя.'));
      } if (err.code === 11000) {
        return next(new EmailExistError(`Пользователь с email ${email} уже зарегистрирован.`));
      } return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie(
        'jwt',
        token,
        { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true },
      ).send({ message: 'Вход выполнен успешно!' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из аккаунта.' });
};
