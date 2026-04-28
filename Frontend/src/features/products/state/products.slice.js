// import { createSlice } from "@reduxjs/toolkit";


// export const productSlice = createSlice({
//     name : "products",
//     initialState : {
//        sellerProducts: [],
//        allProducts : []
//     },
//     reducers : {
//       setSellerProducts : (state , action) => {
//         state.sellerProducts = action.payload
//       },
    
//       addSellerProduct : (state , action) => {
//         state.sellerProducts = [...state.sellerProducts , action.payload]
//       },

//       setAllProducts : (state , action) => {
//         state.allProducts = action.payload
//       }
//     }

// })

// export const {setSellerProducts , addSellerProduct , setAllProducts} = productSlice.actions   
// export default productSlice.reducer 



import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    sellerProducts: [],
    allProducts: [],

    loading: {
      allProducts: false,
      sellerProducts: false,
    },

    error: {
      allProducts: null,
      sellerProducts: null,
    },
  },

  reducers: {
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },

    setError: (state, action) => {
      const { key, value } = action.payload;
      state.error[key] = value;
    },

    clearError: (state, action) => {
      const key = action.payload;
      state.error[key] = null;
    },

    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },

    addSellerProduct: (state, action) => {
      state.sellerProducts.push(action.payload);
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {
  setSellerProducts,
  addSellerProduct,
  setAllProducts,
  setLoading,
  setError,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;