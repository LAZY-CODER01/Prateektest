import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  paymentStatus: "idle", // idle | loading | success | failed
  order: null,
  error: null,
};

const initialstate = {
  isLoading: false,
  // orderId : null,
  orderList: null,
  orderDetails: null,
};

export const createRazorpayOrder = createAsyncThunk(
  "payment/createRazorpayOrder",
  async ({ amount, currency = "INR", receipt }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/razorpay-order`,
        { amount, currency, receipt }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllOrderByUserId = createAsyncThunk(
  "/payment/getAllOrderByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/payment/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentStatus: (state) => {
      state.paymentStatus = "idle";
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.paymentStatus = "loading";
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.paymentStatus = "success";
        state.order = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.paymentStatus = "failed";
        state.error = action.payload;
      })
      .addCase(getAllOrderByUserId.pending, (state) => {
        state.isLoading = true;
        state.orderList = null;
      })
      .addCase(getAllOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data || [];
      })
      .addCase(getAllOrderByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.error;
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
