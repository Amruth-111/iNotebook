const express = require('express')
const app = express()
const database=require('./db')
const userRoute=require('./routes/auth')
const notesRoute=require('./routes/notes')
const cors=require('cors')
require("dotenv").config()

app.use(express.json())
app.use(cors())

database();
app.use('/api/auth',userRoute)
app.use('/api/notes',notesRoute)

app.listen(5000,()=>console.log('server started at port 3000'))