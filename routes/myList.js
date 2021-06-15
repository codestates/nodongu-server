const express = require('express');
const router = express.Router();
const myList = require('../controllers/myList')
const play = require('../controllers/play')
const youtube = require('../controllers/youtube')

router.post('/addMylist', myList.addMylist);
router.post('/getMylist', myList.getMylist);

router.post('/getMusicList', play.getMusicList);
router.post('/addMusic', play.addMusic);

router.post('/keywordMusic', youtube.getYoutubeList)

module.exports = router;