import { param , body } from "express-validator";
import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next()
}



export const validateAddToCart = [
    param('productId').isMongoId().withMessage("Invalid product ID format"),
    param('variantId').isMongoId().withMessage("Invalid variant ID format"),
    body('quantity').optional().isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),

    validateRequest
]


export const  validateItemId = [
    param('itemId').isMongoId().withMessage("Invalid item ID format"),

    validateRequest
]
