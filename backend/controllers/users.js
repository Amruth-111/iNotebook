const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth=require('../middleware/auth')
require("dotenv").config();

const { validationResult } = require("express-validator");

exports.userSignUp = async (req, res) => {
  try {
    let success=false
    const { name, email, password } = req.body;

    //set the salt
    const salt = await bcrypt.genSalt(10);
    //encrypt the password
    const secPass = await bcrypt.hash(password, salt);

    const errors = validationResult(req);
    //if there error exists then catch that error and send the errors back
    if (!errors.isEmpty()) {
      return res.status(404).json({success, errors: errors.array() });
    }
    //check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(404)
        .json({success,msg:"email already exists,enter new email or signin"});
    }

    // if user doesn't exist then create new user
    user = await User.create({
      name: name,
      email: email,
      password: secPass,
    });

    const result = await user.save();
    success=true
    const data = {
      user: {
        id: user.id,
      },
    };
    //generated user authentication token
    const authToken = jwt.sign(data, process.env.JWT_TOKEN);
    res.json({ success,authToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
};

exports.userSignIn = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  let success=false
  //if there error exists then catch that error and send the errors back
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    //check if user exists
    if (!user) {
      return res
        .status(404)
        .json({success,msg:"email does not exist signup or enter correct credentials"});
    }
     //if user exists then compare password
    const passwordHash = await bcrypt.compare(password,user.password);
    if (!passwordHash) {
      return res.status(404).json({success,msg:"enter correct credentials"});
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    //generated user authentication token
    success=true
    const authToken = jwt.sign(data, process.env.JWT_TOKEN);
    res.status(201).json({success,msg:"logged in sucessfully",authToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
};


exports.getUser=async(req,res)=>{
    try{
        let userId=req.user.id
        console.log(userId)
        const user=await User.findById(userId)
        res.send(user)
    }catch(e){
        console.log(e);
        res.status(500).json({ e: e.message });
    }
}
