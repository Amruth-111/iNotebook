const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { validationResult } = require("express-validator");

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //set the salt
    const salt = await bcrypt.genSalt(10);
    //encrypt the password
    const secPass = await bcrypt.hash(password, salt);

    const errors = validationResult(req);
    //if there error exists then catch that error and send the errors back
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    //check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(404)
        .send("email already exists,enter new email or signin");
    }

    // if user doesn't exist then create new user
    user = await User.create({
      name: name,
      email: email,
      password: secPass,
    });

    const result = await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
    //generated user authentication token
    const authToken = jwt.sign(data, process.env.JWT_TOKEN);
    res.json({ authToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
};
