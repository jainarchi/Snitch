import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {addAddress  , deleteAddress, setPassword, changePassword} from '../controllers/account.controllers.js'
import { validateAddAddress, validateDeleteAddress , validateSetPassword , validateChangePassword } from "../validation/account.validator.js";
const router = Router()


/**
 * @route PATCH /api/account/address/add
 * @description Add address
 * @access Private 
 */

router.patch('/address/add' , authenticateUser , validateAddAddress , addAddress)


/**
 * @route DELETE /api/account/address/:addressId
 * @description delete user address
 * @access Private
 * @param addressId
 */

router.delete('/address/:addressId' , authenticateUser , validateDeleteAddress , deleteAddress)


/**
 * @route POST /api/account/set-Password
 * @description Set password for Google-authenticated users
 * @access Private
 */

router.post('/set-password', authenticateUser, validateSetPassword, setPassword)


/**
 * @route POST /api/account/change-password
 * @description Change password for users who already have a password
 * @access Private
 */


router.post('/change-password', authenticateUser, validateChangePassword ,  changePassword)




export default router