import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/shop/cart-slice";

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (order) {
      // Clear cart on component mount (safety for page refresh)
      dispatch(clearCart(order.user));
    } else {
      navigate("/shop/checkout");
    }
  }, [order, navigate, dispatch]);

  if (!order) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-amber-300 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg mb-2">
          Order ID: <span className="font-mono">{order.orderId}</span>
        </p>
        <p className="text-lg mb-2">
          Payment ID: <span className="font-mono">{order.paymentId}</span>
        </p>

        {/* Amount Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Amount Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{(order.subtotal || order.amount || 0).toFixed(2)}</span>
            </div>
            {order.deliveryCharge && order.deliveryCharge > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>Delivery Charge:</span>
                <span>₹{order.deliveryCharge.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total Amount:</span>
              <span>₹{(order.amount || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
          <div className="bg-gray-100 rounded p-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">{order.address?.fullName || "N/A"}</p>
              <p>{order.address?.address || "N/A"}</p>
              <p>
                {order.address?.city}, {order.address?.state}{" "}
                {order.address?.pincode}
              </p>
              <p>Phone: {order.address?.phone || "N/A"}</p>
              {order.address?.notes && (
                <p className="text-gray-600">Notes: {order.address.notes}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <ul className="list-disc pl-5">
            {order.cartItems.map((item, idx) => (
              <li key={idx} className="mb-1">
                Product: <span className="font-mono">{item.product}</span> |
                Qty: {item.quantity} | Price: ₹{item.price}{" "}
                {item.salePrice ? `(Sale: ₹${item.salePrice})` : ""}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 font-bold"
          onClick={() => navigate("/shop/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
