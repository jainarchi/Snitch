import  cartModel from "../models/cart.model.js";
import mongoose from "mongoose";


export const getCart = async (userId) => {

    let cart = (await cartModel.aggregate(
        [
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            { $unwind: { path: '$items' } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'items.product'
                }
            },
            { $unwind: { path: '$items.product' } },
            {
                $unwind: { path: '$items.product.variants' }
            },
            {
                $match: {
                    $expr: {
                        $eq: [
                            '$items.product.variants._id',
                            '$items.variant'
                        ]
                    }
                }
            },
            {
                $addFields: {
                    totalPrice: {
                        amount: {
                            $multiply: [
                                '$items.quantity',
                                '$items.product.variants.price.amount'
                            ]
                        },
                        currency:
                            '$items.product.variants.price.currency'
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    totalAmount: {
                        $sum: '$totalPrice.amount'
                    },
                    currency: {
                        $first:
                            '$items.product.variants.price.currency'
                    },
                    items: {
                        $push: {
                            _id: '$items._id',
                            quantity: '$items.quantity',
                            product: {
                                _id: '$items.product._id',
                                title: '$items.product.title',
                                seller : "$items.product.seller"
                            },
                            variant: {
                                _id: '$items.product.variants._id',
                                color:
                                    '$items.product.variants.color',
                                size: '$items.product.variants.size',
                                price:
                                    '$items.product.variants.price',

                                stock: "$items.product.variants.stock",
                                image: {
                                    $arrayElemAt: [
                                        {
                                            $getField: {
                                                field:
                                                    '$items.product.variants.color',
                                                input:
                                                    '$items.product.imagesByColor'
                                            }
                                        },
                                        0
                                    ]
                                }
                            },
                            totalPrice: '$totalPrice'
                        }
                    }
                }
            }
        ]
    ))[0];

    return cart
}

