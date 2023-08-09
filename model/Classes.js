const mongoose = require('mongoose')
const classSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    className: {
        type: String,
        required: true,
      },
      instructor: {
        type: String,
        required: true,
      },
      schedule: {
        type: String,
        required: true,
      },
      room: String,
      students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
        },
      ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('classes',classSchema)