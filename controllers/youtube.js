const express = require('express');
const {user} = require('../models/user');
const axios = require('axios'); 
require("dotenv").config();


module.exports = {  
    getYoutubeList: async (req, res) => {
        
        await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.API_KEY}&q=${req.body.keyword}lofi&type=video&videoEmbeddable=true&maxResults=15`)
        .then(data => {
            
            console.log("data: ", data.data)
            let newMusicList = [];
            data.data.items.map((ele) => {
                let obj = {}
                obj.musicId = ele.id.videoId
                obj.title = ele.snippet.title
                obj.thumbnail = ele.snippet.thumbnails.high.url
                newMusicList.push(obj)
            }) // list 가공 logic
            res.status(200).send({success: true, data: newMusicList})
 
        })
    }     
}