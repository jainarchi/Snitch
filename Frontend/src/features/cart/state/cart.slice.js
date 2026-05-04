import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name : 'cart' , 
    initialState : {
        items : []
    },
    reducers : {
        setItems : (state , action) => {
            state.items = action.payload
        },


        removeItem : (state , action) => {
            state.items = state.cartItems.filter(item => item.id !== action.payload)
        }



    }
})

export const {setItems , addItem , removeItem} = cartSlice.actions
export default cartSlice.reducer