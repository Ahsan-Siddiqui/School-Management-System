const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const Teacher = require('../model/Teacher')
const Class = require('../model/Classes')
const Student = require("../model/Student")
const router = express.Router()
// @route GET /api/contacts
// @desc  get all contacts
// @access private

router.get("/", auth, async (req, res) => {
    try {
      const classes = await Class.find().sort({ createdAt: -1 });
      const classesWithTeacherAndStudentsNames = await Promise.all(
        classes.map(async (cls) => {
            const teacher = await Teacher.findById(cls.teacherAssign[0]);
            const teacherName = teacher ? teacher.name : 'Unknown Teacher';
            const students = await Promise.all(
              cls.studentsEnroll.map(async (studentId) => {
                const student = await Student.findById(studentId);
                return student ? student.name : 'Unknown Student';
              })
            );
            return { ...cls._doc, teacherName, studentsNames: students  };
        })
    );

    res.json(classesWithTeacherAndStudentsNames);
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
      [check('gradeName', 'Please enter Grade Name').exists()],
      [check('gradeId', 'Please enter Grade as Id').exists()],
      [check('teacherAssign', 'Please select teacher who assign the class').exists()],
      [check('schedule', 'Please enter class date and time').exists()],
      [check('room', 'Please enter room number').exists()],
      [check('studentsEnroll', 'Please select students for this class').exists()],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
          status: 400,
        //   errors: errors.array(),
        msg:errorMessages[0]
        });
      }
      const { gradeName,gradeId, teacherAssign, schedule, room,studentsEnroll } = req.body;
      try {
        const newClass = new Class({
          gradeName,gradeId, teacherAssign, schedule, room,studentsEnroll
        });
        await newClass.save();
        res.json(newClass);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: 500,
          msg: 'Server Error',
        });
      }
    }
  );

// @route PUT /api/contacts/:id
// @desc  update contact by id
// @access private

// router.put("/:id", auth, async (req, res) => {
//     const { className, instructor, schedule, room } = req.body;
  
//     let contact = await Class.findById(req.params.id);
  
//     if (!contact) {
//       return res.status(404).json({
//         status: 404,
//         msg: "Contact not found",
//       });
//     }
  
//     const contactFields = {};
//     if (name) contactFields.name = name;
//     if (email) contactFields.email = email;
//     if (phone) contactFields.phone = phone;
//     if (relation) contactFields.relation = relation;
  
//     if (contact.user.toString() !== req.user.id) {
//       return res.status(401).json({
//         status: 401,
//         userId: contact.user,
//         id: req.user.id,
//         msg: "You do not have correct authorization",
//       });
//     }
  
//     try {
//       contact = await Contact.findByIdAndUpdate(
//         req.params.id,
//         { $set: contactFields },
//         { new: true }
//       );
  
//       res.json(contact);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({
//         status: 500,
//         msg: "Server error",
//       });
//     }
//   });

// @route Delete /api/contacts/:id
// @desc  delete contact by id
// @access private

// router.delete("/:id", auth, async (req, res) => {
//     let contact = await Contact.findById(req.params.id);
  
//     if (!contact) {
//       return res.status(404).json({
//         status: 404,
//         msg: "Contact not found",
//       });
//     }
  
//     if (contact.user.toString() !== req.user.id) {
//       return res.status(401).json({
//         status: 401,
//         userId: contact.user,
//         id: req.user.id,
//         msg: "You do not have correct authorization",
//       });
//     }
  
//     try {
//       await Contact.findByIdAndRemove(req.params.id);
  
//       res.json({
//         msg: "This contact has been removed.",
//       });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({
//         status: 500,
//         msg: "Server error",
//       });
//     }
//   });
module.exports = router