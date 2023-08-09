const express = require("express")
const {check,validationResult} =require('express-validator')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken');
const config = require('config')
const Users = require('../model/User')
const router = express.Router()

// @route POST /api/users
// @desc  Register new user
// @access public

router.post("/",
[
    [check("name",'Please enter your name').notEmpty()],
    [check("email",'Please enter your email').isEmail()],
    [check("role",'Please select your role').notEmpty()],
    [check("password",'Please enter your password with at least 6 characters').isLength({
        min:6}),],
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({
            status:400,
            // errors:errorMessages,
            msg:errorMessages[0]
        })
    }
    const {name,email,role,password} = req.body

    try {
        let user = await Users.findOne({email})
        if(user){
        return res.status(401).json({
                status:401,
                msg:'User with this email already exists',
            })
        }
        user = await new Users({
            name,email,role,password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)

        await user.save()
        res.status(200).json({
            status:200,
            msg:'User is created successfully',
        })
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:3600000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
    } 
    catch (err) {
        console.log(err.message)
        res.status(500).json({
            status:500,
            msg:'Server Error',
        })
    }
    }
)

module.exports = router