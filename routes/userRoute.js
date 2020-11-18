const express = require('express');
const router = express.Router();
const { signUp, logIn } = require('../controllers/UserController');
const validateSignup = require('../helpers/validateSignUp');
// const checkAuth = require('../middleware/check-auth');

router.post('/signup', validateSignup, signUp);
router.post('/login', logIn);


module.exports = router;