const express = require('express');
const new_company = require('./new_company');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/new_company', new_company);

module.exports = router;
