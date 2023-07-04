const mongoose = require("mongoose");
const { REGEXP_URL } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        return REGEXP_URL.test(url);
      },
      message: function ({ value }) {
        return value + "- не верная ссылка";
      },

    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
);

module.exports = mongoose.model("card", cardSchema);
