const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    countInStock: { type: Number, required: true }
});

const Product = mongoose.model("Product", productsSchema);
module.exports = Product;