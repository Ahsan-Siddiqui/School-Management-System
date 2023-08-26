const express = require("express");
const auth = require("../middlewares/auth");
const Class = require("../model/AssignStudentClass");
const Student = require("../model/StudentForm");
const TimeTable = require("../model/TimeTable"); // Assuming this is your TimeTable model
const Attendance = require("../model/Attendance"); // Import your Attendance model

const router = express.Router();

// Get students list by matching class ID from TimeTable and AssignStudentClass models
router.get("/students/:classId", auth, async (req, res) => {
  try {
    const { classId } = req.params;

    // Fetch students enrolled in the class from the AssignStudentClass model
    const assignStudentClasses = await Class.find({ "gradeName.id": classId });

    // Fetch students enrolled in the class from the TimeTable model
    const timetableStudents = await TimeTable.find({ "gradeName": classId });

    // Combine the students from both models (if any)
    const allStudentIds = new Set();

    assignStudentClasses.forEach(assignStudentClass => {
      assignStudentClass.studentsEnroll.forEach(studentId => {
        allStudentIds.add(studentId);
      });
    });

    timetableStudents.forEach(entry => {
      allStudentIds.add(entry.studentId);
    });

    // Fetch student records based on the combined student IDs
    const studentNames = await Student.find({ _id: { $in: Array.from(allStudentIds) } }, "firstname");

    res.json(studentNames);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, msg: "Server Error" });
  }
});
// Create a new attendance record
router.post("/", auth, async (req, res) => {
  try {
    const { gradeName, schedule, presentStudents, absentStudents } = req.body;

    // Create a new attendance record
    const attendanceRecord = new Attendance({
      gradeName,
      schedule,
      presentStudents,
      absentStudents,
    });

    // Save the attendance record to the database
    await attendanceRecord.save();

    res.json({ status: "success", msg: "Attendance saved successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, msg: "Server Error" });
  }
});

module.exports = router;
