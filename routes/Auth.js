const express = require('express');
const {Register,login} = require('../controller/Auth');
const router = express.Router();


router.post('/register',Register);
router.post('/login',login)


module.exports = router;