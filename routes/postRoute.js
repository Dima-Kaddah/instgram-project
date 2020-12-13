const express = require('express');
const router = express.Router();
const { addNewPost, getAllPosts, getProfile, likePost, unLikePost } = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.get('/allposts', getAllPosts);
router.post('/newpost', checkAuth, addNewPost);
router.get('/profile', checkAuth, getProfile);
router.put('/like', checkAuth, likePost);
router.put('/unlike', checkAuth, unLikePost);

module.exports = router;