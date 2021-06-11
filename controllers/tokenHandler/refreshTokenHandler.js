const {authRefeshToken, makeAccessToken, reissueAccessToken} = require('./tokenMethod')
const {user} = require('../../models')

module.export = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) {
        res.status(401).send("Unauthorized")
    }

    // 리프레시 토큰 데이터 확인
    const refreshTokenData = authRefeshToken(refreshToken);
    if(!refreshTokenData) {
        res.status(401).send("Unauthorized")
    }

    const {email} = refreshTokenData;
    user.findOne({where: {email}})
    .then(data => {

        if(!data) {
            res.status(401).send("Unauthorized")
        }
        // 
    })



}
