import { motion } from "framer-motion";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { BorderBeam } from "../magicui/border-beam";
import { SparklesText } from "../magicui/sparkles-text";
import { Card, CardContent } from "../ui/card";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  IndianRupee,
  Home,
  Phone,
  FileText,
  ArrowRight,
  Sparkles,
  CarTaxiFront,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
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

function getStatusIcon(status) {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "inProcess":
      return <Package className="w-4 h-4" />;
    case "inShipping":
      return <Truck className="w-4 h-4" />;
    case "outForDelivery":
      return <MapPin className="w-4 h-4" />;
    case "delivered":
      return <CheckCircle className="w-4 h-4" />;
    case "cancelled":
      return <Clock className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
}

function OrderProgressTimeline({ orderStatus }) {
  const steps = [
    { status: "pending", label: "Order Placed", icon: Clock },
    { status: "inProcess", label: "Processing", icon: Package },
    { status: "inShipping", label: "Shipped", icon: Truck },
    { status: "outForDelivery", label: "Out for Delivery", icon: MapPin },
    { status: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const getCurrentStepIndex = () => {
    const statusOrder = [
      "pending",
      "inProcess",
      "inShipping",
      "outForDelivery",
      "delivered",
    ];
    return statusOrder.indexOf(orderStatus);
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
        Order Progress
      </h3>
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center relative z-10"
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.div>
                <span
                  className={`text-xs mt-2 text-center ${
                    isCompleted ? "text-gray-800 font-medium" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

function ShoppingOrderDetailsView({ order }) {
  const navigate = useNavigate();

  if (!order) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto no-scrollbar">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                <SparklesText text="Order Details" className="text-2xl" />
              </h2>
              <p className="text-gray-600">
                Order #{order.orderId || order._id}
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      try {
                        generateInvoice(order);
                        toast.success("Invoice downloaded successfully!");
                      } catch (error) {
                        console.error("Error generating invoice:", error);
                        toast.error("Failed to generate invoice");
                      }
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2 ml-4 mt-5"
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
        </motion.div>

        {/* Order Progress Timeline */}
        {order.orderStatus !== "cancelled" && (
          <motion.div variants={itemVariants}>
            <OrderProgressTimeline orderStatus={order.orderStatus} />
          </motion.div>
        )}

        {/* Order Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Order Summary */}
          <motion.div variants={itemVariants}>
            <Card className="relative overflow-hidden">
              <BorderBeam size={200} duration={12} delay={3} />
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-amber-500" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-sm flex ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {getStatusIcon(order.orderStatus)}
                      <span className="ml-1">
                        {order.orderStatus
                          ? order.orderStatus === "inProcess"
                            ? "In Process"
                            : order.orderStatus === "inShipping"
                            ? "Shipping"
                            : order.orderStatus === "outForDelivery"
                            ? "Out for Delivery"
                            : order.orderStatus.charAt(0).toUpperCase() +
                              order.orderStatus.slice(1)
                          : "-"}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Status:</span>
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
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-700">
                      ₹{(order.subtotal || order.amount || 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery Charge */}
                  {order.deliveryCharge && order.deliveryCharge > 0 ? (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <CarTaxiFront className="w-4 h-4" />
                        Delivery Charge:
                      </span>
                      <span className="font-medium text-orange-600">
                        ₹{order.deliveryCharge.toFixed(2)}
                      </span>
                    </div>
                  ) : null}

                  <Separator className="my-3" />

                  {/* Final Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-semibold">
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg text-gray-800 flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {(order.amount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipping Information */}
          <motion.div variants={itemVariants}>
            <Card className="relative overflow-hidden">
              <BorderBeam size={200} duration={12} delay={6} />
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Home className="w-5 h-5 mr-2 text-amber-500" />
                  Shipping Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="w-4 h-4 mr-2 mt-1 text-gray-500" />
                    <div>
                      <p className="text-gray-800 font-medium">
                        {order.address?.fullName || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-500" />
                    <div>
                      <p className="text-gray-800 font-medium">
                        {order.address?.address || "-"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {order.address?.city}, {order.address?.state}{" "}
                        {order.address?.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-800">
                      {order.address?.phone || "-"}
                    </span>
                  </div>
                  {order.address?.notes && (
                    <div className="flex items-start">
                      <FileText className="w-4 h-4 mr-2 mt-1 text-gray-500" />
                      <span className="text-gray-600 text-sm">
                        {order.address.notes}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Order Items */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden">
            <BorderBeam size={200} duration={12} delay={9} />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-amber-500" />
                Order Items
              </h3>
              <div className="space-y-4">
                {Array.isArray(order.cartItems) &&
                order.cartItems.length > 0 ? (
                  order.cartItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <button
                          className="text-blue-600 underline hover:text-blue-800 cursor-pointer bg-transparent border-none p-0 m-0 text-left font-medium"
                          onClick={() =>
                            navigate(`/shop/product/${item.product}`)
                          }
                          type="button"
                        >
                          {item.title || item.product}
                        </button>
                        <p className="text-gray-600 text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ₹{item.salePrice || item.price}
                        </p>
                        {item.salePrice && item.salePrice !== item.price && (
                          <p className="text-gray-500 text-sm line-through">
                            ₹{item.price}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No items found.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
