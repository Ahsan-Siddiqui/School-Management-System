const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  gradeName: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreateClass',
    },
    name: {
      type: String,
    },
  },
 teacherAssign: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeacherForm',
    },
    name: {
      type: String,
       ref: 'TeacherForm',
    },
  },
  selectSubject: {
    type: String,
  },
  selectedDays: [{
    type: String,
  }],
  selectedTimeSlot: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('TimeTable', timeTableSchema);
