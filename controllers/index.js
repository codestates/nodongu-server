// 회원 CRUD routing
const express = require('express');
const bodyParser = require('body-parser');
// const {users} = require('../models'); // db에서 users table 땡겨오기.
const {
    makeAccessToken,
    makeRefreshToken,
    resRefreshToken,
    resAccessToken,
    reissueAccessToken,
    isAuthorized,
    authRefeshToken
  } = require('./accessToken');


module.exports = {
    signIn: async (req, res) => {

        if(req.body.email && req.body.password) {
            res.status(200).send("Login successfully")
        } else {
            res.status(404).send("Step aside!")
        } // routing 시험용 코드


    //    const {email, password} = req.body;
       
    //    await users.findOne({
    //        where: {
    //            email,
    //            password
    //        },
    //    }).then(userData => {

    //    // 로그인 정보와 일치하는 유저의 정보의 형태는 {email: , nickname: , password: , image: , token: , created_at:, updated_at: ,id:,  }
       
    //         if(!userData) {
    //             res.status(404).send('Invalid user') //data 형식을 보내줄 것       
    //         } 
            
    //         delete userData.dataValues.password // 패스워드는 삭제시켜주자. 
           
    //         console.log(userData.dataValues);

    //         const accessToken = makeAccessToken(userData.dataValues); // 토큰은 다른 모듈에서 생성되서 전달될 예정. 
    //         const refreshToken = makeRefreshToken(userData.dataValues);

    //         resAccessToken(res, accessToken)    
    //         resRefreshToken(res, refreshToken)
            
    //         // 일단 crud만 구현해보자!
            
        // }).catch(err => {
        //     console.log(err);
        // })
    },

    signOut: async (req, res) => {
        res.status(200).send("logout successFully!") // routing 시험용 코드
    },


    signUp: async (req, res) => { //header에 authorization, body에 nickname, password, email 
        
        if (req.body.email && req.body.password && req.body.nickname) {
            res.status(200).send("Welcome to NodongU world!")
        } else {
            res.status(404).send("Not enough informations!")
        } // routing 시험용 코드
        
        // const {nickname, email, password} = req.body;
        
        // await users.findOne({
        //     where: {email}
        // }).then(existedData => {
            
        //     if (existedData) { // db에 email이 이미 존재할 경우, 400 status와 에러메세지 뿜뿜
        //         res.status(409).send("Is the email that already exists.")
        //     } 
        //      // db에 회원정보가 없으니 정상적으로 회원가입 진행/ 
        //     users.create({
        //         email: req.body.email,
        //         nickname: req.body.nickname,
        //         password: req.body.password, // responseData에 id, createdAt, updatedAt 포함되는지 확인. 
        //         }).then(responseData => res.status(201).send(responseData))
                
        // }).catch(err => {
        //     console.log(err);
        // })
    },
    
    getUserInfo: async (req, res) => {

        // JWT 내 payload에서 사용자 정보를 갖고 있어서 확인작업 필요. 

        res.send("getUserInfo 구현 중입니다!")

        // const accessTokenData = isAuthorized(req);  
        // if (!accessTokenData) {
        //    res.send("invalid access token"); 
        // }

        // const {email} = accessTokenData;
        
        // await users.findOne({
        //     where: {email}
        // }).then(data => {
            
        //     if(!data) {
        //         res.send("Access denied") // 요기 좀더 고민!
        //     }
        //     delete data.dataValues.password;
        //     res.status(200).send(data)    

        // }).catch(err => {
        //     console.log(err);
        // })

        // res.status(500).send("");
    }, 
    
    modifyInfo: async (req, res) => {

        console.log("modifyInfo routing 구현 중입니다")
    }


}
