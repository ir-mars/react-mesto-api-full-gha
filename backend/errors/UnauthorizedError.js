const { ERROR_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = 'Авторизация не удалась') {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED;
  }
}
module.exports = {
  UnauthorizedError,
};