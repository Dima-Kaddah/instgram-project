const express = require('express');
const router = express.Router();
const { addNewPost, getAllPosts, getMyPosts } = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.get('/allposts', getAllPosts);
router.get('/myposts', checkAuth, getMyPosts);
router.post('/newpost', checkAuth, addNewPost);

module.exports = router;