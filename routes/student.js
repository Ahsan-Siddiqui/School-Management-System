const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const multer = require('multer'); // Import multer
const Student = require('../model/Student')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// @route GET /api/students
// @desc  get all students
// @access private

// Add this route to serve a specific student's profile picture
router.get("/profile-pics/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.sendFile(filePath);
});

router.get("/",auth, async(req,res)=>{
    try{
        const students = await Student.find({user:req.user.id}).sort({
          createdAt:-1,
        })
        res.json(students)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }

})

// @route POST /api/students
// @desc  create a new student
// @access public

router.post("/",upload.single('profilePic'), // Handle profile image upload
[
auth,[check('firstname','Please enter firstname').exists()],
[check('lastname','Please enter lastname').exists()],
[check('gender','Please enter student gender').exists()],
[check('parntGardName','Please enter parent/Guardian Name').exists()],
[check('classGrade','Please enter Class Number like Class-01').exists()],
[check('section','Please enter section A,B or C').exists()],
[check('rollNo','Please enter roll number as per class').exists()],
[check('enrollDate','Please enter joining date of student').exists()],
// [check('emergancyContact','Please enter Emergancy Contact Number').isLength({min:11})],
],

async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:400,
            msg: errors.array()[0].msg, // Use the first error message
        })
    }
    const {firstname,
      lastname,
      dob,
      gender,
      contactNo,
      email,
      address,
      parntGardInfo,
      parntGardName,
      relation,
      parntGardNumber,
      parntGardEmail,
      parntGardAddress,
      classGrade,
      section,
      rollNo,
      enrollDate,
      addmissionNumber,
      emergancyContact} = req.body
    try{
        const newStudent = new Student({
          firstname,
          lastname,
          dob,
          gender,
          contactNo,
          email,
          address,
          //Parents Gardian Info
          parntGardInfo,
          parntGardName,
          relation,
          parntGardNumber,
          parntGardEmail,
          parntGardAddress,
          //Class Info
          classGrade,
          section,
          rollNo,
          enrollDate,
          addmissionNumber,
          profilePic: req.file ? req.file.filename : "", // Store the filename in profilePic

          // profilePic: {
          //   data: req.file.buffer,
          //   contentType: req.file.mimetype,
          // },
          emergancyContact,
          user:req.user.id,
        })
        await newStudent.save();
        res.json(newStudent)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }
})

// @route PUT /api/students/:id
// @desc  update student by id
// @access private

router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, address } = req.body;
  
    let student = await Student.findById(req.params.id);
  
    if (!student) {
      return res.status(404).json({
        status: 404,
        msg: "student not found",
      });
    }
  
    const studentFields = {};
if (firstname) studentFields.firstname = firstname;
if (lastname) studentFields.lastname = lastname;
if (dob) studentFields.dob = dob;
if (gender) studentFields.gender = gender;
if (contactNo) studentFields.contactNo = contactNo;
if (email) studentFields.email = email;
if (address) studentFields.address = address;
if (parntGardInfo) studentFields.parntGardInfo = parntGardInfo;
if (parntGardName) studentFields.parntGardName = parntGardName;
if (relation) studentFields.relation = relation;
if (parntGardNumber) studentFields.parntGardNumber = parntGardNumber;
if (parntGardEmail) studentFields.parntGardEmail = parntGardEmail;
if (parntGardAddress) studentFields.parntGardAddress = parntGardAddress;
if (classGrade) studentFields.classGrade = classGrade;
if (section) studentFields.section = section;
if (rollNo) studentFields.rollNo = rollNo;
if (enrollDate) studentFields.enrollDate = enrollDate;
if (addmissionNumber) studentFields.addmissionNumber = addmissionNumber;
if (profilePic) studentFields.profilePic = profilePic;
if (emergancyContact) studentFields.emergancyContact = emergancyContact;
  
    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: student.user,
        id: req.user.id,
        msg: "You do not have correct authorization",
      });
    }
  
    try {
      student = await Student.findByIdAndUpdate(
        req.params.id,
        { $set: studentFields },
        { new: true }
      );
  
      res.json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  });

// @route Delete /api/students/:id
// @desc  delete student by id
// @access private

router.delete("/:id", auth, async (req, res) => {
    let student = await Student.findById(req.params.id);
  
    if (!student) {
      return res.status(404).json({
        status: 404,
        msg: "student not found",
      });
    }
  
    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: student.user,
        id: req.user.id,
        msg: "You do not have correct authorization",
      });
    }
  
    try {
      await Student.findByIdAndRemove(req.params.id);
  
      res.json({
        msg: "This Student has been removed.",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  });
module.exports = router