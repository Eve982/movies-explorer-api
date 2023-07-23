class ForbiddenError extends Error {
  constructor(errorType) {
    super();
    this.statusCode = 403;
    this.errorType = errorType;
    this.message = this.getMessage();
  }

  getMessage() {
    if (this.errorType === 'notOwnMovie') {
      return 'Нельзя удалять чужой фильм.';
    } return 'Действие запрещено.';
  }
}

module.exports = ForbiddenError;
