const express = require("express")
const auth = require('../middlewares/auth')
const {check,validationResult} = require('express-validator')
const Teacher = require('../model/Teacher')
const router = express.Router()
// @route GET /api/Teachers
// @desc  get all Teachers
// @access private

router.get("/",auth, async(req,res)=>{
    try{
        const teachers = await Teacher.find({user:req.user.id}).sort({
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
// @desc  create a new teacher
// @access public

router.post("/",
[
auth,[check('name','Please enter name').exists()],
[check('phone','Please enter valid mobile #').isLength({min:6})],
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:400,
            errors:errors.array()
        })
    }
    const {name,email,phone,address,education} = req.body
    try{
        const newTeacher = new Teacher({
            name,
            email,
            phone,
            address,
            education,
            user:req.user.id,
        })
        await newTeacher.save();
        res.json(newTeacher)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }
})

// @route PUT /api/Teachers/:id
// @desc  update Teacher by id
// @access private

router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, address,education } = req.body;
  
    let teacher = await Teacher.findById(req.params.id);
  
    if (!Teacher) {
      return res.status(404).json({
        status: 404,
        msg: "Teacher not found",
      });
    }
  
    const teacherFields = {};
    if (name) teacherFields.name = name;
    if (email) teacherFields.email = email;
    if (phone) teacherFields.phone = phone;
    if (address) teacherFields.address = address;
    if (education) teacherFields.education = education;
    if (teacher.user.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: teacher.user,
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
  
      res.json(teacher);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  });

// @route Delete /api/teachers/:id
// @desc  delete teacher by id
// @access private

router.delete("/:id", auth, async (req, res) => {
    let teacher = await Teacher.findById(req.params.id);
  
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        msg: "teacher not found",
      });
    }
  
    if (teacher.user.toString() !== req.user.id) {
      return res.status(401).json({
        status: 401,
        userId: teacher.user,
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