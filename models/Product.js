const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Product = new Schema({
    product_name: String,
    price: Number,
    qty: Number
});

module.exports = mongoose.model('product',Product);