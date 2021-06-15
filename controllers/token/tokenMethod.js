const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // makeAccessToken: (data) => {
  //   return sign(data, process.env.ACCESS_SALT, { expiresIn: "1h" });
  // },  // accessToken 생성
  makeRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SALT, { expiresIn: "7d" });
  }, // refrestToken 생성 
  resRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true
    }); // refreshToken 쿠키에 실어서 보내기
  },
  // resAccessToken: (res, accessToken, userData) => {
  //   res.json({ data: { accessToken, userInfo: userData }, message: "ok" });
  // }, // accessToken 보내기
  // reissueAccessToken: (res, accessToken) => {
  //   res.json({ data: { accessToken}, message: "ok" });
  // }, // accessToken 다시 보내기 
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    // console.log("token: ", token)
    try {
      return verify(token, process.env.REFRESH_SALT);
    } catch (err) {
      return null;
    } // 요청이 있을때마다 bearer token 검증.
  },
  authRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SALT);
    } catch (err) {
      return null;
    }
  }, // refresh 토큰 유효성 확인.
};