import { createSlice , createSelector } from "@reduxjs/toolkit";
import { addProductVariant } from "../../products/services/products.api";


const wishlistSlice = createSlice({
    name : 'wishlist' , 
    initialState : {
        items : [],
        loading : false
    },
    reducers : {

        setWishlist : (state , action) => {
            state.items = action.payload
        },

        removeFromWishlist : (state , action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload)
           
        },

        setLoading : (state , action) => {
            state.loading = action.payload
        },

        
        
    }
})


export const {setWishlist , removeFromWishlist , setLoading} = wishlistSlice.actions
export default wishlistSlice.reducer



export const selectWishlistIds = createSelector(
  state => state.wishlist.items,

  (items) => {
    return new Set(
      items.map(item => item.product._id)
    );
  }
);