import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name : "products",
    initialState : {
       sellerProducts: []
    },
    reducers : {
      setSellerProducts : (state , action) => {
        state.sellerProducts = action.payload
      },
    
      addSellerProduct : (state , action) => {
        state.sellerProducts = [...state.sellerProducts , action.payload]
      }
    }

})

export const {setSellerProducts , addSellerProduct} = productSlice.actions   
export default productSlice.reducer 