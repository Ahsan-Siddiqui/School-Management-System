const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  gradeName: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
  presentStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Assuming the model name for students is "Student"
  }],
  absentStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Assuming the model name for students is "Student"
  }],
});
module.exports = mongoose.model('Attendance',attendanceSchema)
