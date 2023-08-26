const mongoose = require('mongoose')
const assignSSchema = new mongoose.Schema({
    gradeName: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreateClass',
      },
      name: {
        type: String,
      },
    },
      schedule: {
        type: Date,
        // required: true,
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
module.exports = mongoose.model('assignSClass',assignSSchema)