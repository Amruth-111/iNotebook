const express = require('express')
const app = express()
const database=require('./db')
const userRoute=require('./routes/users')
const notesRoute=require('./routes/notes')

database();
app.use('/api/user',userRoute)
app.use('/api/notes',notesRoute)

app.listen(3000,()=>console.log('server started at port 3000'))