const express = require('express');
const router = express.Router();
const { addNewPost, getAllPosts } = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.get('/allposts', getAllPosts);
router.post('/newpost', checkAuth, addNewPost);

module.exports = router;