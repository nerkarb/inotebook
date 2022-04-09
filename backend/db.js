const mongoose = require('mongoose');
// const mongoURI = "localhost:27017/inotebook"

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false"

const connectToMongo = () =>{
    console.log("IN Connet to mongo")
    mongoose.connect(mongoURI, ()=>{
        console.log("COnnected to mongo successfully")
    });
}


//export the module
 module.exports = connectToMongo