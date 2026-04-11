import {Router} from 'express'
import {registerUser , loginUser} from '../controllers/auth.controllers.js'
import {validateRegister , validateLogin} from '../validation/auth.validator.js'


const router = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register' , validateRegister , registerUser )


/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */

router.post('/login' , validateLogin , loginUser )




export default router
