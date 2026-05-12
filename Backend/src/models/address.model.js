import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
     label: { 
        type: String, enum: ['Home', 'Office', 'Other'], 
        default: 'Home' 
    },
    addressLine: { 
        type: String, 
        required: true 
    },                              // Flat No., Building, Area
    city: {
         type: String, 
         required: true 
    },
    state: {
         type: String, 
         required: true
     },
    pincode: { 
        type: String, 
        required: true 
    }
   
})



export default addressSchema
