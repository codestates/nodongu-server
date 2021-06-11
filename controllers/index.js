// 회원 CRUD routing
const express = require('express');
const bodyParser = require('body-parser');
const {user} = require('../models/user'); // db에서 users table 땡겨오기.
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
       
       // 이메일이 존재하지 않을 때, 비밀번호가 틀렸을 때 각각 다른 404 res 보내줄 것. 
       await user.findOne({
           where: {
               email: req.body.email // e-mail 여부 확인
           }
       }).then(data => {
            if(!data) {
                res.status(404).send({loginSuccess: false, message: "존재하지 않는 이메일입니다"}) 
            } else {
                user.findOne({
                    where: {
                        password: req.body.password // password 일치여부 확인 
                    }
                }).then(data => {
                    if(!data) {
                        res.status(404).send({loginSuccess: false, message: "비밀번호가 일치하지 않습니다"}) 
                    } else { // 이메일이 존재하고, password가 일치하는 경우 
                        
                        const accessToken = makeAccessToken(data.dataValues); // 토큰은 다른 모듈에서 생성되서 전달될 예정. 
                        const refreshToken = makeRefreshToken(data.dataValues);
                        
                        resRefreshToken(res, refreshToken)  // refreshToken 쿠키에 넣어서 발송 
                        res.send({loginSuccess: true, userId: data.dataValues.id, data: {accessToken}}); // accessToken res.body에 넣어서 발송.
                    }
                })    
            }
        }).catch(err => {
            console.log(err);
        }) 
        
    },

    signOut: async (req, res) => {
        
        const accessTokenData = isAuthorized(req); // 토큰 유효성 검증

        if (accessTokenData) {
            res.status(200).send("Logged out successfully")
        
        } else {    
            res.status(400).send("you're currently not logined") 
        }  
            
            res.status(500).send("error"); // 서버에러 
    },


    signUp: async (req, res) => { //header에 authorization, body에 nickname, password, email 
        
        // if (req.body.email && req.body.password && req.body.nickname) {
        //     res.status(200).send("Welcome to NodongU world!")
        // } else {
        //     res.status(404).send("Not enough informations!")
        // } // routing 시험용 코드
        // const {nickname, email, password} = req.body;
        
        await user.findOne({
            where: {email: req.body.email}
        }).then(existedData => {
            
            if (existedData) { // db에 email이 이미 존재할 경우, 400 status와 에러메세지 뿜뿜
                res.status(409).send("Is the email that already exists.")
            } 
             // db에 회원정보가 없으니 정상적으로 회원가입 진행/ 
            user.create({
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password, // responseData에 id, createdAt, updatedAt 포함되는지 확인. 
                }).then(responseData => res.status(201).send(responseData))
                
        }).catch(err => {
            console.log(err);
        })
    },
    
    getUserInfo: async (req, res) => {

        const accessTokenData = isAuthorized(req); // JWT 토큰 해독
        if (!accessTokenData) {
           res.send("토큰이 유효하지 않습니다!"); 
        }

        const {email} = accessTokenData;
        
        await user.findOne({
            where: email
        }).then(data => {
            
            if(!data) {
                res.send("일치하는 유저가 없습니다")
            }
            delete data.dataValues.password;
            res.status(200).send(data)    

        }).catch(err => {
            console.log(err);
        })

        res.status(500).send("error");
    }, 
    
    modifyInfo: async (req, res) => {

        // 로그인 상태인지 확인
        // 바디로 nickname, image, password 확인
        // db에 해당하는 유저 정보 찾은 뒤 (메일주소)
        // 입력된 정보를 수정한다. sequelize에 수정기능.

        const accessTokenData = isAuthorized(req); // 토큰 해독
        const {email} = accessTokenData; // 유저정보 확인    
        // if (!accessTokenData) {
        //    res.send("토큰이 유효하지 않습니다!"); 
        // }

        // 닉네임 일치여부 확인
        const checkNickname = await user.findOne({
            where: {
                nickname: req.body.nickname
            }
        }).then(data => {
            
            if(data) {
                res.status(409).send("Is the nickname that already exists.")
            } else {
                await user.update(
                    {nickname: req.body.nickname},
                    {image: req.body.image},
                    {password: req.body.password},
                    {where: email}        
                ).then(data => {
                    res.status(200).send(data)
                })
            }
        }).catch(err => {
            console.log(err);
        })

        res.status(500).send("error");
        
    }

}
