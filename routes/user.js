const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js')

router.post('/login', user.login);
router.post('/signup', user.signUp);
router.post('/signOut', user.logOut);
router.post('/modify', user.modify);
router.post('/deleteUser', user.deleteUser);
router.post('/userinfo', user.userInfo);
router.post('/existEmail', user.existEmail);

module.exports = router;