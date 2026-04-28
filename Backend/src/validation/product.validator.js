import { body , validationResult } from "express-validator";
import mongoose from "mongoose";

export const validateRequest = (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() }); 
    next()
}

export const validateProduct = [
    body("name")
        .trim()
        .notEmpty().withMessage("Product name is required")
        .isLength({ min: 3 }).withMessage("Product name must be at least 3 characters long"),
    body("description")
        .trim()
        .notEmpty().withMessage("Product description is required")
        .isLength({ min: 10 }).withMessage("Product description must be at least 10 characters long"),
    body("priceAmount")
        .notEmpty().withMessage("Product price is required")
        .isNumeric().withMessage("Product price must be a number"),
    body("priceCurrency")
        .notEmpty().withMessage("Product currency is required")
        .isLength({ min: 3 }).withMessage("Product currency must be at least 3 characters long"),   
   
        validateRequest
]





export const validateProductId = (req, res, next) => {
  const productId = req.params.id;

  if (! mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  next();
};