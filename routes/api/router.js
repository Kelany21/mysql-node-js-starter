const express = require('express');

const router = express();

router.use(express.json());

router.use('/admin', require('./admin'));
router.use('/auth', require('./auth'));
router.use('/', require('./visitor'));

module.exports = router;
