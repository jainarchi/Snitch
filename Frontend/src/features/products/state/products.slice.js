import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],

    loading: {
      allProducts: false,
    },

    error: {
      allProducts: null,
    },
  },

  reducers: {
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },

    setError: (state, action) => {
      const { key, value } = action.payload;
      state.error[key] = value;
    },

    clearError: (state, action) => {
      const key = action.payload;
      state.error[key] = null;
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },


  },
});

export const {
  setAllProducts,
  setLoading,
  setError,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;