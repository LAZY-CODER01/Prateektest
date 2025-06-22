import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShoppingCart, CarTaxiFront } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import {
  createRazorpayOrder,
  resetPaymentStatus,
} from "@/store/shop/payment-slice";
import axios from "axios";
import { clearCart } from "@/store/shop/cart-slice";

function ShoppingCheckout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { paymentStatus, order, error } = useSelector((state) => state.payment);

  console.log(currentSelectedAddress, "currentSelectedAddress");

  // console.log(orderId, "orderId");

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

  useEffect(() => {
    if (user && user.isPhoneVerified === false) {
      toast.error("Please verify your phone number first.", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      navigate("/shop/profile", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (paymentStatus === "failed" && error) {
      toast.error("Payment initiation failed: " + (error.error || error), {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      dispatch(resetPaymentStatus());
    }
  }, [paymentStatus, error, dispatch]);

  useEffect(() => {
    if (paymentStatus === "success" && order) {
      // Open Razorpay modal
      const options = {
        key: "rzp_test_1VXt3qheaj82O6", // Use env in prod
        amount: order.amount,
        currency: order.currency,
        name: "Your Shop Name",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          toast.success(
            "Payment successful! Payment ID: " + response.razorpay_payment_id,
            {
              style: {
                backgroundColor: "#22c55e",
                color: "#fff",
                fontWeight: "bolder",
                fontSize: "15px",
              },
            }
          );
          // Call backend to verify payment and save order
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/shop/order/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user?._id || user?.id,
                address: currentSelectedAddress,
                cartItems: cartItems.map((item) => ({
                  product: item.productId,
                  quantity: item.quantity,
                  price: item.price,
                  salePrice: item.salePrice,
                })),
                amount: finalTotal,
                subtotal: totalCartAmount,
                deliveryCharge: deliveryCharge,
              }
            );
            if (verifyRes.data.success) {
              await dispatch(clearCart(user?._id || user?.id)).unwrap();

              navigate("/shop/payment-success", {
                state: { order: verifyRes.data.order },
              });
              // Clear cart items after successful payment
            } else {
              toast.error("Order verification failed.");
            }
          } catch (err) {
            toast.error("Order verification failed.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        notes: {
          address: currentSelectedAddress
            ? JSON.stringify(currentSelectedAddress)
            : "",
        },
        theme: {
          color: "#A67C52",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      dispatch(resetPaymentStatus());
    }
  }, [
    paymentStatus,
    order,
    user,
    currentSelectedAddress,
    cartItems,
    finalTotal,
    navigate,
    dispatch,
  ]);

  const handleCheckout = () => {
    if (!currentSelectedAddress) {
      toast.error("Please select a delivery address.", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty.", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#fff",
          fontWeight: "bolder",
          fontSize: "15px",
        },
      });
      return;
    }
    dispatch(
      createRazorpayOrder({
        amount: finalTotal,
        currency: "INR",
        receipt: `rcptid_${user?._id}_${Date.now()}`,
      })
    );
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col">
          {/* Selected Address Display */}
          {currentSelectedAddress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-amber-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Selected Address
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-800">
                  {currentSelectedAddress.fullName}
                </p>
                <p className="text-gray-600">
                  {currentSelectedAddress.address}
                </p>
                <p className="text-gray-600">
                  {currentSelectedAddress.city}, {currentSelectedAddress.state}{" "}
                  {currentSelectedAddress.pincode}
                </p>
                <p className="text-gray-600">
                  Phone: {currentSelectedAddress.phone}
                </p>
                {currentSelectedAddress.notes && (
                  <p className="text-gray-600">
                    Notes: {currentSelectedAddress.notes}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <motion.div className="mb-10 flex items-center justify-center mt-8">
            <Badge
              className="px-4 py-2 text-sm  font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Manage Your Order
            </Badge>
          </motion.div>
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
            : null}

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
          <div className="mt-4 w-full">
            <Button
              className="w-1/2 p-7 italic text-lg bg-gradient-to-r from-[#C9A66B] to-[#A67C52] text-black font-bold shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-2xl  hover:text-white animate-pulse"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                border: "none",
              }}
              onClick={handleCheckout}
              disabled={paymentStatus === "loading"}
            >
              {paymentStatus === "loading"
                ? "Processing..."
                : "Checkout with RazorPay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
