const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: String,
      name: String,
      image: String,
      price: Number,
      description: String,
      qnty: Number,
      category: {
        _id: String,
        name: String,
        image: String
      }
    }
  ]
});
module.exports = mongoose.model('Cart', cartSchema);
