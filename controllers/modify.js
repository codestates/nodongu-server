const express = require('express');
const {user, mylist, play, playlist} = require('../models');

module.exports = {

    modNickname: async (req, res) => {

        await user.findOne({
            where: {
                id: req.body.userId
            }
        })
        .then(data1 => {

            if(!data1) {
                return res.status(202).send({success: false})
            }

            user.update({
                nickname: req.body.nickname
            },
            {
                where: {id: req.body.userId}
            })
            .then(data2 => res.status(200).send({success: true}) )

        }).catch(err => {
            res.status(500).send(err);
        })  

    },

    modImage: async (req, res) => {

        await user.findOne({
            where: {
                id: req.body.userId
            }
        })
        .then(data1 => {

            if(!data1) {
                return res.status(202).send({success: false})
            }

            user.update({
                image: req.body.image
            },
            {
                where: {id: req.body.userId}
            })
            .then(data2 => res.status(200).send({success: true}) )

        }).catch(err => {
            res.status(500).send(err);
        }) 

    },
    
    modPassword: async (req, res) => {

        await user.findOne({
            where: {
                id: req.body.userId
            }
        })
        .then(data1 => {

            if(!data1) {
                return res.status(202).send({success: false}) 
            }

            user.update({
                password: req.body.password
            },
            {
                where: {id: req.body.userId}
            })
            .then(data2 => res.status(200).send({success: true}) )

        }).catch(err => {
            res.status(500).send(err);
        }) 

    },














}