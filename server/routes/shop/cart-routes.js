const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
  clearCart, // Uncomment if you want to include the clearCart functionality
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);
router.delete('/:userId', clearCart);

module.exports = router;
