const express = require("express");
const router = express.Router();
const StudentCourse = require("../model/StudentCourse");
const Course = require("../model/Course");
const authMiddleware = require("../middlewares/auth"); // Assuming you have an authentication middleware

// Get courses assigned to a specific student
router.get("/student-courses", authMiddleware, async (req, res) => {
    try {
      const studentId = req.user._id;
      console.log("Student ID:", studentId);
  
      const studentCourses = await StudentCourse.find({ student: studentId });
      console.log("Student Courses:", studentCourses);
  
      const courseIds = studentCourses.map(studentCourse => studentCourse.course);
      console.log("Course IDs:", courseIds);
  
      const courses = await Course.find({ _id: { $in: courseIds } });
      console.log("Courses:", courses);
  
      res.status(200).json({ courses });
    } catch (error) {
      console.error("Error fetching student courses:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  module.exports = router;  