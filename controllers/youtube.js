const express = require('express');
const {user} = require('../models/user');
const axios = require('axios'); 

/*
// 클라이언트에서 보내준 api와 검색어를 활용하여 원하는 데이터에 쏴주는 기능.
// 1. 클라이언트 단에서 body parameter로 keyword 가져옴 // 키워드 조합을 생각해보자 => 알고리즘과 유사하게 구현가능.
// 2. axios를 사용하여, youtube에 관련 쿼리를 날려주고 리스트를 가져오자.
// 3. 가져온 데이터를 가공하여 api 형태로 보내주자.
// 4. 검색어 조합 확인필요. 
// 5. 필요한 보내줘야하는 정보는 id.videoId, title, snippet.thumbnails.high
// 6. 키워드 가공에 대해서 좀더 생각해보기 
*/


module.exports = (res, req) => {  

    axios
        .post(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCqab7Lpnauyr9U6JZ-XhP1qkKwZZrKZiQ&q=${req.body.keyword}&type=video&videoEmbeddable=true`)
        // { 'Content-Type': 'application/json', withCredentials: true } 요 옵션을 좀 더 파보자.
        .then(data => {
            
            let newMusicList = [];
            data.map((ele) => {
                let obj = {}
                obj.musicId = ele.id.videoId
                obj.title = ele.title
                obj.thumbnail = ele.snippet.thumbnails.high.url
                newMusicList.push(obj)
            }) // list 가공 logic
        
            res.status(200).send({success: true, data: newMusicList})

        }).catch(err => console.log(err))
    
    res.status(500).send("error"); // 서버에러     
}