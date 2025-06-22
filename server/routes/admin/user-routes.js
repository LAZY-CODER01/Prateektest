const express = require("express");
const router = express.Router();
const {
  getUserStatistics,
} = require("../../controllers/admin/user-controller");

// Get user statistics
router.get("/statistics", getUserStatistics);

module.exports = router;
