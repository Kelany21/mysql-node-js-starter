const User = require('../../../models/user');
const responses = require('../../../../helpers/responses');
const transformer = require('../../../transformers/user');
const crypto = require("crypto");
const hash = require('password-hash');
const { validationResult } = require('express-validator');

module.exports = {
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(responses.badRequest(errors.mapped()));
        }
        const user = await User.Model.findOne({
            where: {
                email: req.body.email
            }
        }).then((data) => {
            if (data === null) {
                return res.status(401).json(responses.notAuthorize())
            }
        });
        if (hash.verify(req.body.password, user.password)){
            user.token = '$2y$10$' + crypto.randomBytes(53).toString('hex');
            await User.Model.update(user, {
                where: {email: user.email},
            });
            res.json(responses.loggedIn(transformer.auth(user)));
        }else {
            res.status(400).json(responses.userNotFound());
        }
    },
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(responses.badRequest(errors.mapped()));
        }
        const user = await User.Model.create({
            username: req.body.username,
            email: req.body.email,
            password: hash.generate(req.body.password),
            is_admin: false,
            token: '$2y$10$' + crypto.randomBytes(53).toString('hex')
        });
        res.json(responses.Registered(transformer.auth(user)));
    }
};