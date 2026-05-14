import {body, param , validationResult} from "express-validator";


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }



  

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



export const validateSetPassword = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 10 }).withMessage('Password must be between 6 and 10 characters')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number'),

    validateRequest
]


export const validateChangePassword = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),

    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 6, max: 10 }).withMessage('Password must be between 6 and 10 characters')    
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number'),

    validateRequest

]