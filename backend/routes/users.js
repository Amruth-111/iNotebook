const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    let obj={
        name:"amruht",
        age:22
    }
    res.json(obj)
})

module.exports=router