const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const createTimetable = require("../model/TimeTable");
const Teacher = require("../model/AssignTeacherClass"); // Replace with your Class model
const Student = require("../model/StudentForm"); // Replace with your Student model

// GET /api/createTimetable
// Retrieve all createTimetable records
router.get("/", async (req, res) => {
  try {
    const Subjects = await createTimetable.find();
    res.json({ Subjects });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
router.get("/teacher/:teacherId", auth, async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    
    const timetable = await createTimetable.find({ "teacherAssign.id": teacherId }).sort({
      createdAt: -1,
    });

    if (timetable.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Timetable not found for the specified teacher.",
      });
    }

    res.json(timetable);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      msg: "Server Error",
    });
  }
});



// POST /api/createTimetable
// Create a new createTimetable
router.post(
    "/",
    [
      auth, // Require authentication
      isAdmin, // Require admin role
      check("gradeName", "Grade name is required").notEmpty(),
      check("teacherAssign", "Teacher assignment is required").notEmpty(),
      // You can add more validation checks for other fields here
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: 400, msg: errors.array()[0].msg });
        }
  
        const {
          gradeName,
          teacherAssign,
          selectSubject,
          selectedDays,
          selectedTimeSlot,
        } = req.body;
  
        const newTimetable = new createTimetable({
          userId: req.user.id, // Assuming you have authenticated user information in req.user
          gradeName: {
            id: gradeName.id, // Extract class's ID
            name: gradeName.name, // Extract class's name
          },
          teacherAssign: {
            id: teacherAssign.id, // Extract teacher's ID
            name: teacherAssign.name, // Extract teacher's name
          },
          selectSubject,
          selectedDays,
          selectedTimeSlot,
        });
  
        await newTimetable.save();
  
        res.json({ msg: "Timetable created successfully", newTimetable });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
      }
    }
  );
  router.put("/:id", auth, async (req, res) => {
    try {
      const timetableId = req.params.id;
      
      // Check if the timetable record exists
      const timetable = await createTimetable.findById(timetableId);
      if (!timetable) {
        return res.status(404).json({
          status: 404,
          msg: "Timetable not found.",
        });
      }
  
      // Check if the authenticated user has the authority to update the timetable
      if (timetable.userId.toString() !== req.user.id) {
        return res.status(403).json({
          status: 403,
          msg: "You don't have permission to update this timetable.",
        });
      }
  
      const {
        gradeName,
        teacherAssign,
        selectSubject,
        selectedDays,
        selectedTimeSlot,
      } = req.body;
  
      // Update the timetable record
      timetable.gradeName = gradeName;
      timetable.teacherAssign = {
        id: teacherAssign.id,
        name: teacherAssign.name,
      };
      timetable.selectSubject = selectSubject;
      timetable.selectedDays = selectedDays;
      timetable.selectedTimeSlot = selectedTimeSlot;
  
      await timetable.save();
  
      res.json({
        status: 200,
        msg: "Timetable updated successfully.",
        updatedTimetable: timetable,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server Error",
      });
    }
  });
  router.delete("/:id", auth, async (req, res) => {
    let timetableId = await createTimetable.findById(req.params.id);
  
    if (!timetableId) {
      return res.status(404).json({
        status: 404,
        msg: "Teacher not found",
      });
    }
  
    if (timetableId.userId.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: timetableId.userId,
        id: req.user.id,
        msg: "You do not have correct authorization",
      });
    }
  
    try {
      await createTimetable.findByIdAndRemove(req.params.id);
  
      res.json({
        msg: "This Teacher has been removed.",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  });
  
module.exports = router;
