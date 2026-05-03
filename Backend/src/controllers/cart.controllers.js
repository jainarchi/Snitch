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


        const itemInCart = cart.items.find(item =>(
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
                price: productVariant.price
            })
        }

        await cart.save()


        res.status(201).json({
            success: true,
            message: "product successfully added to cart",
            cart
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }



}





export {
    addItemToCart
}