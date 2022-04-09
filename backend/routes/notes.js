const express = require("express");
const router = express.Router();
//import fetchuser middleware
const fetchUser = require("../middleware/fetchUser");
//import user model
const Notes = require("../models/Notes");
//validation for values
const { body, validationResult } = require("express-validator");

//ROUTE - 1 : Get all notes details using GET : "/api/notes/fetchNotes" =  login required
router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    //fetch notes
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE - 2 : ADD notes POST : "/api/notes/addNote" =  login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Einter valid title.").isLength({ min: 3 }),
    body("description", "description must be at least 5 charecter").isLength({
      min: 5,
    }),
    body("tag", "Einter valid tag.").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      //desctrutre data from body
      const { title, description, tag } = req.body;
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //create new notes
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //add data in database
      const saveNotes = await note.save();

      res.json(saveNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE - 3 : Update an  existing notes PUT : "/api/notes/updateNote" =  login required
router.put(
  "/updateNote/:id",
  fetchUser,
  // [
  //     body("title", "Einter valid title.").isLength({ min: 3 }),
  //     body("description", "description must be at least 5 charecter").isLength({ min: 5 }),
  //     body("tag", "Einter valid tag.").isLength({ min: 3 }),
  // ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //crete new note object
    const newNotes = {};
    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotesdescription = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }

    //find the note to be updated and upfdate it

    let note = await Notes.findById(req.params.id);
    //check nots is not exist
    if (!note) {
      return res.status(404).send("Not found");
    }
    //check user is valid or note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowwed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );
    res.json({ note });
  }
);

//ROUTE - 4 : Delete an  existing notes DELETE : "/api/notes/deleteNote" =  login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //delet notes
    let note = await Notes.findById(req.params.id);
    //check notse is not exist
    if (!note) {
      return res.status(404).send("Not found");
    }
    //check user is valid or note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowwed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Notes has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
