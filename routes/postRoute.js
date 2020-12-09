const express = require('express');
const router = express.Router();
const { addNewPost, getAllPosts, getProfile } = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.get('/allposts', getAllPosts);
router.post('/newpost', checkAuth, addNewPost);
router.get('/profile', checkAuth, getProfile);

module.exports = router;