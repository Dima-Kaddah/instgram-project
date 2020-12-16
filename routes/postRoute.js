const express = require('express');
const router = express.Router();
const { addNewPost, getAllPosts, getProfile, likePost, unLikePost, addComment } = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.get('/allposts', getAllPosts);
router.post('/newpost', checkAuth, addNewPost);
router.get('/profile', checkAuth, getProfile);
router.put('/like', checkAuth, likePost);
router.put('/unlike', checkAuth, unLikePost);
router.put('/comment', checkAuth, addComment);

module.exports = router;