const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  email: { type: String, require: true, minLength: 3, maxLenghth: 200 },
  time: { type: String, require: true, minLength: 1, maxLenghth: 1000 },
  text: { type: String, require: true, minLength: 3, maxLenghth: 100000 },
})

module.exports = mongoose.model("Mensaje", MessageSchema);