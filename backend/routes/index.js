/* eslint-disable prettier/prettier */
const router = require("express").Router();
const routerUsers = require("./users");
const routerCards = require("./cards");
const { login, createUser } = require("../controllers/users");
const { validateRegister, validateLogin } = require("../validate/userValidate");
const { NotFoundError } = require("../errors/NotFoundError");
const { errorHandler } = require("../middlewares/errorHandler");
const auth = require("../middlewares/auth");

function notfoundHandler (req, res) {
  errorHandler(new NotFoundError(), res);
}
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
router.post("/signin", validateLogin, login);
router.post("/signup", validateRegister, createUser);
router.use(auth);
router.use("/users", routerUsers);
router.use("/cards", routerCards);
router.use("*", notfoundHandler);


module.exports = router;
