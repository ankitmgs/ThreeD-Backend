const mongoose = require("../connection");

const schema = mongoose.Schema({
  title: String,
  description: String,
  uplodedby: String,
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "userID",
  },
  data: String,
  thumbnail: String,
  category: String,
  created: { type: Date, default: new Date() },
});

const model = mongoose.model("modal", schema);

module.exports = model;
