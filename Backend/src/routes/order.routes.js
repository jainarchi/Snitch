import {Router} from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import {getOrders} from '../controllers/order.controllers.js'


const router = Router()


/**
 * @route GET /api/orders
 * @description Get all user's orders
 * @access Private
 */

router.get('/' , authenticateUser , getOrders)








export default router