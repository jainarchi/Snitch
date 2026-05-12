import {createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",


  initialState: {
    user: null,
    loading: true,
  },


  reducers: {

    setUser: (state, action) => {
      state.user = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setAddresses : (state , action ) =>{
        state.user.addresses = action.payload
    },

    deleteAddress : (state , action ) =>{
      state.user.addresses = state.user.addresses.filter(address =>
         address._id.toString() !== action.payload.toString()
        )
    }

  }
})



export const { setUser, setError, setLoading , setAddresses , deleteAddress } = authSlice.actions;
export default authSlice.reducer;
