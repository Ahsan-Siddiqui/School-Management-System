const mongoose = require('mongoose')
const classSchema = new mongoose.Schema({
    gradeName: {
        type: String,
        required: true,
      },
      gradeId: {
        type: String,
        required: true,
      },
      teacherAssign: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Teacher',
        },
      ],
      schedule: {
        type: String,
        required: true,
      },
      room: 
      {type:String,
        required:true,
      },
      studentsEnroll: [
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