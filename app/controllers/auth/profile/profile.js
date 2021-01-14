const User = require('../../../models/user');
const responses = require('../../../../helpers/responses');
const paginator = require('../../../../helpers/paginator');
const transformer = require('../../../transformers/user');
const hash = require('password-hash');
const {validationResult} = require('express-validator');

module.exports = {
    show: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        await User.Model.findOne({
            where: {
                token: token
            }
        }).then((data) => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
            res.json(responses.doneGetItem(transformer.item(data), User.singular));
        });
    },
    update: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(responses.badRequest(errors.mapped()));
        }
        const user = await User.Model.update({
                username: req.body.username,
                email: req.body.email,
            },
            {
                where: {
                    token: token
                }
            }).then(data => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
        });
        res.json(responses.doneUpdateItem(transformer.item(user), User.singular));
    },
    changePassword: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(responses.badRequest(errors.mapped()));
        }
        const user = await User.Model.update({
                password: hash.generate(req.body.password),
            },
            {
                where: {
                    token: token
                }
            }).then(data => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
        });
        res.json(responses.doneUpdateItem(transformer.item(user), User.singular));
    },
    logout: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const user = await User.Model.update({
                token: '$2y$10$' + crypto.randomBytes(53).toString('hex')
            },
            {
                where: {
                    token: token
                }
            }).then(data => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
        });
        res.json(responses.loggedOut(transformer.item(user)));
    },
};