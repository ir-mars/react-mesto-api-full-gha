require("dotenv").config();

const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || "https://localhost.ru";
const DATABASE = process.env.DATABASE || "mongodb://127.0.0.1:27017/mestodb";
const CODE_JWT =
  process.env.NODE_ENV === "production"
    ? process.env.CODE_JWT
    : "super-secret-code";
console.log(CODE_JWT);
module.exports = {
  PORT,
  BASE_PATH,
  DATABASE,
  CODE_JWT,
};
