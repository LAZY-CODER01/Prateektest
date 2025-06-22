import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsList: [],
  isloading: false,
  productDetails: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    productsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams, page = 1, limit = 12 }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
      page: page.toString(),
      limit: limit.toString(),
    });

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isloading = false;
        state.productsList = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isloading = false;
        state.productsList = [];
        state.pagination = initialState.pagination;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isloading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isloading = false;
        state.productDetails = null;
      });
  },
});

export default shoppingProductSlice.reducer;
