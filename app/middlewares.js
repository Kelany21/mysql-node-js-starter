const responses = require('../helpers/responses');

module.exports = {
    admin: async (req, res, next) => {
        const User = require('../database/migrations/users');
        let token = req.headers.authorization;
        if (token === undefined) {
            res.status(401).json(responses.notAuthorize())
        } else {
            token = token.split(' ')[1];
            User.findOne({where: {token: token, is_admin: true}}).then((data) => {
                if (data === null) {
                    return res.status(401).json(responses.notAuthorize())
                } else {
                    next();
                }
            });
        }
    },
    auth: async (req, res, next) => {
        const User = require('../database/migrations/users');
        let token = req.headers.authorization;
        if (token === undefined) {
            res.status(401).json(responses.notAuthorize())
        } else {
            token = token.split(' ')[1];
            User.findOne({where: {token: token}}).then((data) => {
                if (data === null) {
                    return res.status(401).json(responses.notAuthorize())
                } else {
                    next();
                }
            });
        }
    },
};