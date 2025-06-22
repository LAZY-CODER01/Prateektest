import { useDispatch, useSelector } from "react-redux";
import CommonForm, { CommonForm_2 } from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import {
  getAllOrderForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "sonner";
import { CarTaxiFront, Download, FileText, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { generateInvoice } from "@/lib/invoice-generator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const initialFormData = {
  status: "",
};

function getStatusColor(status) {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 border border-amber-200";
    case "inProcess":
      return "bg-indigo-100 text-indigo-800 border border-indigo-200";
    case "inShipping":
      return "bg-cyan-100 text-cyan-800 border border-cyan-200";
    case "outForDelivery":
      return "bg-orange-100 text-orange-800 border border-orange-200";
    case "delivered":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "cancelled":
      return "bg-rose-100 text-rose-800 border border-rose-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
}

function getPaymentStatusColor(status) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "created":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function AdminOrderDetailsView({ order }) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUpdateStatus(event) {
    event.preventDefault();
    setLoading(true);
    const { status } = formData;
    dispatch(updateOrderStatus({ id: order._id, orderStatus: status }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForAdmin(order._id));
          dispatch(getAllOrderForAdmin());
          setFormData(initialFormData);
          toast.success("Order status updated successfully");
        }
      })
      .finally(() => setLoading(false));
  }

  function handleDownloadInvoice() {
    try {
      generateInvoice(order);
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice");
    }
  }

  if (!order) return null;

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6">
        {/* Header with Invoice Download Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 underline">
            Order Details
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleDownloadInvoice}
                  className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2 mt-5"
                >
                  <FileText className="w-4 h-4" />
                  Download Invoice
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate and download PDF invoice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid gap-2">
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{order.orderId || order._id}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "-"}
            </Label>
          </div>

          {/* Customer Information */}
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">User Email-Id </p>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mt-1">
                <Mail className="w-4 h-4 text-gray-500" />
                <Label className="text-sm text-gray-600">
                  {order.user?.email || "N/A"}
                </Label>
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Subtotal</p>
            <Label>₹{(order.subtotal || order.amount || 0).toFixed(2)}</Label>
          </div>

          {/* Delivery Charge */}
          {order.deliveryCharge && order.deliveryCharge > 0 ? (
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium flex items-center gap-2">
                <CarTaxiFront className="w-4 h-4" />
                Delivery Charge
              </p>
              <Label className="text-orange-600">
                ₹{order.deliveryCharge.toFixed(2)}
              </Label>
            </div>
          ) : null}

          <Separator className="my-3" />

          {/* Final Total */}
          <div className="flex mt-1 items-center justify-between">
            <p className="font-semibold text-lg">Total Amount</p>
            <Label className="font-bold text-lg">
              ₹{(order.amount || 0).toFixed(2)}
            </Label>
          </div>

          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <span
              className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusColor(
                order.orderStatus
              )}`}
            >
              {order.orderStatus
                ? order.orderStatus === "inProcess"
                  ? "In Process"
                  : order.orderStatus === "inShipping"
                  ? "Shipping"
                  : order.orderStatus === "outForDelivery"
                  ? "Out for Delivery"
                  : order.orderStatus === "delivered"
                  ? "Delivered"
                  : order.orderStatus === "cancelled"
                  ? "Cancelled"
                  : order.orderStatus.charAt(0).toUpperCase() +
                    order.orderStatus.slice(1)
                : "-"}
            </span>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <span
              className={`px-3 py-1 rounded-full font-semibold text-sm ${getPaymentStatusColor(
                order.status
              )}`}
            >
              {order.status
                ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                : "-"}
            </span>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
                order.cartItems.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>Product: {item.title || item.product}</span>
                    <span>
                      Qty: {item.quantity} | ₹{item.salePrice || item.price}
                    </span>
                  </li>
                ))
              ) : (
                <li>No items found.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold">Shipping Information</div>
            <div className="grid gap-0.5">
              <span>{order.address?.fullName || "-"}</span>
              <span>{order.address?.address || "-"}</span>
              <span>{order.address?.city || "-"}</span>
              <span>{order.address?.state || "-"}</span>
              <span>{order.address?.pincode || "-"}</span>
              <span>{order.address?.phone || "-"}</span>
              <span>{order.address?.notes || "-"}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm_2
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "Shipping" },
                  { id: "outForDelivery", label: "Out for Delivery" },
                  { id: "delivered", label: "Delivered" },
                  { id: "cancelled", label: "Cancelled" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={loading ? "Updating..." : "Update Order Status"}
            isBtnDisabled={loading}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
