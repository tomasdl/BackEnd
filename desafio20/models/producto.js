const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  title: { type: String, require: true, minLength: 3, maxLenghth: 200 },
  price: { type: Number, require: true, minLength: 1, maxLenghth: 100000 },
  thumbnail: { type: String, require: true, minLength: 3, maxLenghth: 200 },
});

module.exports = {
    Producto: mongoose.model("Producto", ProductoSchema)
}