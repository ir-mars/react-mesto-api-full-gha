const { Joi, celebrate } = require("celebrate");
const { REGEXP_URL } = require("../utils/constants");

module.exports.validateCardData = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(REGEXP_URL),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});
