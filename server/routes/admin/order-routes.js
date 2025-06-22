const express = require("express");
const router = express.Router();
const {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  getOrderStatistics,
} = require("../../controllers/admin/order-controller");

// Create Razorpay order
router.get("/get", getAllOrdersOfAllUser);
// Get order details for admin
router.get("/details/:id", getOrderDetailsForAdmin);
// Update order status
router.put("/update/:id", updateOrderStatus);
// Get order statistics
router.get("/statistics", getOrderStatistics);

module.exports = router;
