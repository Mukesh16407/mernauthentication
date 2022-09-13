const express = require("express");
const router = express.Router();

const User = require("../model/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post('/register', async(req,res)=>{
   
    try{
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser){
            return res.status(200).send({ success: false, message: "User Already Registered" });
        } 
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        const result = await newUser.save();
        
        res.status(200).send({
            success: true,
            message: "Registration successfully , Please verify your email",
          });
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
})

module.exports = router;