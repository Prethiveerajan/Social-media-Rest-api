const express = require('express');
const {get,GetUser,DeleteUser} = require('../controller/User');
const router = express.Router();

router.get('/',get)
router.post('/register',GetUser);
router.delete('/delete/:id', DeleteUser);


module.exports = router;