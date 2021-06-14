const express = require('express');
const app = express();
const port = 3000;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/user.js');
const myListRouter = require('./routes/myList.js');

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

// console.log('user: ', user )
// app.post('/nod/user/login', user.signIn);
// app.post('/signup', user.signUp);
// app.post('/logout', user.signOut);
// app.post('/modify', user.modifyInfo);
// app.get('/userinfo', user.getUserInfo); //testing code

app.use('/nod/user', userRouter); 
app.use('/nod', myListRouter);

app.listen(port, () => {
  console.log(`서버테스트 포트 ${port}`)
})
