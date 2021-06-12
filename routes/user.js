const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

router.post('/login', user.signIn);
router.post('/signup', user.signUp);
router.post('/logout', user.signOut);
router.post('/modify', user.modifyInfo);
router.get('/userinfo', user.getUserInfo);
