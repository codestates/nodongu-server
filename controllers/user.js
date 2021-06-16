// 회원 CRUD routing
const express = require('express');
const {user, mylist, play, playlist} = require('../models'); // db에서 users table 땡겨오기.
const {
    makeAccessToken,
    makeRefreshToken,
    resRefreshToken,
    resAccessToken,
    reissueAccessToken,
    isAuthorized,
    authRefeshToken
  } = require('./token/tokenMethod');


module.exports = {
    login: async (req, res) => {

        // console.log("req.body: ", req.body)

        // if(req.body.email && req.body.password) {
        //     res.status(200).send("Login successfully")
        // } else {
        //     res.status(202).send("Step aside!")
        // } // routing 시험용 코드
       
       // 이메일이 존재하지 않을 때, 비밀번호가 틀렸을 때 각각 다른 202 res 보내줄 것. 
       await user.findOne({
           where: {
               email: req.body.email // e-mail 여부 확인
           }
       }).then(data => {
            if(!data) {
                res.status(202).send({loginSuccess: false, message: "존재하지 않는 이메일입니다"}) 
            } else {
                user.findOne({
                    where: {
                        password: req.body.password // password 일치여부 확인 
                    }
                }).then(data => {
                    if(!data) {
                        res.status(202).send({loginSuccess: false, message: "비밀번호가 일치하지 않습니다"}) 
                    } else { // 이메일이 존재하고, password가 일치하는 경우 
                        
                        // const accessToken = makeAccessToken(data.dataValues); // 토큰은 다른 모듈에서 생성되서 전달될 예정. 
                         // res.send({loginSuccess: true, userId: data.dataValues.id, data: {accessToken}}); // accessToken res.body에 넣어서 발송.
                       

                        const refreshToken = makeRefreshToken(data.dataValues);
                        resRefreshToken(res, refreshToken)  // refreshToken 쿠키에 넣어서 발송 
                        res.status(200).send({loginSuccess:true, userId: data.dataValues.id})
                      
                    }
                })    
            }
        }).catch(err => {
            console.log(err);
        }) 
        
    },

    logOut: (req, res) => {
  
        const refreshTokenData = isAuthorized(req); // 토큰 유효성 검증
        console.log("refreshTokenData: ", refreshTokenData) 

        if (refreshTokenData) {
            res.status(200).send("Logged out successfully")
        } else {    
            res.status(202).send("you're currently not logined") 
        }  
            res.status(500).send("error"); // 서버에러 
        
    },


    signUp: async (req, res) => { //header에 authorization, body에 nickname, password, email 
        
        // if (req.body.email && req.body.password && req.body.nickname) {
        //     res.status(200).send("Welcome to NodongU world!")
        // } else {
        //     res.status(202).send("Not enough informations!")
        // } // routing 시험용 코드
        // 닉네임 중복여부 구현
        
        await user.findOne({
            where: {email: req.body.email}
        }).then(existedEmail => {
            
            if (existedEmail) { // db에 email이 이미 존재할 경우, 400 status와 에러메세지 뿜뿜
                res.status(202).send("Is the email that already exists.")
            } 

            user.findOne({ // db에 nickname 존재하는지 체크
                where: {nickname: req.body.nickname}
            }).then(existedNickname => {

                if(existedNickname) {
                    res.status(202).send("Is the nickname that already exists.")
                }

                 // db에 회원정보가 없으니 정상적으로 회원가입 진행/ 
                user.create({
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password, // responseData에 id, createdAt, updatedAt 포함되는지 확인. 
                    }).then(responseData => res.status(201).send(responseData))

            }) 

        }).catch(err => {
            res.status(500).send(err);
        })
    },
    
    userInfo: async (req, res) => {

        // const refreshTokenData = isAuthorized(req); // JWT 토큰 해독
        // if (!refreshTokenData) {
        //    res.send("토큰이 유효하지 않습니다!"); 
        // }

        // const {email} = refreshTokenData;
        
        await user.findOne({
            where: {id: req.body.userId}
        }).then(data => {
            
            if(!data) {
                res.status(202).send({success: false, data: null})
            }

            delete data.dataValues.password;
            res.status(200).send({success: true, data: data.dataValues})    

        }).catch(err => { //핸들링된 에러를 그대로 넘겨줄 것.
            res.status(202).send({error: err});
        })

    }, 

    deleteUser: async (req,res) => {

        await user.findOne({ // userId와 일치하는 레코드가 있는지 확인.
            where: {
                id: req.body.userId 
            }
        }).then(data => {
   
            if(!data) { // 일치하는 레코드가 없을 경우, 
                res.status(202).send({success:false})
            } 
            user.destroy({ // 일치하는 레코드가 있을 경우, 전부 삭제
                where: {id: req.body.userId}    

            }).then(data => { 
                res.status(200).send({success:true})

            }).catch(err => {
                console.log(err); // 핸들링된 에러를 넘겨 줄것. 
            })
        })
    },

    existEmail: async (req, res) => {
       
        await user.findOne({
            where: {
                email: req.body.email // e-mail 여부 확인
            }
        })
        .then(data => {
            
            if(data) {
                res.status(202).send({result:true})
            }
            res.status(200).send({result:false})
        })

    },

    existNickname: async (req, res) => {
       
        await user.findOne({
            where: {
                nickname: req.body.nickname // nickname 여부 확인
            }
        })
        .then(data => {
            
            if(data) {
                res.status(202).send({result:true})
            }
            res.status(200).send({result:false})
        })

    }
}
