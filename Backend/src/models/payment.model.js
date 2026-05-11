import mongoose from "mongoose";
import priceSchema from "./price.model.js";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
        required: true
    },
    price: {
        type: priceSchema,
        requiered: true
    },

    razorpay: {
        orderId: {
            type: String,
            required: true
        },
        paymentId: {
            type: String,
            
        },
        signature: {
            type: String,
            
        }
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                url :{
                type : String,
                required : true
                }
               
            },
            price: {
                type: priceSchema,
                required: true
            }
        }
    ]

} , {
    timestamps : true
})


const paymentModel = mongoose.model('payment', paymentSchema)

export default paymentModel