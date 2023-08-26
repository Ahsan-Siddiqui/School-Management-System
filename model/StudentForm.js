const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"users"
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    firstname : {
        type:String,
        // required:true
    },
    lastname : {
        type:String,
        // required:true
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
        // required:true
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
    parntGardInfo:{
        type:String,
    },
    parntGardName:{
        type:String,
        // required:true
    },
    relation:{
        type:String,
    },
    parntGardNumber:{
        type:Number,
    },
    parntGardEmail:{
        type:String,
    },
    parntGardAddress:{
        type:String,
    },
    classGrade:{
        type:String,
        // required:true
    },
    section:{
        type:String,
        // required:true
    },
    rollNo:{
        type:Number,
        // required:true
    },
    enrollDate:{
        type:Date,
        // required:true
    },
    addmissionNumber:{
        type:Number,
    },
    profilePic:{
        data: Buffer,
        contentType: String
    },
    emergancyContact:{
        type:Number,
        // required:true
    },
    // courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], 

    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Student',contactSchema)