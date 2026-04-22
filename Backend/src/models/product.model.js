import e from "express";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user' ,
        required : true 
    },
    name :{
        type : String,
        required : true 
    },
    description :{
        type : String,
        required : true
    },
    price : {
        amount :{
            type : Number,
            required : true
        },
        currency :{
            type : String,
            required : true,
            enum : ['INR' , 'USD'],
            default : 'INR'
        }
    },
    images : [
        {
            url : {
                type : String,
                required : true
            },
            _id: false
        }
    ]
},{
    timestamps : true
})


const productModel = mongoose.model('product' , productSchema)

export default productModel