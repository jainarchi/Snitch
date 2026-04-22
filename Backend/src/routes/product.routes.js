import { Router } from "express";
import {authenticateSeller} from '../middlewares/auth.middleware.js'
import { createProduct } from "../controllers/product.controllers.js";
import multer from "multer";


const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 3 * 1024 * 1024   // per file limit
    }
})

const router = Router()

/**
 * @route POST /api/products
 * @description Create a new product by seller only 
 * @access Private
 */

router.post('/' , authenticateSeller , upload.array('images' , 5),   createProduct  )




export default router