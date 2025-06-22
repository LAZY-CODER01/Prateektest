const express = require("express");
const router = express.Router();
const {
  createRazorpayOrder,
  verifyAndSaveOrder,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

// Create Razorpay order
router.post("/razorpay-order", createRazorpayOrder);

// Verify payment
router.post("/verify-payment", verifyAndSaveOrder);
// Get all orders by user
router.get("/list/:userId", getAllOrdersByUser);
// Get order details by ID
router.get("/details/:id", getOrderDetails);

module.exports = router;
