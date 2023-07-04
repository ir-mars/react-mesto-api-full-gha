const jwt = require("jsonwebtoken");
const { CODE_JWT } = require("../utils/constants");
const { UnauthorizedError } = require("../errors/UnauthorizedError");

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
