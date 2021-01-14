const {body} = require('express-validator');
const custom = require('../custom');
const User = require('../../models/user').Model;

module.exports = {
    store: [
        body('username').custom(custom.required).withMessage('username is required')
            .isAlpha().withMessage('username must be alpha'),
        body('email').custom(custom.required).withMessage('email is required')
            .custom(custom.unique('email', User)).withMessage('this email is in use')
            .isEmail().withMessage('enter valid email'),
        body('password').custom(custom.required).withMessage('password is required')
            .isLength({min: 5}).withMessage('Password must be at least 5 characters'),
        body('is_admin').custom(custom.required).withMessage('is_admin is required'),
    ],
    update: [
        body('username').custom(custom.required).withMessage('username is required')
            .isAlpha().withMessage('username must be alpha'),
        body('email').custom(custom.required).withMessage('email is required')
            .custom(custom.unique('email', User)).withMessage('this email is in use')
            .isEmail().withMessage('enter valid email'),
        body('password').isEmpty()
            .isLength({min: 5}).withMessage('Password must be at least 5 characters'),
        body('is_admin').isBoolean,
    ],
};