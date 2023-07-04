const { ERROR_CONFLICT } = require("../utils/constants");

class ConflictError extends Error {
  constructor(message = "Ошибка добавления (данные должны быть уникальными)") {
    super(message);
    this.statusCode = ERROR_CONFLICT;
  }
}
module.exports = {
  ConflictError,
};
