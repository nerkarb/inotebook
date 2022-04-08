const mongoose = require('mongoose');
const mongoURI = "localhost:27017"

const connectToMongo = () =>{
    console.log("IN Connet to mongo")
    mongoose.connect(mongoURI, ()=>{
        console.log("COnnected to mongo successfully")
    });
}


//export the module
 module.exports = connectToMongo