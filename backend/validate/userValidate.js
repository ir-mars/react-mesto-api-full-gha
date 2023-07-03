const { Joi, celebrate } = require("celebrate");
const { REGEXP_URL } = require("../utils/constants");

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEXP_URL),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REGEXP_URL),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
