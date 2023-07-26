class NotFoundError extends Error {
  constructor(errorType, req) {
    super();
    this.statusCode = 404;
    this.errorType = errorType;
    this.req = req;
    this.message = this.getMessage();
  }

  getMessage() {
    if (this.errorType === 'userNotFound') {
      return 'Пользователя с таким ID не существует.';
    }
    if (this.errorType === 'invalidData') {
      return 'Переданы некорректные данные.';
    }
    if (this.errorType === 'movieNotFound') {
      return 'Такой фильм не существует.';
    }
    if (this.errorType === 'urlNotFound') {
      return `Запрашиваемый ресурс ${this.req.baseUrl} не найден.`;
    }
    return 'Некорректные данные.';
  }
}

module.exports = NotFoundError;
