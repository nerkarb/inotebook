const express = require("express");
//import user model
const User = require("../models/User");
const router = express.Router();

//validation for values
const { body, validationResult } = require("express-validator");

//encyption of password
const bcrypt = require('bcryptjs');

//AUthentication token
const jwt = require('jsonwebtoken');
const { Router } = require("express");

//AUthentication token
const JWT_SECRET = "SecretToekn$"

//import fetchuser middleware
const fetchUser = require('../middleware/fetchUser')

//ROUTE -1 : create user using POST : "/api/auth/createUser" = no login required
router.post(
  "/createUser",
  [
    body("name", "Einter valid name.").isLength({ min: 3 }),
    body("email", "Einter valid e-mail.").isEmail(),
    body("password", "Einter valid password.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //try catch blocks
    try {
      //check wheather the user exists already
      let user = await User.findOne({ email: req.body.email });
      //user exists hcheck
      if (user) {
        return res
          .status(404)
          .json({success, error: "SOrry user with this email is exist" });
      }
      //define secpassword to encrpty the password
      const salt = await bcrypt.genSalt(10)

      const secPassword = await bcrypt.hash(req.body.password, salt) 
      //save values oin DB
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      //sing Web token JWT WEB token
       const data = {
           user:{
               id:user.id
           }
       } 
      const  authToken = jwt.sign(data,JWT_SECRET)
      //console.log(jwtData)
      //   .then(user => res.json(user))
      //   //handle the duplicate value
      //   .catch(err=>{console.log(err)
      //   res.json({error : "Email already used", message:err.message})})

      // const user = User(req.body)
      // user.save()
    //   res.json(user);
    success=true;
    res.json({success,authToken})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE - 2 : AUthenticate user  using POST "api/auth/login" 


router.post("/login",
            [
                body("email", "Enter valid e-mail.").isEmail(),   
                body("password", "Password cannot be blank").exists(),    
             ],async (req,res)=>{

             let  success = false
            //check error
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            //desructure out the email and password from body
            const {email, password} = req.body;
            
            try {
                let user = await User.findOne({email})
                //if user not exist
                if(!user ){
                  success = false
                    console.log("User")
                    return res.status(404).json({sucess, error:"Please try to login mwith correct credentials"})
                }
                //if exist check password
                console.log(user.password)
                const passwordCompare = await  bcrypt.compare(password,user.password)
                if(!passwordCompare){
                  success = false
                    console.log("password compare")
                    return res.status(404).json({success, error:"Please try to login mwith correct credentials"})
                }
                //if username and credentials correct return payload value
                 //sing Web token JWT WEB token
                const data = {
                    user:{
                        id:user.id
                    }
                } 
                console.log("Auth token")
            const  authToken = jwt.sign(data,JWT_SECRET)
            success = true
            res.json({success, authToken})
                
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error");
            }
            })

//ROUTE - 3 : Get user details using POST : "/api/auth/getUser" =  login required

router.post("/getUser",
            fetchUser,
            async (req,res)=>{
            try {
                //get userId
                const userId = req.user.id;
                console.log(userId)
                //select all the fields ecept the password
                    const user = await User.findById(userId).select("-password")
                    //send user data
                    res.send(user)
                
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error");
            }
     })
module.exports = router;
