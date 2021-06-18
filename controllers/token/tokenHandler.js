const {authRefeshToken, makeAccessToken, reissueAccessToken, isAuthorized} = require('./tokenMethod')
const { user } = require('../../models');
const { verify } = require('jsonwebtoken');
require("dotenv").config();


module.exports = {
    
    refreshTokenHandler: async (req, res) => {

        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];
        const decoding = verify(token, process.env.REFRESH_SALT);
        const {email} = decoding;

        if(!authorization) {
            res.status(202).send({"success": false})
        }

        await user.findOne({where: {email}})
            .then(data => {
                if(!data) {
                    return res.status(202).send("Unauthorized")
                }
                res.status(200).send({"success": true, 
                userInfo: {
                    email: data.dataValues.email,
                    nickname: data.dataValues.nickname,
                    id:data.dataValues.id,
                    image:data.dataValues.image,
                    createdAt:data.dataValues.createdAt
                }})
            }).catch(err => {
                res.status(202).send(err)
            })
            
    }

}
