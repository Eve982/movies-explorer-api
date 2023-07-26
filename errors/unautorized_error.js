class UnauthorizedError extends Error {
  constructor(errorType) {
    super();
    this.statusCode = 401;
    this.errorType = errorType;
    this.message = this.getMessage();
  }

  getMessage() {
    if (this.errorType === 'invalidLoginData') {
      return 'Неправильные почта или пароль.';
    }
    if (this.errorType === 'unauthorized') {
      return 'Необходима авторизация';
    }
    return 'Ошибка авторизации';
  }
}

module.exports = UnauthorizedError;
