const express = require('express');
const router = express.Router();
const myList = require('../controllers/myList')
const play = require('../controllers/play')

router.post('/addMyList', myList.addMyList);
router.post('/getMyList', myList.getMyList);

router.post('/getMusicList', play.getMusicList);
router.post('/addMusic', play.addMusic);

module.exports = router;