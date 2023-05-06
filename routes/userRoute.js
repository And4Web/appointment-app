const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.get("/test", (req, res) => {
  res.send("This is the user test route.");
});

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({email: req.body.email});
    if(userExists){
      res.status(400).json({message: "User already exists."})
    }else{
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      const newUser = new User(req.body);
      await newUser.save();

      res.status(200).json({message: "New User created successfully."})
    } 
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user.", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
