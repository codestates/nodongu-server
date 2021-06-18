const express = require('express');
const axios = require('axios'); 
require("dotenv").config();


module.exports = { 

    getYoutubeList : async (req, res) => {
        const result = [];
        const keywordConverter = encodeURI(req.body.keyword)
        const data1 = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.API_KEY}&q=${keywordConverter}lofi&type=video&videoEmbeddable=true&maxResults=15`
        );
      
        for (let data2 of data1.data.items) {
          const data = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${data2.id.videoId}&key=${process.env.API_KEY}&type=video&part=contentDetails`
          );
          const duration = data.data.items[0].contentDetails.duration;
          result.push({ id: data2.id.videoId, title: data2.snippet.title, thumbnail: data2.snippet.thumbnails.high, duration});
        }
      
        res.status(200).send({success: true, data: result})
    }

} 
