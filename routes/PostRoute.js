const express = require('express');
const router = express.Router();
const { createPost, deletePost, updatePost, likePost, dislikePost, getPost } = require('../controller/PostController');

router.post('/', createPost); // POST request for creating a new post
router.delete('/:id', deletePost); // DELETE request for deleting a post
router.put('/:id', updatePost); // PUT request for updating a post
router.put('/:id/like', likePost); // PUT request for liking a post
router.put('/:id/dislike', dislikePost); // PUT request for disliking a post
router.get('/:id', getPost); // GET request for fetching a post

module.exports = router;
