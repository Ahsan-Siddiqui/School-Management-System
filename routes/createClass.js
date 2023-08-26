const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const createClass = require("../model/CreateClass");

// GET /api/createClass
// Retrieve all createclass records
router.get("/", async (req, res) => {
  try {
    const classes = await createClass.find();
    res.json({ classes });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/createClass
// Create a new createclass
router.post(
  "/",
  [
    auth, // Require authentication
    isAdmin, // Require admin role
    check("title", "Title is required")
      .notEmpty()
      .isString()
      .isLength({ min: 2, max: 100 }),

    // check("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: 400, msg: errors.array()[0].msg });
      }

      const { title, description } = req.body;
      // Check if a class with the same title already exists
      const existingClass = await createClass.findOne({
        title: { $regex: new RegExp(`^${title}$`, "i") }, // Case-insensitive search
      });
      if (existingClass) {
        return res
          .status(400)
          .json({ status: 400, msg: "Class title already exists" });
      }
      const newClass = new createClass({
        title,
        description,
      });

      await newClass.save();

      res.json({ msg: "Class created successfully", newClass });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// PUT /api/createClass/:id
// Update a createclass record by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedClass = await createClass.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.json({ msg: "Class updated successfully", updatedClass });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/createClass/:id
// Delete a createclass record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedClass = await createClass.findByIdAndRemove(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.json({ msg: "Class deleted successfully", deletedClass });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
