import cartModel from "../models/cart.model.js";
import productModel from '../models/product.model.js'
import mongoose from "mongoose";
import { createMockOrder  } from "../services/payment.service.js"
import { getCart } from "../dao/cart.dao.js";
import paymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import conifg from '../config/config.js'

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
        const cart = await getCart(req.user.id)

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



const createOrderController = async (req, res) => {

    try {
        const cart = await getCart(req.user.id)

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        // check stock


        const mockRazorpayOrder = await createMockOrder({ amount: cart.totalAmount, currency: cart.currency })


        const payment = await paymentModel.create({
            user: req.user.id,
             price: {
                amount: cart.totalAmount,
                currency: cart.currency
            },
            razorpay: {
                orderId: mockRazorpayOrder.id,
            },
            orderItems: cart.items.map(item => ({
                productId: item.product._id,
                variantId: item.variant._id,
                quantity: item.quantity,
                price: item.variant.price,
                image: item.variant.image
            })),
           
        })


        res.status(200).json({
            success: true,
            message: "Order created successfully",
            paymentOrder: mockRazorpayOrder,
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


const verifyOrderController= async (req , res ) =>{
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body

    
    try{
        const payment  = await paymentModel.findOne({
            user : req.user.id,
            status : "pending",
            razorpay: {
                orderId: razorpay_order_id
            }
        })


        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            })
        }

        const isPaymentValid  = await validatePaymentVerification({
           order_id : razorpay_order_id,
           payment_id: razorpay_payment_id,
        } , razorpay_signature, config.RAZORPAY_KEY_SECRET )


        if (! isPaymentValid) {
             payment.status = "failed"
             await payment.save()

             return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }

         payment.status = 'paid'
         payment.razorpay.paymentId = razorpay_payment_id
         payment.razorpay.signature = razorpay_signature

         await payment.save()

         res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            
         })


    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}





export {
    addItemToCart,
    removeItemFromCart,
    getCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    createOrderController,
    verifyOrderController

}