const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth'); // Middleware for authentication
const isAdmin = require('../middlewares/isAdmin'); // Middleware to check admin role
const Student = require('../model/StudentForm');
const Course = require('../model/Course');

// POST /api/assign-course
// Assign a course to a student
router.post(
  '/',
  [
    auth, // Require authentication
    isAdmin, // Require admin role
    check('studentId', 'Student ID is required').notEmpty(),
    check('courseId', 'Course ID is required').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
 
      const { studentId, courseId } = req.body;

      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ msg: 'Student not found' });
      }

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if the course is already assigned to the student
      if (student.courses.includes(courseId)) {
        return res.status(400).json({ msg: 'Course already assigned to the student' });
      }

      // Assign the course to the student
      student.courses.push(courseId);
      await student.save();

      res.json({ msg: 'Course assigned successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
