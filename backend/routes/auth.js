const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const {body,validationResult}=require('express-validator')

const user=require('../controllers/users')

//getting the user details and storing it in database
router.post('/signup',[
    body('name','enter a valid name').isLength({min:3}),
    body('password','password must be atleast 5 digitd').isLength({min:5}),
    body('email','enter a valid email').isEmail(),
],user.userSignUp)

router.post('/login',[
    body('password','password should not be empty').exists(),
    body('email','enter a valid email').isEmail(),
],user.userSignIn)

router.post('/getuser',auth.fetchUser,user.getUser)

module.exports=router