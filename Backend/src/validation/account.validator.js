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