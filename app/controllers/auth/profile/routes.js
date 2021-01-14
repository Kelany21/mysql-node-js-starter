const middlewares = require('../../../middlewares');
const routes = require('./profile');
const express = require('express');
const router = express();
const validations = require('../../../requests/auth/profile');

router.get('/show', middlewares.auth, routes.show);

router.put('/update', validations.update, middlewares.auth, routes.update);

router.put('/change-password', validations.changePassword, middlewares.auth, routes.changePassword);

router.get('/logout', middlewares.auth, routes.logout);

module.exports = router;