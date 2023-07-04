const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const routes = require("./routes/index");
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT, BASE_PATH, DATABASE } = require("./configuration");
const { errorHandler } = require("./middlewares/errorHandler");

// создаем приложение
const app = express();

// подключение к бд
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(requestLogger);
// роуты
app.use(routes);
app.use(errorLogger);
app.use(errors()); // celebrate
// eslint-disable-next-line no-unused-vars
app.use((err, _, res, _next) => {
  errorHandler(err, res);
});
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(`${BASE_PATH}:${PORT}`);
});
