const mongoose = require("mongoose")
const config = require('config')

const db = config.get('mongoURI')

function connectDB () {
    mongoose.connect(db)
    .then(()=>{
        console.log('MongoDB is connected Successfully')
    })
    .catch((err)=>{
        console.log(err.message)
        process.exit(1)
    })
}

module.exports = connectDB