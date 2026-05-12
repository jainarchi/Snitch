import {Router} from 'express'
import {authenticateSeller} from '../middlewares/auth.middleware.js'
import {getSellerSubOrders} from '../controllers/seller.controllers.js'




const router = Router()

/**
 * @route GET /api/seller/orders
 * @description Get all subOrders placed by users for this seller
 * @access private (seller only)
 */

router.get('/orders' , authenticateSeller , getSellerSubOrders )



export default router