import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx";
import AuthLogin from "./pages/auth/login.jsx";
import AuthSignUp from "./pages/auth/signup.jsx";
import VerifyOTP from "./pages/auth/verify-otp.jsx";
import AdminLayout from "./components/admin-view/layout.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminOrders from "./pages/admin-view/order.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import AdminProducts from "./pages/admin-view/products.jsx";
import ShoppingLayout from "./components/shopping-view/layout.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import ShoppingListing from "./pages/shopping-view/listing.jsx";
import ProductDetailsPage from "./pages/shopping-view/product-details.jsx";
import RegaloPage from "./pages/shopping-view/regalo.jsx";
import AboutUs from "./pages/shopping-view/about.jsx";
import CheckAuth from "./components/common/check-auth.jsx";
import UnauthPage from "./pages/unauth-page/index.jsx";
import { RollerCoaster } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice/index.js";
import AdminProfile from "./pages/admin-view/profile.jsx";
import Loader from "./components/ui/loading.jsx";
import UserProfile from "./pages/shopping-view/profile.jsx";
import PaymentSuccess from "./pages/shopping-view/payment-success.jsx";
import DesktopOnly from "./components/common/desktop-only.jsx";
import TermsAndConditions from "./pages/shopping-view/terms.jsx";
import Search from "./pages/shopping-view/search.jsx";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    ); //  skellton loading timing 2 hours 56 minute

  return (
    <DesktopOnly>
      <div className="flex flex-col overflow-hidden bg-white">
        {/* common component */}
        {/* <h1>Header components</h1> */}
        <Routes>
        <Route
          path="/"
          element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              </CheckAuth>
            }
        />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="signup" element={<AuthSignUp />} />
            <Route path="verify-otp" element={<VerifyOTP />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="regalo" element={<RegaloPage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="search" element={<Search />} />

          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnauthPage />} />
        </Routes>
      </div>
    </DesktopOnly>
  );
};

export default App;
