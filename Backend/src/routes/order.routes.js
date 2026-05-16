import {Router} from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import {getOrders , getOrderDetails , orderConfirmed} from '../controllers/order.controllers.js'


const router = Router()


/**
 * @route GET /api/orders
 * @description Get all user's orders
 * @access Private
 */

router.get('/' , authenticateUser , getOrders)

/**
 * @route GET /api/orders/:orderId
 * @description Get order details
 * @access Private
 * @param orderId
 */


router.get('/:orderId' , authenticateUser , getOrderDetails)

/**
 * @route GET /api/orders/confirmed/:orderId
 * @description Get confirmed order details
 * @access Private
 * @param orderId
 */

router.get('/confirmed/:orderId' , authenticateUser , orderConfirmed )



export default router