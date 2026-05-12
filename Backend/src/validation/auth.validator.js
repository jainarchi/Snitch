import { validationResult, body  , param } from "express-validator";


export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}



export const validateRegister = [

    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullname")
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

    validateRequest
]

export const validateLogin = [

    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 1 }).withMessage("Password is required"),


    validateRequest
]



export const validateAddAddress = [
    body('addressLine')
        .notEmpty().withMessage('Address line is required')
        .isLength({ max: 100 }).withMessage('Address line too long'),

    body('city')
        .notEmpty().withMessage('City is required'),

    body('state')
        .notEmpty().withMessage('State is required'),

    body('pincode')
        .notEmpty().withMessage('Pincode is required')
        .matches(/^[1-9][0-9]{5}$/).withMessage('Invalid pincode'),

    body('label')
        .notEmpty().withMessage('Label is required')
        .isIn(['Home', 'Office', 'Other']).withMessage('Invalid label'),

    validateRequest

]


export const validateDeleteAddress = [
    param('addressId')
        .notEmpty().withMessage('Address id is required')
        .isMongoId().withMessage('Invalid address id'),

    validateRequest
]