const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const Teacher = require('../model/TeacherForm')
const Users = require('../model/User')
const router = express.Router()


router.get("/:id", auth, async (req, res) => {
  try {
    const teachers = await Teacher.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    // if (teachers.length === 0) {
    //   return res.status(404).json({
    //     status: 404,
    //     msg: "Teacher not found.",
    //   });
    // }

    res.json(teachers);
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
        const teachers = await Teacher.find().sort({
          createdAt:-1,
        })
        res.json(teachers)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }

})

// @route POST /api/teachers
// @desc  create a new Teacher
// @access public

router.post("/",
[
auth,[check('firstname','Please enter firstname').exists()],
[check('lastname','Please enter lastname').exists()],
[check('gender','Please enter Teacher gender').exists()],
[check('degree','Please Enter Your Last Degree Name').exists()],
],

async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:400,
            msg: errors.array()[0].msg, // Use the first error message
        })
    }
    const {
      firstname,
      lastname,
      dob,
      gender,
      contactNo,
      email,
      address,
      eduBackground,
      degree,
      experience,
      enrollDate,
      } = req.body
    try{
        const newTeacher = new Teacher({
          firstname,
          lastname,
          dob,
          gender,
          contactNo,
          email,
          address,
          //Education Info
          eduBackground,
          degree,
          experience,
          enrollDate,
          profilePic: req.file ? req.file.filename : "", // Store the filename in profilePic
          userId:req.user.id,
        })
        await newTeacher.save();
        // res.json(newTeacher)
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

// @route PUT /api/TeacherForm/:id
// @desc  update Teacher by id
// @access private
router.put("/:id", auth, async (req, res) => {
  const {
    dob,
    gender,
    contactNo,
    email,
    address,
    eduBackground,
    degree,
    experience,
    enrollDate,
    profilePic
  } = req.body;

  let teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({
      status: 404,
      msg: "Teacher not found",
    });
  }
  const teacherFields = {};
  // if (firstname) teacherFields.firstname = firstname;
  // if (lastname) teacherFields.lastname = lastname;
  if (dob) teacherFields.dob = dob;
  if (gender) teacherFields.gender = gender;

  if (contactNo) teacherFields.contactNo = contactNo;
  if (email) teacherFields.email = email;
  if (address) teacherFields.address = address;
  if (eduBackground) teacherFields.eduBackground = eduBackground;

  if (experience) teacherFields.experience = experience;
  if (degree) teacherFields.degree = degree;
  if (enrollDate) teacherFields.enrollDate = enrollDate;
  if (profilePic) teacherFields.profilePic = profilePic;

  if (teacher.userId.toString() !== req.user.id) {
    return res.status(401).json({
      status: 401,
      userId: teacher.userId,
      id: req.user.id,
      msg: "You do not have correct authorization",
    });
  }

  try {
    teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: teacherFields },
      { new: true }
    );

    // res.json(teacher);
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



// @route Delete /api/teachers/:id
// @desc  delete Teacher by id
// @access private

router.delete("/:id", auth, async (req, res) => {
    let teacher = await Teacher.findById(req.params.id);
  
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        msg: "Teacher not found",
      });
    }
  
    if (teacher.userId.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: teacher.userId,
        id: req.user.id,
        msg: "You do not have correct authorization",
      });
    }
  
    try {
      await Teacher.findByIdAndRemove(req.params.id);
  
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
module.exports = router