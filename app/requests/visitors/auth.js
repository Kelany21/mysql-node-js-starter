const {body} = require('express-validator');
const custom = require('../custom');
const User = require('../../models/user').Model;

module.exports = {
    login: [
        body('email').custom(custom.required).withMessage('email is required')
            .isEmail().withMessage('enter valid email'),
        body('password').custom(custom.required).withMessage('password is required')
            .isLength({min: 5}).withMessage('Password must be at least 5 characters')
    ],
    register: [
        body('username').custom(custom.required).withMessage('username is required')
            .isAlpha().withMessage('username must be alpha'),
        body('email').custom(custom.required).withMessage('email is required')
            .custom(custom.unique('email', User)).withMessage('this email is in use')
            .isEmail().withMessage('enter valid email'),
        body('password').custom(custom.required).withMessage('password is required')
            .isLength({min: 5}).withMessage('Password must be at least 5 characters')
            .custom(custom.passwordConfirmed).withMessage('Password confirmation does not match password')
    ],
};