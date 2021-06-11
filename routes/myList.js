const express = require('express');
const router = express.Router();
const myList = require('../controllers/myList')

app.post('/addplay', myList.addPlay)
app.get('/getplay', myList.getPlay)
app.get('/auth', myList.auth)
app.get('/music', myList.music)