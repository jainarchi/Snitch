import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
    name : 'wishlist' , 
    initialState : {
        items : []
    },
    reducers : {

        setWislist : (state , action) => {
            state.items = action.payload
        },

    
    }
})


export const {setWislist} = wishlistSlice.actions
export default wishlistSlice.reducer