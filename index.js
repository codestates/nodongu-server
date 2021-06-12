const express = require('express');
const app = express();
const port = 80;
const logger = require('morgan');
// const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userControllers = require("./controllers/index"); 
const myListControllers = require("./controllers/myList");
const playControllers = require("./controllers/play");
const youtubeApiControllers = require("./controllers/youtubeApi");

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cors({
  origin: "*",
  methods: ["GET, POST, OPTIONS"],
  credentials: true,
  preflightContinue: true
})
);

// Connection test
// app.get("/", (req,res) => {
//   res.send('hello world!')
// })

// routing 
//1. users 테이블 라우팅
app.post("/login", userControllers.signIn)
app.post("/signup",  userControllers.signUp)
app.post("/logout",  userControllers.signOut)
app.post("/modify",  userControllers.modifyInfo)
app.get("/userinfo",  userControllers.getUserInfo)
// app.get("/auth", )

//2. mylist 테이블 라우팅
app.get("/getMyList", myListControllers.getMyList)
app.post("/addMyList", myListControllers.addMyList)

//3. play 테이블 라우팅
app.get("/getMusicList", playCotnrollers.getMusicList)
app.post("/addMusic", playCotnrollers.addMusic)

//4. 유튜브 API 요청
app.get("/keyowrdMusic", youtubeApiControllers)



app.listen(port, () => {
  console.log(`서버테스트 포트 ${port}`)
})
