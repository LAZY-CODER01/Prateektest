const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    productId: String,
    description: String,
    dimensions: String,
    category: String,
    product: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
