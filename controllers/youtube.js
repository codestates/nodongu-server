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

/*

let a = function(duration) {
    
    let hourReg = new RegExp("[0-9]{1,2}H", "gi"); // 대문자 소문자 상관없이(gi) 일의자리, 십의자리 {1,2} 숫자 [0-9] +h까지 찾아줘! 
    let minReg = new RegExp("[0-9]{1,2}M", "gi");  
    let secReg = new RegExp("[0-9]{1,2}S", "gi");

    let hour = hourReg.exec(duration); // exec 주어진 문자열에서 일치 탐색을 수행한 결과를 배열 혹은 null로 반환
    let min = minReg.exec(duration);
    let sec = secReg.exec(duration);

    if(hour!== null) { // null일 경우, 
        hour = hour.toString().split("H")[0] + ":"
    } else {
        hour = "";
    }

    if(min !== null) {
        min= min.toString().split("M")[0];
        if(min.length < 2) {
            min = "0"+min;
        }
    } else {
        min = "00";
    }

    if(sec !==null) {
        sec = sec.toString().split("S")[0];
        if(sec.leng < 2) {
            sec = "0"+sec;
        }
    } else {
        sec = "00";
    }

    newDuration = hour+min+":"+sec;

    return newDuration;

}
}

*/