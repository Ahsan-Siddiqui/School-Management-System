const mongoose = require('mongoose')
const assignTSchema = new mongoose.Schema({
  gradeName: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreateClass',
    },
    name: {
      type: String,
    },
  },
      teachersEnroll: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Teacher',
        },
      ],
      schedule: {
        type: Date,
        // required: true,
      },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('assignTClass',assignTSchema)