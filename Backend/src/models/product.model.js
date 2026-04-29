import mongoose from "mongoose";
import priceSchema from "./price.model.js";

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },


  price: {
    type: priceSchema,
    required: true
  },

  images: [
    {
      url: {
        type: String,
        required: true,
      },
      _id: false
    }
  ],

  //  color-wise images for variants
  imagesByColor: {
    type: Map,
    of: [
      {
        url: {
          type: String,
          required: true,
          trim: true
        },
        _id: false
      }
    ],
    default: {}
  },

  // flattened variants
  variants: [
    {
      color: {
        type: String,
        required: true
      },

      size: {
        type: String,
        required: true
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
      },

      price: {
        type: priceSchema
      }
    }
  ]

}, {
  timestamps: true
});



productSchema.index(
  { "variant.color": 1, "variant.size": 1 },
  { unique: true }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;