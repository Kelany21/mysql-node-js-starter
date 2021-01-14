const middlewares = require('../../../middlewares');
const routes = require('./users');
const express = require('express');
const router = express();
const validations = require('../../../requests/admin/users');

router.post('/store', validations.store, middlewares.admin, routes.store);

router.put('/update/:id', validations.update, middlewares.admin, routes.update);

router.get('/list', middlewares.admin, routes.list);

router.get('/index', middlewares.admin, routes.index);

router.get('/show/:id', middlewares.admin, routes.show);

router.delete('/delete/:id', middlewares.admin, routes.delete);

module.exports = router;