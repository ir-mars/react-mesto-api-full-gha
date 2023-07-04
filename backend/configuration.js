const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || "https://localhost.ru";
const DATABASE = process.env.DATABASE || "mongodb://127.0.0.1:27017/mestodb";
const CODE_JWT =
  process.env.CODE_JWT ||
  "5NjYsImV4cCI6MTY4MzAyMzc2Nn0eyJfaWQiOiI2NDQ3OGJkZGRhNzVlYWYxZjZlNDU3YWEiLCJpYXQiOjE2ODI0MTg";
module.exports = {
  PORT,
  BASE_PATH,
  DATABASE,
  CODE_JWT,
};
