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
        const cart = await cartModel.findOne({ user: req.user.id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }


        const cartItems = await Promise.all(

            cart.items.map(async (item) => {

                const product = await productModel.findById(item.product);
                if (!product) return null;

                const variant = product.variants.id(item.variant);
                if (!variant) return null;

                return {
                    id: item._id,

                    product: {
                        id: product._id,
                        title: product.title,
                        description: product.description,
                    },

                    variant: {
                        id: variant._id,
                        color: variant.color,
                        size: variant.size,
                        stock: variant.stock,
                        price: variant.price,
                        image: product.imagesByColor?.get(variant.color)?.[0]?.url || null
                    },

                    quantity: item.quantity
                };
            })
        );


        console.log(cartItems)  

        res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            cartItems   

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





export {
    addItemToCart,
    removeItemFromCart,
    getCartItems
}