// 회원 CRUD routing
const express = require('express');
const bodyParser = require('body-parser');

// const {users} = require('../models'); // db에서 users table 땡겨오기.

// const {
//     generateAccessToken,
//     generateRefreshToken,
//     sendRefreshToken,
//     sendAccessToken,
//   } = require('../tokenFunctions');

module.exports = {
    signIn: async (req, res) => {
       const {email, password} = req.body;
       
       await users.findOne({
           where: {
               email,
               password
           },
       }).then(userData => {

       // 로그인 정보와 일치하는 유저의 정보의 형태는 {email: , nickname: , password: , image: , token: , created_at:, updated_at: ,id:,  }
       
            if(!userData) {
                res.status(404).send('Invalid user') //data 형식을 보내줄 것       
            } 
            
            delete userData.dataValues.password // 패스워드는 삭제시켜주자. 
            // const accessToken = generateAccessToken(data.dataValues); // 토큰은 다른 모듈에서 생성되서 전달될 예정. 
            // const refreshToken = generateRefreshToken(data.dataValues);

            res.status(200).json(userData) // accessToken, userData 삽입 및 전송
            // 일단 crud만 구현해보자!
            
        }).catch(err => {
            console.log(err);
        })
    },

    signOut: async (req, res) => {




    },


    signUp: async (req, res) => { //header에 authorization, body에 nickname, password, email 
        const {nickname, email, password} = req.body;
        
        await users.findOne({
            where: {email}
        }).then(existedData => {
            
            if (existedData) { // db에 email이 이미 존재할 경우, 400 status와 에러메세지 뿜뿜
                res.status(409).send("Is the email that already exists.")
            } 
             // db에 회원정보가 없으니 정상적으로 회원가입 진행/ 
            await users.create({
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password, // responseData에 id, createdAt, updatedAt 포함되는지 확인. 
                }).then(responseData => res.status(201).send(responseData))
                
        }).catch(err => {
            console.log(err);
        })
    },
    
    userInfo: async (req, res) => {


    }, 
    
    modifyInfo: async (req, res) => {


    }


}
