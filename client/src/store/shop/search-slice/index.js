import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
  currentKeyword: "",
};

export const getSearchResults = createAsyncThunk(
  "/payment/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
      state.currentKeyword = "";
    },
    setCurrentKeyword: (state, action) => {
      state.currentKeyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg === state.currentKeyword) {
          state.searchResults = action.payload.data;
        }
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults, setCurrentKeyword } = searchSlice.actions;

export default searchSlice.reducer;
