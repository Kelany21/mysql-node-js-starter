const express = require('express');

const admin = express();

const users = require('../../app/controllers/admin/users/routes');

admin.use('/user', users);

module.exports = admin;
