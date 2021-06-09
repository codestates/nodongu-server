const express = require('express');
const app = express();
const port = 80;

function handleListening(req, res) {
  res.send('hello world')
}
app.get("/", handleListening)

app.listen(port, () => {
  console.log(`서버테스트 포트${port}`)
})