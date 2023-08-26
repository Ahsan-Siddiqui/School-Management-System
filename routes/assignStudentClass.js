const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const Class = require('../model/AssignStudentClass')
const Student = require("../model/StudentForm")
const router = express.Router()
// @route GET /api/contacts
// @desc  get all contacts
// @access private

router.get("/:studentId", auth, async (req, res) => {
  try {
    const { studentId } = req.params;

    const classes = await Class.find().sort({ createdAt: -1 });
    const matchedClass = classes.find(cls =>
      cls.studentsEnroll.includes(studentId)
    );

    if (matchedClass) {
      const matchedStudentId = matchedClass.studentsEnroll.find(
        id => id === studentId
      );

      const matchedStudent = await Student.findById(matchedStudentId);
      if (matchedStudent) {
        res.json({
          gradeName: matchedClass.gradeName,
          schedule: matchedClass.schedule,
          studentName: matchedStudent.firstname,
          // Add other relevant fields as needed
        });
      } else {
        res.status(404).json({ msg: "Student not found" });
      }
    } else {
      res.status(404).json({ msg: "Student's assigned class not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      msg: "Server Error",
    });
  }
});

router.get("/", auth, async (req, res) => {
    try {
      const classes = await Class.find().sort({ createdAt: -1 });
      const classesWithStudentsNames = await Promise.all(
        classes.map(async (cls) => {
            const students = await Promise.all(
              cls.studentsEnroll.map(async (studentId) => {
                const student = await Student.findById(studentId);
                return student ? student.firstname : 'Unknown Student';
              })
            );
            return { ...cls._doc, studentsNames: students  };
        })
    );

    res.json(classesWithStudentsNames);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: 'Server Error',
      });
    }
  });

// @route POST /api/classes
// @desc  create a new contact
// @access public

router.post(
  "/",
  [
    auth,
    check('gradeName', 'Please Select Class').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 400, msg: errors.array()[0].msg });
    }
    
    const { gradeName, schedule, studentsEnroll } = req.body;

    try {
      const newClass = new Class({
        gradeName: {
          id: gradeName.id, // Extract teacher's ID
          name: gradeName.name, // Extract teacher's name
        },
        schedule,
        studentsEnroll,
      });

      await newClass.save();
      res.json({ msg: "Assign Class To Student successfully", newClass });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: 500, msg: 'Server Error' });
    }
  }
);

// @route PUT /api/contacts/:id
// @desc  update contact by id
// @access private

router.put(
  "/:id",
  [
    auth,
    // Additional validation if needed
  ],
  async (req, res) => {
    const { gradeName, schedule, studentsEnroll } = req.body;

    try {
      let updatedClass = await Class.findById(req.params.id);

      if (!updatedClass) {
        return res.status(404).json({ status: 404, msg: "Class not found" });
      }

      // Update the class properties
      updatedClass.gradeName = {
        id: gradeName.id, // Extract class ID
        name: gradeName.name, // Extract class name
      };
      updatedClass.schedule = schedule;
      updatedClass.studentsEnroll = studentsEnroll;

      await updatedClass.save();
      res.json({ msg: "Class assignment updated successfully", updatedClass });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: 500, msg: 'Server Error' });
    }
  }
);

// @route Delete /api/contacts/:id
// @desc  delete contact by id
// @access private

router.delete(
  "/:id",
  [
    auth,
    // Additional validation if needed
  ],
  async (req, res) => {
    try {
      const deletedClass = await Class.findByIdAndDelete(req.params.id);

      if (!deletedClass) {
        return res.status(404).json({ status: 404, msg: "Class not found" });
      }

      res.json({ msg: "Class assignment deleted successfully", deletedClass });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: 500, msg: 'Server Error' });
    }
  }
);
module.exports = router