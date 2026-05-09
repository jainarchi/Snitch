import cartModel from "../models/cart.model.js";
import productModel from '../models/product.model.js'
import mongoose from "mongoose";
import {createOrder} from "../services/payment.service.js"


const addItemToCart = async (req, res) => {
    const { productId, variantId } = req.params
    const { quantity = 1 } = req.body


    try {

        const product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product or variant not found"
            })
        }

        const cart = (await cartModel.findOne({ user: req.user.id }))
            || new cartModel({ user: req.user.id })


        const itemInCart = cart.items.find(item => (
            item.product.toString() === productId
            && item.variant.toString() === variantId
        ))

        const productVariant = product.variants.id(variantId)
        const availableStock = productVariant.stock


        if (itemInCart) {
            if (itemInCart.quantity + quantity > availableStock) {
                return res.status(400).json({
                    success: false,
                    message: `${availableStock - itemInCart.quantity} available in stock`
                })
            }

            itemInCart.quantity += quantity


        } else {

            if (quantity > availableStock) {
                return res.status(400).json({
                    success: false,
                    message: `${availableStock} available in stock`
                })
            }


            cart.items.push({
                product: productId,
                variant: variantId,
                quantity,

            })
        }

        await cart.save()


        res.status(201).json({
            success: true,
            message: "product successfully added to cart",
            cart
        })



    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}





const removeItemFromCart = async (req, res) => {
    const { itemId } = req.params

    try {

        const cart = await cartModel.findOne({ user: req.user.id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }


        const removedItem = cart.items.pull({
            _id: itemId
        })

        if (!removedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            })
        }

        await cart.save()


        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart
        })


    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}



const getCartItems = async (req, res) => {

    try {
        let cart = (await cartModel.aggregate(
            [
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(req.user.id)
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
                                    title: '$items.product.title'
                                },
                                variant: {
                                    _id: '$items.product.variants._id',
                                    color:
                                        '$items.product.variants.color',
                                    size: '$items.product.variants.size',
                                    price:
                                        '$items.product.variants.price',
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



        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            cart

        })
    }

    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }



}




const incrementCartItemQuantity = async (req, res) => {

    const { itemId } = req.params

    try {
        const cart = await cartModel.findOne({ user: req.user.id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }


        const item = cart.items.id(itemId)
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            })
        }


        const product = await productModel.findOne({
            _id: item.product,
            "variants._id": item.variant
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product or variant not found"
            })
        }

        const variant = product.variants.id(item.variant)
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Variant not found"
            })
        }

        if (item.quantity >= variant.stock) {
            return res.status(400).json({
                success: false,
                message: "No more stock available"
            })
        }


        item.quantity += 1

        await cart.save()

        res.status(200).json({
            success: true,
            message: "Item quantity incremented",
            cart
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}




const decrementCartItemQuantity = async (req, res) => {
    const { itemId } = req.params


    try {
        const cart = await cartModel.findOne({ user: req.user.id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        const item = cart.items.id(itemId)
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            })
        }

        if (item.quantity <= 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be less than 1"
            })
        }

        item.quantity -= 1

        await cart.save()
        res.status(200).json({
            success: true,
            message: "Item quantity decremented",
            cart
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



const createOrderController = async (req , res) =>{

    try{
       const mockOrder = {

      id: "order_demo_123",
      amount: 1000,
      currency: "INR",
      status: "created"
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: mockOrder
    })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }


}




export {
    addItemToCart,
    removeItemFromCart,
    getCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    createOrderController

}