const middlewares = require('../../../middlewares');
const routes = require('./auth');
const express = require('express');
const router = express();
const validations = require('../../../requests/visitors/auth');

router.post('/login', validations.login, routes.login);

router.post('/register', validations.register, routes.register);

module.exports = router;