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

//AUthentication token
const JWT_SECRET = "SecretToekn$"

//create user using POST : "/api/auth/createUser" = no login required
router.post(
  "/createUser",
  [
    body("name", "Einter valid name.").isLength({ min: 3 }),
    body("email", "Einter valid e-mail.").isEmail(),
    body("password", "Einter valid password.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //try catch blocks
    try {
      //check wheather the user exists already
      let user = await User.findOne({ email: req.body.email });
      //user exists hcheck
      if (user) {
        return res
          .status(404)
          .json({ error: "SOrry user with this email is exist" });
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
    res.json({authToken})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured ");
    }
  }
);

module.exports = router;
