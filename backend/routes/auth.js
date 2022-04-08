const express = require('express');
const router = express.Router();

router.get("/" ,(req,res)=>{
    obj={
        name: "Bhushan",
        age : 13
    }    
    res.json(obj)
})

module.exports = router