import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userStats: {
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
  },
  orderStats: {
    totalOrders: 0,
    completedOrders: 0,
    inTransitOrders: 0,
    inProcessOrders: 0,
  },
  productStats: {
    totalProducts: 0,
    productsOnSale: 0,
    outOfStock: 0,
    lowStock: 0,
    categoryStats: [],
  },
};

export const fetchUserStatistics = createAsyncThunk(
  "/admin/fetchUserStatistics",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/users/statistics`
    );
    return response.data;
  }
);

export const fetchOrderStatistics = createAsyncThunk(
  "/admin/fetchOrderStatistics",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/statistics`
    );
    return response.data;
  }
);

export const fetchProductStatistics = createAsyncThunk(
  "/admin/fetchProductStatistics",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/statistics`
    );
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload.data;
      })
      .addCase(fetchUserStatistics.rejected, (state) => {
        state.isLoading = false;
        state.userStats = initialState.userStats;
      })
      .addCase(fetchOrderStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStats = action.payload.data;
      })
      .addCase(fetchOrderStatistics.rejected, (state) => {
        state.isLoading = false;
        state.orderStats = initialState.orderStats;
      })
      .addCase(fetchProductStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productStats = action.payload.data;
      })
      .addCase(fetchProductStatistics.rejected, (state) => {
        state.isLoading = false;
        state.productStats = initialState.productStats;
      });
  },
});

export default dashboardSlice.reducer;
