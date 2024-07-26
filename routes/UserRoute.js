const express = require('express');
const router = express.Router();
const { EditUser, deleteUser,GetUser,FollowUser, unfollowUser} = require('../controller/UserControl');

router.put('/:id', EditUser);
router.delete('/:id', deleteUser);
router.get('/:id',GetUser)
router.post('/:id/follow',FollowUser)
router.post('/:id/unfollow',unfollowUser)


module.exports = router;
