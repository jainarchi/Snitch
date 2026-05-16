import { createSlice , createSelector } from "@reduxjs/toolkit";


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

        toggleWishlist : (state , action) => {
            const index = state.items.indexOf(action.payload)
            if(index > -1){
                state.items.splice(index , 1)
            }else{
                state.items.push(action.payload)
            }
        }



        
        
    }
})


export const {setWishlist , removeFromWishlist , setLoading , toggleWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer



export const selectWishlistIds = createSelector(
  state => state.wishlist.items,

  (items) => {
    return new Set(
      items.map(item => item.product._id)
    );
  }
);