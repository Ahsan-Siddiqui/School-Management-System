const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const Student = require('../model/StudentForm')
const Users = require('../model/User')
const router = express.Router()


router.get("/:id", auth, async (req, res) => {
  try {
    // Check if the logged-in user is a teacher
    // if (req.user.role !== "teacher") {
    //   return res.status(403).json({
    //     status: 403,
    //     msg: "Access denied. User is not a teacher.",
    //   });
    // }

    const students = await Student.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    // if (students.length === 0) {
    //   return res.status(404).json({
    //     status: 404,
    //     msg: "Student not found.",
    //   });
    // }

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      msg: "Server Error",
    });
  }
});

router.get("/",auth, async(req,res)=>{
    try{
        const students = await Student.find().sort({
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

router.post("/",
[
auth,[check('firstname','Please enter firstname').exists()],
[check('lastname','Please enter lastname').exists()],
[check('gender','Please enter student gender').exists()],
[check('parntGardName','Please enter parent/Guardian Name').exists()],
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
      } = req.body
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
          profilePic: req.file ? req.file.filename : "", // Store the filename in profilePic
          userId:req.user.id,
        })
        await newStudent.save();
        // res.json(newStudent)
        res.status(200).json({
          status: 200,
          msg: "Profile Has Been Created Successfully",
        });
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }
})

// @route PUT /api/studentForm/:id
// @desc  update student by id
// @access private
router.put("/:id", auth, async (req, res) => {
  const {
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
    profilePic,
  } = req.body;

  let student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({
      status: 404,
      msg: "Student not found",
    });
  }
  const studentFields = {};
  // if (firstname) studentFields.firstname = firstname;
  // if (lastname) studentFields.lastname = lastname;
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
  if (profilePic) studentFields.profilePic = profilePic;

  if (student.userId.toString() !== req.user.id) {
    return res.status(401).json({
      status: 401,
      userId: student.userId,
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

    // res.json(student);
    res.status(200).json({
      status: 200,
      msg: "Profile Has Been Updated Successfully",
    });
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
  try { 
  let student = await Student.findById(req.params.id);
  
    if (!student) {
      return res.status(404).json({
        status: 404,
        msg: "student not found",
      });
    }
  
    if (student.userId.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: student.userId,
        id: req.user.id,
        msg: "You do not have correct authorization",
      });
    }
  
    
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