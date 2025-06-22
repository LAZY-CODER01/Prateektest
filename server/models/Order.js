const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      title: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      salePrice: { type: Number },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    default: 0,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "inProcess",
      "inShipping",
      "outForDelivery",
      "delivered",
      "cancelled",
    ],
    default: "inProcess",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
