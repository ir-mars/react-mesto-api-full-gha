const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("../middlewares/errorHandler");

const { PORT, BASE_PATH, DATABASE } = require("./configuration");

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
app.use(routes);
app.use(errorLogger);
app.use(errors());

/*app.use((err, req, res, next) => {
  errorHandler(err, res);
});*/

app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(`${BASE_PATH}:${PORT}`);
});
