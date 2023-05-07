const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  return res.send("This is the user test route.");
});

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({email: req.body.email});
    if(userExists){
      return res.status(200).json({message: "User already exists.", success: false})
    }else{
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      const newUser = new User(req.body);
      await newUser.save();

      return res.status(200).json({message: "New User created successfully."})
    } 
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user.", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return res.status(200).json({message: "User doesn't exist.", success: false});
    }
    const ifPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if(!ifPasswordMatch){
      return res.status(200).json({message: "Wrong Password, try again", success: false})
    }else{
      const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
      return res.status(200).json({message: 'token generated', success: true, token: token})
    }
    
  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error})
  }
});

module.exports = router;
