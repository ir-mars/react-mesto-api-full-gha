const REGEXP_URL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const SUCCES_ADDED_STATUS = 201;
const ERROR_INTERNAL_SERVER = 500;
const ERROR_NOT_FOUND = 404;
const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_CONFLICT = 409;

module.exports = {
  REGEXP_URL,
  SUCCES_ADDED_STATUS,
  ERROR_INTERNAL_SERVER,
  ERROR_NOT_FOUND,
  ERROR_BAD_REQUEST,
  ERROR_FORBIDDEN,
  ERROR_UNAUTHORIZED,
  ERROR_CONFLICT,
};
