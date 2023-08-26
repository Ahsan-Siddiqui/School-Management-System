const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    approved: {
        type: Boolean,
        default: false // New field for approval status
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('user',userSchema)