const express = require('express');

const auth = express();

const profile = require('../../app/controllers/auth/profile/routes');

auth.use('/profile', profile);

module.exports = auth;
