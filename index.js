const express = require('express');
const app = express();
const port = 80;
const cors = require('cors');

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

function handleListening(req, res) {
  res.send('hello world')
}
app.get("/", handleListening)

app.listen(port, () => {
  console.log(`서버테스트 포트${port}`)
})