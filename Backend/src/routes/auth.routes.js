import {Router} from 'express'
import {registerUser} from '../controllers/auth.controllers.js'
import {validateRegister} from '../validation/auth.validator.js'


const router = Router()


router.post('/register' , validateRegister , registerUser )



export default router