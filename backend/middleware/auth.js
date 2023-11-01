const jwt = require("jsonwebtoken");
require('dotenv').config
exports.fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token')
    console.log(token)
    if(!token){
        return res.status(401).json({error:'please authenticate using valid token'})
    }
    try{
        console.log(process.env.JWT_TOKEN)
        const data=jwt.verify(token,process.env.JWT_TOKEN)
        console.log(data)
        req.user=data.user
        console.log(req.user)
        next();
    }catch(e){
        return res.status(401).json({error:'please authenticate using valid token1'})
    }

}