const express = require('express');
const app = express();
const router = express.Router();
const port = 80;
const logger = require('morgan');
// const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/user');
const myListRouter = require('./routes/myList');

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

// routing 
// Connection test
// app.get("/", (req,res) => {
//   res.send('hello world!')
// })

app.use('/user', userRouter)
app.use('/', myListRouter)


app.listen(port, () => {
  console.log(`서버테스트 포트 ${port}`)
})
