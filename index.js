const express = require('express');
const app = express();
const port = 80;
const cors = require('cors');
const logger = require('morgan');
const axios = require('axios');
const cookieParser = require("cookie-parser");

// const userControllers = require("./controllers/index.js"); // script 작성 후 주석해제 요청
// const myListControllers = require("./controllers/myList.js");
// 쿠키파서 제이슨, 익스프레스 제이슨
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
  origin: "*",
  methods: ["GET, POST, OPTIONS"],
  credentials: true,
  preflightContinue: true
})
);



function handleListening(req, res) {
  res.send('hello world')
}

app.get("/", handleListening)

app.listen(port, () => {
  console.log(`서버테스트 포트${port}`)
})