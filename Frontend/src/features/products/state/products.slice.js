import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name : "products",
    initialState : {
        products : [],
        product : null,
        loading : false,
        error : null
    },
    reducers : {
        setProducts : (state , action) => {
            state.products = action.payload
        },

        setProduct : (state , action) => {
            state.product = action.payload
        },

        addProduct : (state , action) =>{
            state.products = [...state.products , action.payload]
        },

        setLoading : (state , action) => {
            state.loading = action.payload
        },

        setError : (state , action) => {
            state.error = action.payload
        }
    }

})