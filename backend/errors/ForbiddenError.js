const { ERROR_FORBIDDEN } = require("../utils/constants");

class ForbiddenError extends Error {
  constructor(message = "Ошибка доступа") {
    super(message);
    this.statusCode = ERROR_FORBIDDEN;
  }
}
module.exports = {
  ForbiddenError,
};
