import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  IndianRupee,
  Eye,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Users,
  ShoppingBag,
  CarTaxiFront,
} from "lucide-react";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUserId } from "@/store/shop/payment-slice";
import { SparklesText } from "../magicui/sparkles-text";
import { BorderBeam } from "../magicui/border-beam";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

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

function OrderTrackingCard({ order, index }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  function handleDialogOpenChange(open) {
    if (!open) {
      setSelectedOrderId(null);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div variants={cardVariants}>
        <Card className="relative overflow-hidden group cursor-pointer">
          <BorderBeam size={250} duration={12} delay={9} />

          {/* Animated background gradient */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div> */}

          <CardContent className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200">
                  {getStatusIcon(order.orderStatus)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Order #{order.orderId?.slice(-8) || order._id?.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800 mb-1 flex items-center justify-end gap-2">
                  {/* ₹{order.amount || "0"} */}
                  {order.deliveryCharge && order.deliveryCharge > 0 ? (
                    <span
                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1"
                      // title={`Delivery Charge: ₹${order.deliveryCharge}`}
                    >
                      <CarTaxiFront className="w-3 h-3" />
                      Delivery Charge
                    </span>
                  ) : (
                    <span
                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1"
                      // title={`Delivery Charge: ₹${order.deliveryCharge}`}
                    >
                      <CarTaxiFront className="w-3 h-3" />
                      Free Delivery
                    </span>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-xs ${getPaymentStatusColor(
                    order.status
                  )}`}
                >
                  {order.status
                    ? order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)
                    : "-"}
                </span>
              </div>
            </div>

            {/* Order Status Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Order Progress
                </span>
                <span
                  className={`px-2 py-1 rounded-full font-semibold text-xs ${getStatusColor(
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
                      : order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)
                    : "-"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      order.orderStatus === "pending"
                        ? "20%"
                        : order.orderStatus === "inProcess"
                        ? "40%"
                        : order.orderStatus === "inShipping"
                        ? "60%"
                        : order.orderStatus === "outForDelivery"
                        ? "80%"
                        : order.orderStatus === "delivered"
                        ? "100%"
                        : "0%",
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
              <div className="space-y-1">
                {Array.isArray(order.cartItems) &&
                order.cartItems.length > 0 ? (
                  order.cartItems.slice(0, 2).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 truncate flex-1">
                        {item.title || "Product"}
                      </span>
                      <span className="text-gray-500 ml-2">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No items found</span>
                )}
                {Array.isArray(order.cartItems) &&
                  order.cartItems.length > 2 && (
                    <span className="text-xs text-gray-400">
                      +{order.cartItems.length - 2} more items
                    </span>
                  )}
              </div>
            </div>

            {/* Action Button */}
            <Dialog
              open={selectedOrderId === order._id}
              onOpenChange={handleDialogOpenChange}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => setSelectedOrderId(order._id)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DialogTrigger>
              <ShoppingOrderDetailsView order={order} />
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ShoppingOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.payment);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id || user?._id) {
      dispatch(getAllOrderByUserId(user?.id || user?._id));
    }
  }, [dispatch, user]);

  const stats = [
    {
      number: orderList?.length || 0,
      label: "Total Orders",
      icon: ShoppingBag,
      color: "from-amber-400 to-orange-400",
    },
    {
      number:
        orderList?.filter((order) => order.orderStatus === "delivered")
          ?.length || 0,
      label: "Delivered",
      icon: CheckCircle,
      color: "from-emerald-400 to-teal-400",
    },
    {
      number:
        orderList?.filter(
          (order) =>
            order.orderStatus === "inProcess" ||
            order.orderStatus === "inShipping" ||
            order.orderStatus === "outForDelivery"
        )?.length || 0,
      label: "In Transit",
      icon: Truck,
      color: "from-indigo-400 to-purple-400",
    },
    {
      number:
        orderList?.filter((order) => order.status === "paid")?.length || 0,
      label: "Paid Orders",
      icon: Award,
      color: "from-cyan-400 to-blue-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-x-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Enhanced Attractive Pattern Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-30">
          {/* Corner borders */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-amber-600"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-amber-600"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-amber-600"></div>

          {/* Floating circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-3/4 right-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-orange-300 to-red-300 opacity-40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          ></motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge
              className="px-4 py-2 text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
                color: "#FFF",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Your Order Journey
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <SparklesText text="Track Your Orders" className="block mb-2" />
            <span className="block text-3xl md:text-4xl">Order History</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-600"
          >
            Stay updated with your order status and track the journey of your
            handcrafted treasures
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <BorderBeam size={200} duration={12} delay={index * 2} />
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Array.isArray(orderList) && orderList.length > 0 ? (
            orderList.map((order, index) => (
              <OrderTrackingCard
                key={order._id || index}
                order={order}
                index={index}
              />
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center">
                <Package className="w-12 h-12 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your journey with our handcrafted collection
              </p>
              <Button
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                onClick={() => navigate("/shop/listing")}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ShoppingOrders;
