const express = require('express');
const app = express();
const cors = require("cors");

const port = 80;

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