const express = require('express');
const app = express();
const port = 80;
const logger = require('morgan');
// const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userControllers = require("./controllers/index"); 
// const myListControllers = require("./controllers/myList.js");

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
app.get("/", (req,res) => {
  res.send('hello world!')
})

app.post("/login", userControllers.signIn)
app.post("/signup",  userControllers.signUp)
app.post("/logout",  userControllers.signOut)
app.post("/modify",  userControllers.modifyInfo)
app.get("/userinfo",  userControllers.getUserInfo)
// app.post("/addplay",  )
// app.get("/getplay",  )
// app.get("/auth", )
// app.get("/music",  )

app.listen(port, () => {
  console.log(`서버테스트 포트 ${port}`)
})
