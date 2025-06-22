const razorpay = require("../../helpers/razorpay");
const crypto = require("crypto");
const Order = require("../../models/Order");
const Product = require("../../models/Products");
const User = require("../../models/User");
const nodemailer = require("nodemailer");

// Reuse transporter from auth-controller.js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:  process.env.NODEMAILER_EMAIL, // Replace with your Gmail
    pass: process.env.NODEMAILER_PASSWORD, // Replace with your app password
  },
});

// Create Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: receipt || `rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

exports.verifyAndSaveOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      address,
      cartItems,
      amount,
      subtotal,
      deliveryCharge,
    } = req.body;

    console.log(
      "[verifyAndSaveOrder] Incoming body:",
      JSON.stringify(req.body, null, 2)
    );
    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SIGNATURE) // Use env in prod
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("[verifyAndSaveOrder] Signature mismatch", {
        generated_signature,
        razorpay_signature,
      });
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Check userId validity
    if (!userId || typeof userId !== "string" || userId.length !== 24) {
      console.error("[verifyAndSaveOrder] Invalid or missing userId:", userId);
      return res.status(400).json({ error: "Invalid or missing userId" });
    }

    // Fetch product titles and update stock for each cart item
    const cartItemsWithTitle = await Promise.all(
      cartItems.map(async (item) => {
        const productDoc = await Product.findById(item.product);
        if (!productDoc) {
          // This will bubble up to the main catch block
          throw new Error(`Product not found: ${item.product}`);
        }
        // Check if there is enough stock
        if (productDoc.totalStock < item.quantity) {
          throw new Error(
            `Not enough stock for ${productDoc.title}. Available: ${productDoc.totalStock}, Requested: ${item.quantity}`
          );
        }
        // Decrease stock
        productDoc.totalStock -= item.quantity;
        await productDoc.save();
        return {
          ...item,
          title: productDoc.title, // Add product title to cart item
        };
      })
    );

    // Save order
    const order = await Order.create({
      user: userId,
      address,
      cartItems: cartItemsWithTitle,
      amount,
      subtotal: subtotal || amount,
      deliveryCharge: deliveryCharge || 0,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      status: "paid",
    });

    // Fetch user email
    const user = await User.findById(userId);
    if (user && user.email) {
      // Build order summary for email
      const productList = cartItemsWithTitle.map(item =>
        `- ${item.title} x${item.quantity} @ Rs.${item.salePrice > 0 ? item.salePrice : item.price}`
      ).join("\n");
      const mailOptions = {
        from: "prateekkhare2111@gmail.com",
        to: user.email,
        subject: "Order Confirmation - Your Order with Your Shop Name",
        text: `Thank you for your purchase!\n\nOrder Details:\nOrder ID: ${order._id}\n\nProducts:\n${productList}\n\nSubtotal: Rs.${order.subtotal}\nDelivery Charge: Rs.${order.deliveryCharge}\nTotal: Rs.${order.amount}\n\nDelivery Address:\n${order.address.fullName}\n${order.address.address}\n${order.address.city}, ${order.address.state} - ${order.address.pincode}\nPhone: ${order.address.phone}\n\nWe will notify you when your order is shipped.\n\nThank you for shopping with us!`,
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        console.error("[verifyAndSaveOrder] Failed to send confirmation email:", emailErr);
      }
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("[verifyAndSaveOrder] Order verification error:", error);
    if (error.stack) console.error(error.stack);
    res
      .status(500)
      .json({ error: "Order verification failed", details: error.message });
  }
};

exports.getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });

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

exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

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
