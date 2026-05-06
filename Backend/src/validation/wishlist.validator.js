import {body, param , validationResult } from 'express-validator'

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next()
}



export const validateToggleProductInWishlist = [
    param('productId').isMongoId().withMessage("Invalid product ID format"),

    validateRequest
]

