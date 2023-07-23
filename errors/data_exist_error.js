class DataExistError extends Error {
  constructor(errorType, dataType) {
    super();
    this.statusCode = 409;
    this.errorType = errorType;
    this.dataType = dataType;
    this.message = this.getMessage();
  }

  getMessage() {
    if (this.errorType === 'emailExistError') {
      return `Пользователь с email ${this.dataType} уже зарегистрирован.`;
    }
    if (this.errorType === 'movieExistError') {
      return `Фильм с movieId ${this.dataType} уже сохранен.`;
    }
    return 'Такая запись уже есть в базе данных';
  }
}

module.exports = DataExistError;
