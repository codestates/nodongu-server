const {authRefeshToken, makeAccessToken, reissueAccessToken, isAuthorized} = require('./tokenMethod')
const {user} = require('../../models')

module.export = {
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

    refreshTokenHandler: async (req, res) => {

        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) {
            res.status(401).send("Unauthorized")
        } // refresh token이 없는 경우,

        const refreshTokenData = authRefeshToken(refreshToken);
        if(!refreshTokenData) {
            res.status(401).send("Unauthorized")
        } // refresh token있으나 유효성 검증 실패.

        const {email} = refreshTokenData;
        user.findOne({where: {email}})
        .then(data => {
            
            if(!data) {
                res.status(401).send("Unauthorized")
            }

            res.status(200).send("OK")
            // const newAccessToken = makeAccessToken(data.dataValues);
            // reissueAccessToken(res, newAccessToken, data.dataValues)
            //  // refresh token 여부 및 유효성 검증 후, 새로운 accessToken 발급해서 보내주기. 
    })     
    }

}
