const mongoose = require("mongoose");
const { ForbiddenError } = require("../errors/ForbiddenError");
const { NotFoundError } = require("../errors/NotFoundError");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const {
  ERROR_CONFLICT,
  ERROR_BAD_REQUEST,
  ERROR_INTERNAL_SERVER,
} = require("../utils/constants");

const { CastError, ValidationError } = mongoose.Error;

function errorHandler (error, response) {
  if (error.code === 11000) {
    return response
      .status(ERROR_CONFLICT)
      .send({ message: "Пользователь с указанным email уже зарегистрирован" });
  }
  if (error instanceof CastError || error instanceof ValidationError) {
    return response
      .status(ERROR_BAD_REQUEST)
      .send({ message: "Переданы некорректные данные" });
  }
  if (
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError
  ) {
    const { message, statusCode } = error;
    return response.status(statusCode).send({ message });
  }
  return response
    .status(ERROR_INTERNAL_SERVER)
    .send({ message: "Произошла ошибка сервера" });
}

function notFoundErrorThrow () {
  throw new NotFoundError();
}
module.exports = {
  errorHandler,
  notFoundErrorThrow,
};
