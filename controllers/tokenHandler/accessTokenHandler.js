const {isAuthorized} = require('./tokenMethod');
const {user} = require('../../models')

module.exports = async (res, req) => {
    
    const accessTokenData = isAuthorized(req);
    const {email} = accessTokenData;
    
    if(!accessTokenData) {
        res.status(401).send("Unauthorized")
    }
    
    await user.findOne({where: {email}})
    .then(data => {
        if(!data) {
            res.status(401).send("Unauthorized")
        }
        res.status(200).send({message: ok})
    }).catch((err) => {
        console.log(err);
      });
}