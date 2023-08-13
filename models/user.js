const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/unautorized_error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля 2 символа, введено {VALUE}.'],
    maxlength: [30, 'Максимальная длина поля 30 символов, введено {VALUE}.'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v), message: 'Неправильный формат почты.',
    },
  },
  password: {
    type: String,
    required: true,
    // minlength: [3, 'Минимальная длина поля 3 символа, введено {VALUE}.'],
    // maxlength: [8, 'Максимальная длина поля 8 символов, введено {VALUE}.'],
    // match: [REGEX_PASSWORD,
    //   'Пароль должен быть длиной от 3 до 14 символов,
    //  и содержать минимум одну цифру, одну заглавную букву и один специальный символ.'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('invalidLoginData'));
      } return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('invalidLoginData'));
          } return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
