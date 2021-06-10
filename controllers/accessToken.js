const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  makeAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SALT, { expiresIn: "1h" });
  },
  makeRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SALT, { expiresIn: "7d" });
  },
  resRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true
    });
  },
  resAccessToken: (res, accessToken) => {
    res.json({ data: { accessToken }, message: "ok" });
  },
  reissueAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, userInfo: data }, message: "ok" });
  },
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SALT);
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
  },
};