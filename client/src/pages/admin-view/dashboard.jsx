import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserStatistics,
  fetchOrderStatistics,
  fetchProductStatistics,
} from "@/store/admin/dashboard-slice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserX,
  ShoppingCart,
  Package,
  Truck,
  Clock,
  TrendingUp,
  Activity,
  Box,
  Tag,
  AlertTriangle,
  PackageCheck,
} from "lucide-react";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { userStats, orderStats, productStats, isLoading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchUserStatistics());
    dispatch(fetchOrderStatistics());
    dispatch(fetchProductStatistics());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Monitor your store's performance and statistics
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Activity className="w-4 h-4 mr-2" />
          Live Data
        </Badge>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {/* Total Users */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Total Users
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-50">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : userStats.totalUsers.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-blue-50">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Total Products
              </CardTitle>
              <div className="p-2 rounded-lg bg-teal-50">
                <Box className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Available products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading
                  ? "..."
                  : productStats.totalProducts.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-teal-50">
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Total Orders
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-50">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              All time orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : orderStats.totalOrders.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-purple-50">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products on Sale */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                On Sale
              </CardTitle>
              <div className="p-2 rounded-lg bg-red-50">
                <Tag className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Discounted products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading
                  ? "..."
                  : productStats.productsOnSale.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-red-50">
                <TrendingUp className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verified Users */}
        {/* <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Verified Users
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-50">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Phone verified users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : userStats.verifiedUsers.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-green-50">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Completed Orders */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Completed Orders
              </CardTitle>
              <div className="p-2 rounded-lg bg-emerald-50">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Successfully delivered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading
                  ? "..."
                  : orderStats.completedOrders.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-emerald-50">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Low Stock
              </CardTitle>
              <div className="p-2 rounded-lg bg-orange-50">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Products with ≤5 stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : productStats.lowStock.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-orange-50">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In Transit Orders */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                In Transit
              </CardTitle>
              <div className="p-2 rounded-lg bg-cyan-50">
                <Truck className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Currently shipping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading
                  ? "..."
                  : orderStats.inTransitOrders.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-cyan-50">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unverified Users */}
        {/* <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Unverified Users
              </CardTitle>
              <div className="p-2 rounded-lg bg-yellow-50">
                <UserX className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Pending verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : userStats.unverifiedUsers.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-yellow-50">
                <TrendingUp className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Out of Stock */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Out of Stock
              </CardTitle>
              <div className="p-2 rounded-lg bg-gray-50">
                <PackageCheck className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Zero stock products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : productStats.outOfStock.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-gray-50">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In Process Orders */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                In Process
              </CardTitle>
              <div className="p-2 rounded-lg bg-indigo-50">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              Being processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {isLoading
                  ? "..."
                  : orderStats.inProcessOrders.toLocaleString()}
              </div>
              <div className="p-2 rounded-full bg-indigo-50">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* User Summary */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              User Overview
            </CardTitle>
            <CardDescription>
              Detailed breakdown of user registrations and verifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-700">
                Total Users
              </span>
              <span className="text-lg font-bold text-blue-900">
                {isLoading ? "..." : userStats.totalUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-700">
                Verified Users
              </span>
              <span className="text-lg font-bold text-green-900">
                {isLoading ? "..." : userStats.verifiedUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-yellow-700">
                Unverified Users
              </span>
              <span className="text-lg font-bold text-yellow-900">
                {isLoading ? "..." : userStats.unverifiedUsers.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Product Summary */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="w-5 h-5 text-teal-600" />
              Product Overview
            </CardTitle>
            <CardDescription>
              Complete product inventory and stock status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
              <span className="text-sm font-medium text-teal-700">
                Total Products
              </span>
              <span className="text-lg font-bold text-teal-900">
                {isLoading
                  ? "..."
                  : productStats.totalProducts.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-red-700">On Sale</span>
              <span className="text-lg font-bold text-red-900">
                {isLoading
                  ? "..."
                  : productStats.productsOnSale.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-orange-700">
                Low Stock
              </span>
              <span className="text-lg font-bold text-orange-900">
                {isLoading ? "..." : productStats.lowStock.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Out of Stock
              </span>
              <span className="text-lg font-bold text-gray-900">
                {isLoading ? "..." : productStats.outOfStock.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              Order Overview
            </CardTitle>
            <CardDescription>
              Complete order status breakdown and tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-700">
                Total Orders
              </span>
              <span className="text-lg font-bold text-purple-900">
                {isLoading ? "..." : orderStats.totalOrders.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <span className="text-sm font-medium text-emerald-700">
                Completed
              </span>
              <span className="text-lg font-bold text-emerald-900">
                {isLoading
                  ? "..."
                  : orderStats.completedOrders.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
              <span className="text-sm font-medium text-cyan-700">
                In Transit
              </span>
              <span className="text-lg font-bold text-cyan-900">
                {isLoading
                  ? "..."
                  : orderStats.inTransitOrders.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm font-medium text-indigo-700">
                In Process
              </span>
              <span className="text-lg font-bold text-indigo-900">
                {isLoading
                  ? "..."
                  : orderStats.inProcessOrders.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Verification Rate</p>
                <p className="text-2xl font-bold">
                  {isLoading
                    ? "..."
                    : userStats.totalUsers > 0
                    ? Math.round(
                        (userStats.verifiedUsers / userStats.totalUsers) * 100
                      )
                    : 0}
                  %
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Sale Rate</p>
                <p className="text-2xl font-bold">
                  {isLoading
                    ? "..."
                    : productStats.totalProducts > 0
                    ? Math.round(
                        (productStats.productsOnSale /
                          productStats.totalProducts) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <Tag className="w-8 h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {isLoading
                    ? "..."
                    : orderStats.totalOrders > 0
                    ? Math.round(
                        (orderStats.completedOrders / orderStats.totalOrders) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <Package className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Orders</p>
                <p className="text-2xl font-bold">
                  {isLoading
                    ? "..."
                    : (
                        orderStats.inTransitOrders + orderStats.inProcessOrders
                      ).toLocaleString()}
                </p>
              </div>
              <Truck className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
