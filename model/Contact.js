const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name : {
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phone:{
        type:Number,
        required:true
    },
    relation:{
        type:String,
        default:'Personal'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('contact',contactSchema)