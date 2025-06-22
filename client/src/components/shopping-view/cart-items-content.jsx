import { Minus, Plus, Trash, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.shoppingProducts);

  // Find the product for this cart item
  const product = productsList?.find(
    (p) => p._id === cartItem.productId || p.id === cartItem.productId
  );
  const totalStock = product?.totalStock ?? Infinity;
  const isAtStockLimit = cartItem?.quantity >= totalStock;

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is updated successfully!", {
          style: {
            backgroundColor: "#003300",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    console.log("Deleting cart item:", getCartItem);
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is deleted successfully!", {
          style: {
            backgroundColor: "#003300",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "15px",
          },
        });
      }
    });
  }

  const itemPrice =
    cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;
  const totalPrice = itemPrice * cartItem?.quantity;

  return (
    <motion.div
      className="relative overflow-hidden"
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3,
      }}
    >
      <div className="m-2 flex items-center space-x-4 p-3 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden ">
        {/* Animated background gradient */}
        <div className="absolute bg-gradient-to-r from-amber-50/50 to-amber-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Product Image with hover effect */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={cartItem?.image || cartItem?.product?.image}
            alt={cartItem?.title || cartItem?.product?.title || "Product image"}
            className="w-20 h-20 rounded-lg object-cover shadow-md border-2 border-gray-100 transition-all duration-300"
          />
          {cartItem?.salePrice > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
              }}
            >
              SALE
            </motion.div>
          )}
        </motion.div>

        {/* Product Details */}
        <div className="flex-1 relative z-10">
          <motion.h3
            className="text-sm font-bold text-gray-900 truncate group-hover:text-amber-800 transition-colors duration-300"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {cartItem?.title || cartItem?.product?.title || "Product Title"}
          </motion.h3>

          {/* Price display */}
          <div className="flex items-center gap-2 mt-1">
            {cartItem?.salePrice > 0 && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {cartItem?.price?.toFixed(2)}
              </span>
            )}
            <span className="text-sm font-semibold text-green-600">
              Rs. {itemPrice?.toFixed(2)}
            </span>
            
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center mt-3 gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-2 hover:border-amber-300 transition-all duration-200"
                disabled={cartItem?.quantity === 1}
                onClick={() => handleUpdateQuantity(cartItem, "minus")}
              >
                <Minus className="w-4 h-4" />
                <span className="sr-only">Decrease</span>
              </Button>
            </motion.div>

            <motion.span
              className="font-semibold text-lg min-w-[2rem] text-center"
              key={cartItem?.quantity}
              initial={{ scale: 1.2, color: "#3b82f6" }}
              animate={{ scale: 1, color: "#1f2937" }}
              transition={{ duration: 0.2 }}
            >
              {cartItem?.quantity}
            </motion.span>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-2 hover:border-amber-300 hover:bg-blue-50 transition-all duration-200"
                onClick={() => handleUpdateQuantity(cartItem, "plus")}
                disabled={isAtStockLimit}
              >
                <Plus className="w-4 h-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Price and Delete */}
        <div className="flex flex-col items-end relative z-10">
          <motion.div
            className="text-right"
            key={totalPrice}
            initial={{ scale: 1.2, color: "#3b82f6" }}
            animate={{ scale: 1, color: "#1f2937" }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-bold text-sm text-gray-900">
              Rs. {totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {cartItem?.quantity} × Rs. {itemPrice?.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.8 }}
            className="mt-3"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
              onClick={() => handleCartItemDelete(cartItem)}
            >
              <Trash className="w-4 h-4" />
              <span className="sr-only">Delete item</span>
            </Button>
          </motion.div>
        </div>

        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;
