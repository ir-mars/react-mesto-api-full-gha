const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const { CODE_JWT } = require("../configuration");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, CODE_JWT);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }
  next();
};
