const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../model/User");
const router = express.Router();


// @route GET /api/users
// @desc Get list of users with approval status
// @access Private (only accessible by admin)
router.get("/", async (req, res) => {
    try {
      // Fetch the list of users along with their approval status
      const users = await Users.find({}, "name email role approved");
  
      res.status(200).json({
        status: 200,
        users: users,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server Error",
      });
    }
  });


// @route POST /api/users
// @desc  Register new user
// @access public

router.post(
  "/",
  [
    [check("name", "Please enter your name").notEmpty()],
    [check("email", "Please enter your email").isEmail()],
    [check("role", "Please select your role").notEmpty()],
    [
      check(
        "password",
        "Please enter your password with at least 6 characters"
      ).isLength({
        min: 6,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({
        status: 400,
        // errors:errorMessages,
        msg: errorMessages[0],
      });
    }
    const { name, email, role, password, approved } = req.body; // Add 'approved' here

    try {
      let user = await Users.findOne({ email });
      if (user) {
        return res.status(401).json({
          status: 401,
          msg: "User with this email already exists",
        });
      }
      user = await new Users({
        name,
        email,
        role,
        password,
        approved: approved || false, // Use provided value or default to false
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.status(200).json({
        status: 200,
        msg: "User registration submitted. Awaiting admin approval.",
      });
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server Error",
      });
    }
  }
);
// Admin Approval Route
router.put("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userToUpdate = await Users.findById(userId);
  
      if (!userToUpdate) {
        return res.status(404).json({
          status: 404,
          msg: "User not found",
        });
      }
  
      // Toggle the 'approved' status
      userToUpdate.approved = !userToUpdate.approved;
      await userToUpdate.save();
  
      res.status(200).json({
        status: 200,
        msg: userToUpdate.approved ? "User approved successfully" : "User unapproved",
      });
    } catch (err) {
      // Handle error
      console.error("Error updating user approval status:", err);
      res.status(500).json({
        status: 500,
        msg: "Server Error",
      });
    }
  });

// Delete User Route
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userToDelete = await Users.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({
        status: 404,
        msg: "User not found",
      });
    }

    await Users.deleteOne({ _id: userToDelete._id });

    res.status(200).json({
      status: 200,
      msg: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      status: 500,
      msg: "Server Error",
    });
  }
});
module.exports = router;
