const {authRefeshToken, makeAccessToken, reissueAccessToken, isAuthorized} = require('./tokenMethod')
const {user} = require('../../models');
const { verify } = require('jsonwebtoken');
require("dotenv").config();


module.exports = {
    refreshTokenHandler: async (req, res) => {

        const refreshToken = req.headers.cookie;

        // console.log("refreshToken: ", refreshToken) // refreshToken=xxxx.xxxx.xxxx

        if(!refreshToken) {
            res.status(202).send("Unauthorized")
        } // refresh token이 없는 경우,

        const token = refreshToken.split("=")[1];    
        const decoding = verify(token, process.env.REFRESH_SALT);

        console.log("decoding: ", decoding) 
        // JsonWebTokenError: invalid token => 로직추가.

        const {email} = decoding;

        await user.findOne({where: {email}})
            .then(data => {
                if(!data) {
                    res.status(202).send("Unauthorized")
                }
                res.status(200).send({message: "OK"})
                
    })     
    }

}

    // accessToken 생성 시 활용 요망.
    // accessTokenHandler: async (res, req) => {
    
    //     const accessTokenData = isAuthorized(req);
    //     const {email} = accessTokenData;
        
    //     if(!accessTokenData) {
    //         res.status(401).send("Unauthorized")
    //     } // accessToken이 없는 경우 
        
    //     await user.findOne({where: {email}})
    //     .then(data => {
    //         if(!data) {
    //             res.status(401).send("Unauthorized")
    //         } // accessToke은 있으나, 해당하는 유저가 없을 경우
    //         res.status(200).send({message: ok}) // accessToke이 있고, db에 일치하는 사람이 있을 경우, 
    //     }).catch((err) => {
    //         console.log(err);
    //     });

    // },