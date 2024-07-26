const express = require('express');
const router = express.Router();
const { EditUser, deleteUser,GetUser } = require('../controller/UserControl');

router.put('/:id', EditUser);
router.delete('/:id', deleteUser);
router.get('/:id',GetUser)

module.exports = router;
