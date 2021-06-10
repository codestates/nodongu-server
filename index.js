const express = require('express');
const app = express();
const cors = require("cors");
const port = 80;
const logger = require('morgan');
const axios = require('axios');
const cookieParser = require("cookie-parser");

// const userControllers = require("./controllers/index.js"); // script 작성 후 주석해제 요청
// const myListControllers = require("./controllers/myList.js");

//테스트 용도

app.use(cors({
  origin: "*",
  methods: ["GET, POST, OPTIONS"],
  credentials: true,
  preflightContinue: true
}));

function handleListening(req, res) {
  res.send('hello world')
}

app.get("/", handleListening)

app.listen(port, () => {
  console.log(`서버테스트 포트${port}`)
})