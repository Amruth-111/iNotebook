const express = require('express')
const app = express()
const database=require('./db')

database();
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000,()=>console.log('server started at port 3000'))