const mongoose =require('mongoose')

const connectToDb=async()=>{
    mongoose.connect('mongodb://localhost:27017/inotebook').then(()=>{
        console.log("connected to db")
    })
    
}

module.exports=connectToDb