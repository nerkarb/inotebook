const express = require('express');
const router = express.Router();
//import fetchuser middleware
const fetchUser = require('../middleware/fetchUser')
//import user model
const Notes = require("../models/Notes");
//validation for values
const { body, validationResult } = require("express-validator");


//ROUTE - 1 : Get all notes details using GET : "/api/notes/fetchNotes" =  login required
router.get("/fetchNotes" , fetchUser, async (req,res)=>{
    try {
        
    
    //fetch notes
    const notes = await Notes.find({ user : req.user.id })
    res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE - 2 : ADD notes POST : "/api/notes/addNote" =  login required
router.post("/addNote" , 
            fetchUser, 
            [
                body("title", "Einter valid title.").isLength({ min: 3 }),
                body("description", "description must be at least 5 charecter").isLength({ min: 5 }),
                body("tag", "Einter valid tag.").isLength({ min: 3 }),
            ],
            async (req,res)=>{
                try {
                    
                
                //desctrutre data from body
                const {title, description, tag} = req.body;
                // Finds the validation errors in this request and wraps them in an object with handy functions
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }

                //create new notes
                const note = new Notes({
                        title, description, tag, user: req.user.id
                })
                //add data in database
                const saveNotes = await  note.save();
    
                res.json(saveNotes)
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error");
            }
})

module.exports = router