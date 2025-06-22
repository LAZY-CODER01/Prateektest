import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { CarTaxiFront, FileText, User, Mail } from "lucide-react";
import { generateInvoice } from "@/lib/invoice-generator";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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

function AdminOrdersView() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(orderId) {
    dispatch(getOrderDetailsForAdmin(orderId));
    setSelectedOrderId(orderId);
  }

  function handleDialogOpenChange(open) {
    if (!open) {
      setSelectedOrderId(null);
      dispatch(resetOrderDetails());
    }
  }

  function handleQuickDownloadInvoice(order) {
    try {
      generateInvoice(order);
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice");
    }
  }

  useEffect(() => {
    // Fetch all orders for admin when the component mounts

    dispatch(getAllOrderForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderDetails");

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(orderList) && orderList.length > 0 ? (
                orderList.map((order, idx) => (
                  <TableRow key={order._id || idx}>
                    <TableCell>{order.orderId || order._id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {order.user?.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-sm ${getPaymentStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status
                          ? order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)
                          : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>₹{order.amount || "-"}</span>
                        {order.deliveryCharge && order.deliveryCharge > 0 ? (
                          <span
                            className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1"
                            title={`Includes ₹${order.deliveryCharge} delivery charge`}
                          >
                            <CarTaxiFront className="w-3 h-3" />
                            Delivery
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQuickDownloadInvoice(order)
                                }
                                className="text-amber-600 border-amber-200 hover:bg-amber-50"
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download Invoice</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Dialog
                          open={selectedOrderId === order._id}
                          onOpenChange={handleDialogOpenChange}
                        >
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleFetchOrderDetails(order._id)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <AdminOrderDetailsView
                            order={orderDetails || order}
                          />
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;
