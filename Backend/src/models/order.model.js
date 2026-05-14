import mongoose from "mongoose";
import priceSchema from "./price.model.js";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        payment: {
            // order items
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment",
            required: true,
        },
        subOrders: [
            {  // order items with shipping status 
                type: mongoose.Schema.Types.ObjectId,
                ref: "suborder",
            },
        ],

        deliveryAddress: {
            addressLine: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
            label: { type: String, enum: ["Home", "Office", "Other"] },
            _id: false,
        },

        price: {
            type: priceSchema,
            required: true,
        },
    },
    { timestamps: true },
);


const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
