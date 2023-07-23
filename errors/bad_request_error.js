class BadRequestError extends Error {
  constructor(errorType) {
    super();
    this.statusCode = 400;
    this.errorType = errorType;
    this.message = this.getMessage();
  }

  getMessage() {
    if (this.errorType === 'invalidData') {
      return 'Переданы некорректные данные.';
    }
    return 'Некорректные данные.';
  }
}

module.exports = BadRequestError;
