import Router from 'express'
import {authenticateUser} from '../middlewares/auth.middleware.js'
import { addItemToCart , removeItemFromCart , getCartItems } from '../controllers/cart.controllers.js'
import { validateAddToCart } from '../validation/cart.validation.js'

const router = Router()

/**
 * @route POST /api/carts/add/:productId/:variantId
 * @description Add a product to cart
 * @param  productId - Product ID of the product to be added
 * @param  variantId - Variant ID of the variant of product to be added
 * @param  quantity - Quantity of the product
 * @access Private
 */


router.post('/add/:productId/:variantId' , authenticateUser , validateAddToCart, addItemToCart )



/**
 * @route DELETE /api/carts/remove/:productId/:variantId
 * @description Remove an item from cart
 * @param  itemId - Item ID of the item to be removed
 * @access Private
 */

router.patch('/remove/:itemId' , authenticateUser , removeItemFromCart )



/**
 * @route GET /api/carts
 * @description Get all cart items
 * @access Private
 */

router.get('/' , authenticateUser , getCartItems )





export default router