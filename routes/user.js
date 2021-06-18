const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js')
const modify = require('../controllers/modify.js')
const auth = require('../controllers/token/tokenHandler.js')

router.post('/login', user.login);
router.post('/signup', user.signUp);
router.post('/logout', user.logout);
router.post('/deleteUser', user.deleteUser);
router.post('/userinfo', user.userInfo);
router.post('/existEmail', user.existEmail);
router.post('/existNickname', user.existNickname)

router.post('/modNickname', modify.modNickname)
router.post('/modImage', modify.modImage)
router.post('/modPassword', modify.modPassword)

router.get('/auth', auth.refreshTokenHandler);

module.exports = router;