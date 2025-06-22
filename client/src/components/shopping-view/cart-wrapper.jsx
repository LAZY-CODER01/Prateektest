import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CreditCard, CarTaxiFront } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Calculate delivery charge
  const deliveryCharge = totalCartAmount < 500 ? 100 : 0;
  const finalTotal = totalCartAmount + deliveryCharge;

  const itemCount = cartItems?.length || 0;

  return (
    <SheetContent className="sm:max-w-md bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <SheetHeader className="">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SheetTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            >
              <ShoppingCart className="w-6 h-6 text-amber-600" />
            </motion.div>
            Your Cart
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-amber-600 text-white text-sm px-2 py-1 rounded-full font-medium"
              >
                {itemCount}
              </motion.span>
            )}
          </SheetTitle>
        </motion.div>
      </SheetHeader>

      <motion.div
        className="mt-4 space-y-6 max-h-[55vh] overflow-y-auto pr-4 pb-4 cart-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <motion.div
                key={item._id || item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.02 }}
                className="transform transition-all duration-200 mb-4"
              >
                <UserCartItemsContent cartItem={item} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6"
              >
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
              </motion.div>
              <p className="text-gray-500 text-lg font-medium mb-2">
                Your cart is empty
              </p>
              <p className="text-gray-400 text-sm">
                Add some products to get started!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className=" border-t pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-4">
          {/* Subtotal */}
          <motion.div
            className="m-4 flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-medium text-lg text-gray-700">Subtotal</span>
            <span className="font-medium text-lg text-gray-700">
              Rs. {totalCartAmount.toFixed(2)}
            </span>
          </motion.div>

          {/* Delivery Charge */}
          {deliveryCharge > 0 && (
            <motion.div
              className="m-4 flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <span className="font-medium text-lg text-orange-700 flex items-center gap-2">
                <CarTaxiFront className="w-5 h-5" />
                Delivery Charge
              </span>
              <span className="font-medium text-lg text-orange-700">
                Rs. {deliveryCharge.toFixed(2)}
              </span>
            </motion.div>
          )}

          {/* Free delivery message */}
          {deliveryCharge > 0 && (
            <motion.div
              className="m-4 p-2 bg-blue-50 rounded-lg border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-blue-700 text-center">
                💡 Add Rs. {(500 - totalCartAmount).toFixed(2)} more to get free
                delivery!
              </p>
            </motion.div>
          )}

          {/* Final Total */}
          <motion.div
            className="m-4 flex justify-between items-center p-4 bg-gradient-to-r rounded-lg border border-amber-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-bold text-xl text-gray-800">Total</span>
            <motion.span
              className="font-bold text-xl italic"
              key={finalTotal}
              initial={{ scale: 1.2, color: "#C9A66B" }}
              animate={{ scale: 1, color: "#A67C52" }}
              transition={{ duration: 0.3 }}
              style={{
                color: "#A67C52",
              }}
            >
              Rs. {finalTotal.toFixed(2)}
            </motion.span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            {itemCount !== 0 ? (
              <Button
                className="w-3/4 m-5 text-amber-50 text-lg font-semibold py-3 p-6 rounded-lg shadow-xl hover:shadow-xl hover:scale-105 hover:shadow-amber-100 hover:text-amber-900 transition-all duration-300 flex items-center justify-center gap-2"
                disabled={itemCount === 0}
                style={{
                  background:
                    "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                }}
                onClick={() => {
                  navigate("/shop/checkout"), setOpenCartSheet(false);
                }}
              >
                <ShoppingCart className="w-7 h-7" />
                {itemCount === 0 ? "Cart is Empty" : "Proceed to Checkout"}
              </Button>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </SheetContent>
  );
}

export default UserCartWrapper;
