const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const createSubject = require("../model/CreateSubject");

// GET /api/createSubject
// Retrieve all createSubject records
router.get("/", async (req, res) => {
  try {
    const Subjects = await createSubject.find();
    res.json({ Subjects });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/createSubject
// Create a new createSubject
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
      // Check if a Subject with the same title already exists
      const existingSubject = await createSubject.findOne({
        title: { $regex: new RegExp(`^${title}$`, "i") }, // Case-insensitive search
      });
      if (existingSubject) {
        return res
          .status(400)
          .json({ status: 400, msg: "Subject title already exists" });
      }
      const newSubject = new createSubject({
        title,
        description,
      });

      await newSubject.save();

      res.json({ msg: "Subject created successfully", newSubject });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// PUT /api/createSubject/:id
// Update a createSubject record by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedSubject = await createSubject.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedSubject) {
      return res.status(404).json({ msg: "Subject not found" });
    }
    res.json({ msg: "Subject updated successfully", updatedSubject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/createSubject/:id
// Delete a createSubject record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSubject = await createSubject.findByIdAndRemove(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ msg: "Subject not found" });
    }
    res.json({ msg: "Subject deleted successfully", deletedSubject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
