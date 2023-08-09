const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const User = require('../model/User')
const Class = require('../model/Classes')
const router = express.Router()
// @route GET /api/contacts
// @desc  get all contacts
// @access private

router.get("/", auth, async (req, res) => {
    try {
      const classes = await Class.find().sort({ createdAt: -1 });
      res.json(classes);
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
      [check('className', 'Please enter class name').exists()],
      [check('instructor', 'Please enter instructor name').exists()],
      [check('schedule', 'Please enter class schedule').exists()],
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
      const { className, instructor, schedule, room } = req.body;
      try {
        const newClass = new Class({
          className,
          instructor,
          schedule,
          room,
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