import {createSlice} from '@reduxjs/toolkit'
import { incrementCartItemQuantity } from '../services/cart.api'


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
            state.items = state.items.filter(item => {
                return item.id !== action.payload})
        },

        incrementItemQuantity : (state , action) =>{

            state.items = state.items.map( item => {
                if(item.id === action.payload){
                    return {
                        ...item,
                        quantity : item.quantity + 1
                    }
                }
                else{ 
                    return item
                }
            })
        },


        decrementItemQuantity : (state , action) =>{

            state.items = state.items.map(item =>{
                if(item.id === action.payload){
                    return {
                        ...item,
                        quantity : item.quantity - 1
                    }
                }
                else{
                    return item
                }
            })
        }






    }
})

export const {setItems , addItem , removeItem , incrementItemQuantity , decrementItemQuantity} = cartSlice.actions
export default cartSlice.reducer