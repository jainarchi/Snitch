import {Router} from 'express'
import {registerUser , loginUser , googleCallback } from '../controllers/auth.controllers.js'
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


/**
 * @route GET /api/auth/google
 * @description Authenticate with Google
 * @access Public
 */
router.get('/google' , passport.authenticate('google' , {scope : ['profile' , 'email']}) )


/**
 * @route GET /api/auth/google/callback
 * @description Google authentication callback
 * @access Public
 */
router.get('/google/callback' , passport.authenticate('google' , {failureRedirect : '/login' , session : false  }) , googleCallback)

export default router
