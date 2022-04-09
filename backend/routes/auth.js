const express = require('express');
//import user model
const User = require('../models/User');
const router = express.Router();

//validation for values
const { body, validationResult } = require('express-validator');


//create user using POST : "/api/auth/createUser" = no login required 
router.post("/createUser" , [
                    body('name','Einter valid name.').isLength({ min: 3 }),
                    body('email','Einter valid e-mail.').isEmail(),
                    body('password','Einter valid password.').isLength({ min: 5 }) 
                ], async (req,res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //try catch blocks
    try{

   
    //check wheather the user exists already
    let user = await User.findOne({email:req.body.email})
    //user exists hcheck 
    if(user){
        return res.status(404).json({error:"SOrry user with this email is exist"})
    }
    //save values oin DB
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      
    //   .then(user => res.json(user))
    //   //handle the duplicate value
    //   .catch(err=>{console.log(err)
    //   res.json({error : "Email already used", message:err.message})})


    // const user = User(req.body)
    // user.save()
    res.json(user)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occured ")  
    }

   
})

module.exports = router