const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const Course = require('../model/Course');

// POST /api/courses
// Create a new course
router.post(
  '/',
  [
    auth, // Require authentication
    isAdmin, // Require admin role
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description } = req.body;

      const course = new Course({
        title,
        description,
      });

      await course.save();

      res.json({ msg: 'Course created successfully', course });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
