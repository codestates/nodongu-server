const express = require('express');
const router = express.Router();
const myList = require('../controllers/myList')

router.post('/addMylist', myList.addMylist);
router.post('/getMylist', myList.getMylist);
router.post('/addMusic', myList.addMusic);
router.post('/getMusicList', myList.getMusicList);