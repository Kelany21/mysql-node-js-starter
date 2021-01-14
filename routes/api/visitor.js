const express = require('express');

const visitor = express();

const auth = require('../../app/controllers/visitor/auth/routes');

visitor.use('/auth', auth);

module.exports = visitor;
