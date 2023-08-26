const mongoose = require("mongoose");

const studentCourseSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the Course model
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
});

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);

module.exports = StudentCourse;
