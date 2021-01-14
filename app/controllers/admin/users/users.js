const User = require('../../../models/user');
const responses = require('../../../../helpers/responses');
const paginator = require('../../../../helpers/paginator');
const translator = require('../../../../helpers/translator');
const transformer = require('../../../transformers/user');
const crypto = require("crypto");
const hash = require('password-hash');
const {validationResult} = require('express-validator');

module.exports = {
    store: async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(responses.badRequest(errors.mapped()));
        }
        const user = await User.Model.create({
            username: req.body.username,
            email: req.body.email,
            password: hash.generate(req.body.password),
            is_admin: req.body.is_admin,
            token: '$2y$10$' + crypto.randomBytes(53).toString('hex')
        });
        res.json(responses.doneCreateItem(transformer.item(user), User.singular));
    },
    list: async (req, res) => {
        const users = await User.Model.findAll();
        res.json(responses.doneGetItems(transformer.items(users), User.plural));
    },
    index: async (req, res) => {
        res.json(responses.doneGetItems(await paginator(User.Model, req, transformer.items), User.plural));
    },
    show: async (req, res) => {
        const user = await User.Model.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
        });
        res.json(responses.doneGetItem(transformer.item(user), User.singular));
    },
    delete: async (req, res) => {
        const user = await User.Model.destroy({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
        });
        res.json(responses.doneDeleteItem(transformer.item(user), User.singular));
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(responses.badRequest(errors.mapped()));
        }
        let updateObj = {
            username: req.body.username,
            email: req.body.email,
            is_admin: req.body.is_admin,
            token: '$2y$10$' + crypto.randomBytes(53).toString('hex')
        };
        if (req.body.password !== "") {
            updateObj.password = hash.generate(req.body.password);
        }
        const user = await User.Model.update(updateObj, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            if (data === null) {
                return res.status(404).json(responses.notFound(User.singular))
            }
        });
        res.json(responses.doneUpdateItem(transformer.item(user), User.singular));
    },
};