import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name : 'cart' , 
    initialState : {
       userCart : null ,
       loading : false
    },
    reducers : {
        setItems : (state , action) => {
            state.userCart = action.payload
        },


        removeItem : (state , action) => {
            state.userCart.items = state.userCart.items.filter(item => {
                return item._id.toString() !== action.payload.toString()
            })
        },

        incrementItemQuantity : (state , action) =>{

            state.userCart.items = state.userCart.items.map( item => {
                if(item._id.toString() === action.payload.toString()){
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

            state.userCart.items = state.userCart.items.map(item =>{
                if(item._id.toString() === action.payload.toString()){
                    return {
                        ...item,
                        quantity : item.quantity - 1
                    }
                }
                else{
                    return item
                }
            })
        },


        setLoading : (state , action) => {
            state.loading = action.payload
        }






    }
})

export const {setItems , addItem , removeItem , incrementItemQuantity , decrementItemQuantity , setLoading} = cartSlice.actions
export default cartSlice.reducer