//db connection
const mongoose = require('mongoose');
const connectToMongo = require('./db');
connectToMongo();


//innilize express
const express = require('express')
const app = express()
const port = 3000

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req,res) =>
    res.send({abc:"Hello world"})
)
//setup server 
app.listen(port, ()=>{
    console.log(`Exapmle listing at http://localhost:${port}`)
})

