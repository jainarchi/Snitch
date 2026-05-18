import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {

    subOrders: [],
    products: [],

    loading: {
      subOrders: false,
      products: false

    },

  },
  reducers: {

    setSellerSubOrders(state, action) {
      state.subOrders = action.payload;

    },

    setLoading(state, action) {
      const { type, value } = action.payload
      state.loading[type] = value
    },


    setSellerProducts: (state, action) => {
      state.products = action.payload;
    },

    addSellerProduct: (state, action) => {
      state.products.push(action.payload);
    },


    removeSellerProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );

    },


  },

});

export const { setSellerSubOrders, setLoading, setSellerProducts, addSellerProduct, removeSellerProduct } = sellerSlice.actions;
export default sellerSlice.reducer;