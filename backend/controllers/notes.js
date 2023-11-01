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
    res.status(500).json({ e: e.message });
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
    res.status(500).json({ e: e.message });
  }
};
