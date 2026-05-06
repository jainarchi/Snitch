import {Router} from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { validateToggleProductInWishlist } from '../validation/wishlist.validator.js'
import { toggleProductInWishlist , getWishlist} from '../controllers/wishlist.controllers.js'


const router = Router()

/**
 * @route POST /api/wishlist/:productId
 * @desc Add or remove a product from wishlist
 * @param productId - Product ID of the product to be added or removed from wishlist
 * @access Private
 */

router.post('/:productId', authenticateUser, validateToggleProductInWishlist,  toggleProductInWishlist )


/**
 * @route GET /api/wishlist
 * @description Get all products in wishlist
 * @access Private
 */


router.get('/' , authenticateUser , getWishlist)




export default router