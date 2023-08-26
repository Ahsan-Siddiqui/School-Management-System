const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check,validationResult} = require('express-validator')
const router = express.Router()

const User = require('../model/User')
const auth = require("../middlewares/auth")

// @route GET /api/auth
// @desc  get login data
// @access private

router.get("/",auth, async (req,res)=>{
    // res.send("Get login data")
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }
})

// @route POST /api/users
// @desc  Login user
// @access public

router.post("/",[
    check('email','Please enter valid email').isEmail(),
    check('password','Please enter a correct password').exists()
],
async (req,res)=>{ 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
                status:400,
                errors:errors.array(),
                msg:'Please Enter Your Email and Password'
            })
    }
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                status:400,
                msg:'User with this email does not exist'
            })
        }
        if (!user.approved && user.role !== 'admin') {
            return res.status(401).json({
                status: 401,
                msg: 'User not approved by admin'
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                status:400,
                msg:'Invalid password'
            })
        }
        const payload = {
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:3600000
        },(err,token)=>{
            if(err) throw err
            res.json({token,payload,status:200,
                msg:"User Login Successfully"})
        })
    }   
    catch(err){
        console.error(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error'
        })
    }
})

module.exports = router