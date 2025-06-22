// const { configureStore } = require("@reduxjs/toolkit");
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice from "./admin/order-slice";
import dashboardSlice from "./admin/dashboard-slice";
import paymentReducer from "./shop/payment-slice";
import shoppingProductSlice from "./shop/product-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopSearchSlice from "./shop/search-slice"; // Uncomment if you want to use search slice
import shopReviewSlice from "./shop/review-slice"; // Uncomment if you want to use review slice    

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    adminOrder: adminOrderSlice,
    dashboard: dashboardSlice,
    shoppingProducts: shoppingProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    payment: paymentReducer,
    shopSearch: shopSearchSlice, // Add search slice to the store
    shopReview: shopReviewSlice, // Add review slice to the store
  },
});

export default store;
