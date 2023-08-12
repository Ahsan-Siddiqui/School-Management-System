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
    address:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Teacher',contactSchema)