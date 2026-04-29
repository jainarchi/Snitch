import { Router } from "express";
import {authenticateSeller} from '../middlewares/auth.middleware.js'
import { createProduct , getAllProductsBySeller , getProductDetails , getAllProducts , deleteProduct , createVariants } from "../controllers/product.controllers.js";
import multer from "multer";
import {validateProduct , validateProductId} from '../validation/product.validator.js'



const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only JPG, PNG, WEBP files allowed"), false)
  }
}


const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 3 * 1024 * 1024   // per file limit
    },
    fileFilter
})


const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }

  next()
}





const router = Router()

/**
 * @route POST /api/products
 * @description Create a new product by seller only 
 * @access Private
 */

router.post('/' , 
    authenticateSeller,
    upload.array('images' , 5), 
    multerErrorHandler,           // handle size/count/type errors
    validateProduct ,   
    createProduct 
  )



  /**
   * @route GET /api/products/seller
   * @description Get all products created by seller
   * @access Private
   */


router.get('/seller' , authenticateSeller , getAllProductsBySeller)    



/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get('/' , getAllProducts)



/**
 * @route GET /api/products/:id/details
 * @description get product details
 * @access Public
 */


router.get('/:id/details' , validateProductId  , getProductDetails)



/** 
 * @route DELETE /api/products/:id
 * @description Delete a product by seller
 * @access Private
*/

router.delete('/:id',  authenticateSeller , validateProductId , deleteProduct)


/**
 * @route POST /api/products/:id/variants
 * @description Create variants for a product
 * @access Private
 */

router.post('/:id/variants', 
   authenticateSeller ,
   validateProductId , 
   upload.array('images' , 5) , 
   multerErrorHandler, 
   createVariants)





export default router