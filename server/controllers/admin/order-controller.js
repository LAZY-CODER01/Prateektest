const Order = require("../../models/Order");
const nodemailer = require("nodemailer");
const User = require("../../models/User");

// Reuse transporter from auth-controller.js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Replace with your Gmail
    pass: process.env.NODEMAILER_PASSWORD, // Replace with your app password
  },
});

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "username email");

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching orders",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "username email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "orders not found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching orders",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Fetch order and populate user email
    const order = await Order.findById(id).populate("user", "email");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    // Send email notification to user
    if (order.user && order.user.email) {
      const mailOptions = {
        from: "prateekkhare2111@gmail.com",
        to: order.user.email,
        subject: `Your Order Status Has Been Updated`,
        text: `Hello,\n\nYour order (ID: ${
          order.orderId || order._id
        }) status has been updated to: ${orderStatus}.\n\nThank you for shopping with us!`,
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Failed to send order status email:", err);
      }
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching orders",
    });
  }
};

const getOrderStatistics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const completedOrders = await Order.countDocuments({
      orderStatus: "delivered",
    });
    const inTransitOrders = await Order.countDocuments({
      orderStatus: { $in: ["inShipping", "outForDelivery"] },
    });
    const inProcessOrders = await Order.countDocuments({
      orderStatus: { $in: ["pending", "inProcess"] },
    });

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        completedOrders,
        inTransitOrders,
        inProcessOrders,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching order statistics",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  getOrderStatistics,
};
