const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  
    makeRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SALT, { expiresIn: "7d" });
    },
  
    resRefreshToken: (res, refreshToken) => {
  
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, 
            secure: true,
            sameSite: 'none'
        });
    },
  
    isAuthorized: (req) => {
    
        const authorization = req.headers.authorization;

        if (!authorization) {
            return null;
        }
        const token = authorization.split(" ")[1];
    
        try {
            return verify(token, process.env.REFRESH_SALT);       
        } catch (err) {
            return null;
        }
    },

    authRefeshToken: (refreshToken) => {
    
        try {
            return verify(refreshToken, process.env.REFRESH_SALT);
        } catch (err) {
            return null;
        }
    }
};