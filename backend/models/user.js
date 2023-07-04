/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { REGEXP_URL } = require("../utils/constants");
const { UnauthorizedError } = require("../errors/UnauthorizedError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator (url) {
          return REGEXP_URL.test(url);
        },
        message ({ value }) {
          return `${value}- не верная ссылка`;
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        message ({ value }) {
          return `Ошибка! ${value} не является электронной почтой`;
        },
        validator (email) {
          return validator.isEmail(email);
        },
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  { toJSON: { useProjection: true }, toObject: { useProjection: true } }
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Неправильные почта или пароль");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new UnauthorizedError("Неправильные почта или пароль");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
