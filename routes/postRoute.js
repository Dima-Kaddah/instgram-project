const express = require('express');
const router = express.Router();
const { addNewPost } = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.post('/newPost', checkAuth, addNewPost);

module.exports = router;