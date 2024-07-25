const express = require('express');
const router = express.Router();
const { EditUser ,deleteUser } = require('../controller/User');


router.put('/:id', EditUser);
router.delete('/:id', deleteUser);

module.exports = router;
