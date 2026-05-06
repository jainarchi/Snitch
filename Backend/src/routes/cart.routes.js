import Router from 'express'
import {authenticateUser} from '../middlewares/auth.middleware.js'
import { addItemToCart , removeItemFromCart , getCartItems , incrementCartItemQuantity , decrementCartItemQuantity } from '../controllers/cart.controllers.js'
import { validateAddToCart , validateItemId } from '../validation/cart.validation.js'

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

router.patch('/remove/:itemId' , authenticateUser , validateItemId , removeItemFromCart )



/**
 * @route GET /api/carts
 * @description Get all cart items
 * @access Private
 */

router.get('/' , authenticateUser , getCartItems )


/**
 * @route PATCH /api/carts/quantity/increment/:itemId
 * @description Increment quantity of an item in cart
 * @param  itemId - Item ID of the item to be incremented
 * @access Private
 */
router.patch('/quantity/increment/:itemId' , authenticateUser , validateItemId , incrementCartItemQuantity )


/**
 * @route PATCH /api/carts/quantity/decrement/:itemId
 * @description Decrement quantity of an item in cart
 * @param  itemId - Item ID of the item to be decremented
 * @access Private
 */
 
router.patch('/quantity/decrement/:itemId' , authenticateUser , validateItemId , decrementCartItemQuantity )



export default router