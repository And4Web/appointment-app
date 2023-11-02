const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const Doctor = require('../models/doctorModel');

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

//Protected route- get user info:
router.post("/get-user-info-by-id", authMiddleware, async (req, res)=>{
  try {    
    const user = await User.findOne({_id: req.body.userId});
    user.password = undefined;
    user.__v = undefined;
    user.updatedAt = undefined;
   
    if(!user){
      return res.status(200).json({message: "User not found", success: false})
    }else{
      return res.status(200).json({success: true, loggedinUser: user})
    }

  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error})
  }
})

// when a user applies for a doctor's account:
router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const doctorReq = req.body;
    const newDoctor = await new Doctor({...doctorReq, status: "pending"})    
    await newDoctor.save();

    const admin = await User.findOne({isAdmin: true});

    const unseenNotifications = {
      type: "new-doctor-application",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor's account.`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors"
    };

    admin.unseenNotifications.push(unseenNotifications);

    await User.findByIdAndUpdate(admin._id, {unseenNotifications});

    return res.status(200).json({
      success: true,
      message: "Applied for doctor's account successfully."
    })

  } catch (error) {
    console.log("Errors >>> ", error)
    return res
      .status(500)
      .json({ message: "Error applying for a doctor's account.", success: false, error: error.message });
  }
})

// mark all notifications as seen:
router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId)
    let unseenNotifications = user.unseenNotifications;
    let seenNotifications = user.seenNotifications;

    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    // console.log('updated user >>> ', updatedUser);

    return res.status(200).json({success: true, message: "All notifications marked as seen.", data: updatedUser});

  } catch (error) {
    console.log("Errors >>> ", error)
    return res
      .status(500)
      .json({ message: "Error marking all notifications as seen.", success: false, error: error.message });
  }
})

// delete all notifications:
router.post("/delete-all-notifications", authMiddleware, async(req, res)=>{
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId)

    user.seenNotifications = [];
    user.unseenNotifications = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    // console.log('updated user >>> ', updatedUser);

    return res.status(200).json({success: true, message: "All notifications deleted.", data: updatedUser});
  } catch (error) {
    console.log("Errors >>> ", error)
    return res
      .status(500)
      .json({ message: "Error deleting all notifications.", success: false, error: error.message });
  }
})

module.exports = router;
// start at 15:00