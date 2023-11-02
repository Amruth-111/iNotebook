const Notes = require("../models/Notes");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();

const { validationResult } = require("express-validator");


//function to fetch all notes
exports.fetchAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message,message:"internal server error" });
  }
};

//function to add new notes
exports.addNotes = async (req, res) => {
    const { title, description, tag } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
  try {
    const notes = new Notes({
      title,description,tag,user:req.user.id
    });
    await notes.save();
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message,message:"internal server error" });
  }
};

//function to update notes
exports.updateNotes = async (req, res) => {
    try {

        const{title,description,tag}=req.body
        let newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
        console.log(req.params.id)
        let notes=await Notes.findById(req.params.id)
        // console.log(notes)
        if(!notes){return res.status(404).send("not found")}
        if(notes.user.toString()!==req.user.id){return res.status(401).send('not authorised')}

        notes=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        console.log(res)
        res.status(200).json(notes)
        
    } catch (e) {
      console.log(e);
      res.status(500).json({ e: e.message,message:"internal server error" });
    }
  };

//function to update notes
exports.deleteNotes = async (req, res) => {
    try {
        console.log(req.params.id)
        let notes=await Notes.findById(req.params.id)
        // console.log(notes)
        if(!notes){return res.status(404).send("not found")}
        if(notes.user.toString()!==req.user.id){return res.status(401).send('not authorised')}
        notes=await Notes.findByIdAndDelete(req.params.id)
        // console.log(res)
        res.status(200).json({notes:notes,msg:"note deleted successfully"})
    } catch (e) {
      console.log(e);
      res.status(500).json({ e: e.message,message:"internal server error" });
    }
  };
