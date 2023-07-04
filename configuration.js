const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || "https://localhost.ru";
const DATABASE = process.env.DATABASE || "mongodb://127.0.0.1:27017/mestodb";
module.exports = {
  PORT,
  BASE_PATH,
  DATABASE,
};
