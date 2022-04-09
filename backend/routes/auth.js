const express = require('express');
//import user model
const User = require('../models/User');
const router = express.Router();



//create user using POST : "/api/auth/"
router.post("/" ,(req,res)=>{

    const user = User(req.body)
    user.save()

    console.log(req.body)
    console.log("Hello")     
    //res.json(obj)
    res.send(req.body)
})

module.exports = router