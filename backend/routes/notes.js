const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const {body,validationResult}=require('express-validator')

const notes=require('../controllers/notes')

router.get('/fetchnotes',auth.fetchUser,notes.fetchAllNotes)
router.post('/addnotes',[
    body('title','title should not be empty').exists(),
    body('description','description should be atleast 5 charecters').isLength(),
],auth.fetchUser,notes.addNotes)


module.exports=router