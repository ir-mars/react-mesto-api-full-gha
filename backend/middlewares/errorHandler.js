/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const { ForbiddenError } = require("../errors/ForbiddenError");
const { NotFoundError } = require("../errors/NotFoundError");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const { ConflictError } = require("../errors/ConflictError");

const { CastError, ValidationError } = mongoose.Error;
const {
  ERROR_BAD_REQUEST,
  ERROR_INTERNAL_SERVER,
} = require("../utils/constants");

function errorHandler (error, response) {
  if (error instanceof CastError || error instanceof ValidationError) {
    return response
      .status(ERROR_BAD_REQUEST)
      .send({ message: "Переданы некорректные данные" });
  }
  if (
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError ||
    error instanceof ConflictError
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
