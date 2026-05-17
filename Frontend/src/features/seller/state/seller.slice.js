import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {   
    subOrders: [],
    Products: [],
    loading: {
      subOrders: false,
      products: false

    },
   
  },
  reducers: {
    setSellerSubOrders(state , action) {
        state.subOrders = action.payload;

    },

   setLoading (state , action) {
    const { type , value } = action.payload
    state.loading[type] = value
  }



  },

});

export const { setSellerSubOrders, setLoading } = sellerSlice.actions;
export default sellerSlice.reducer;