// 회원 CRUD routing
const express = require('express');
const {user, mylist, play, playlist} = require('../models');
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

       await user.findOne({
           where: {
               email: req.body.email
           }
       }).then(data => {
            if(!data) {
                res.status(202).send({loginSuccess: false, message: "존재하지 않는 이메일입니다"}) 
            } else {
                user.findOne({
                    where: {
                        password: req.body.password,
                        email: req.body.email
                    }
                }).then(data => {
                    if(!data) {
                        res.status(202).send({loginSuccess: false, message: "비밀번호가 일치하지 않습니다"}) 
                    } else {

                         const refreshToken = makeRefreshToken(data.dataValues);
                         res
                             .status(200)
                             .set('Access-Control-Expose-Headers', 'authorization')
                             .set('authorization', `Bearer ${refreshToken}`)
                             .send({loginSuccess:true, userId: data.dataValues.id});
                      
                    }
                })    
            }
        }).catch(err => {
            res.status(500).send("error");
        }) 
        
    },

    logout: (req, res) => {

        res.status(200).send("Logged out successfully")
        
    },


    signUp: async (req, res) => {
        
        await user.findOne({
            where: {email: req.body.email}
        }).then(existedEmail => {
            
            if (existedEmail) { 
                res.status(202).send("Is the email that already exists.")
            } 

            user.findOne({ 
                where: {nickname: req.body.nickname}
            }).then(existedNickname => {

                if(existedNickname) {
                    res.status(202).send("Is the nickname that already exists.")
                }

                user.create({
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password,
                }).then(responseData => res.status(201).send(responseData))

            }) 

        }).catch(err => {
            res.status(500).send(err);
        })
    },
    
    userInfo: async (req, res) => {
        
        await user.findOne({
            where: {id: req.body.userId}
        }).then(data => {
            
            if(!data) {
                res.status(202).send({success: false, data: null})
            }

            delete data.dataValues.password;
            res.status(200).send({success: true, data: data.dataValues})    

        }).catch(err => {
            res.status(202).send({error: err});
        })

    }, 

    deleteUser: async (req,res) => {

        await user.findOne({
            where: {
                id: req.body.userId 
            }
        }).then(data => {
   
            if(!data) {
                return res.status(202).send({success:false})
            } 
            user.destroy({
                where: {id: req.body.userId}    

            }).then(data => { 
                return res.status(200).send({success:true})

            }).catch(err => {
                res.status(400).send(err);
            })
        })
    },

    existEmail: async (req, res) => {
       
        await user.findOne({
            where: {
                email: req.body.email
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
                nickname: req.body.nickname
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
