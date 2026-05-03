import cartModel from "../models/cart.model.js";
import productModel from '../models/product.model.js'


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
        let totalVariantPrice = null ;
         
        if (itemInCart) {
            if (itemInCart.quantity + quantity > availableStock) {
                return res.status(400).json({
                    success: false,
                    message: `${availableStock - itemInCart.quantity} available in stock`
                })
            }
            
            itemInCart.quantity += quantity
            totalVariantPrice = itemInCart.price.amount * itemInCart.quantity

            itemInCart.price = {
                amount : totalVariantPrice,
                currency : productVariant.price.currency
            }

        } else {

            if (quantity > availableStock) {
                return res.status(400).json({
                    success: false,
                    message: `${availableStock} available in stock`
                })
            }

            totalVariantPrice = productVariant.price.amount * quantity

            cart.items.push({
                product: productId,
                variant: variantId,
                quantity,
                price : {
                    amount : totalVariantPrice,
                    currency : productVariant.price.currency
                },

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

    try{
        const userCart = await cartModel.findOne({user : req.user.id })

        if(!userCart){
            return res.status(404).json({
                success : false,
                message : "Cart not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "Cart items fetched successfully",
            items : userCart.items
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
    getCartItems
}