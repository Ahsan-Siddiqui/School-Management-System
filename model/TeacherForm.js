const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    firstname : {
        type:String,
    },
    lastname : {
        type:String,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
    },
    contactNo:{
        type:Number,
    },
    email:{
        type:String
    },
    address:{
        type:String,
    },
    eduBackground:{
        type:String,
    },
    degree:{
        type:String,
    },
    experience:{
        type:String,
    },
    enrollDate:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Teacher',contactSchema)