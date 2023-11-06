const express = require('express');
const router = express.Router();

const User = require("../models/userModel");
const Doctor = require('../models/doctorModel');

const authMiddleware = require("../middlewares/authMiddleware");


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

// get Users List
router.get('/get-all-users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, {"password": 0, "seenNotifications": 0, "unseenNotifications": 0, "updatedAt": 0, "__v": 0, });
    
    return res.status(200).json({message: "Users fetched successfully", success: true, users})
  } catch (error) {
    return res.status(500).json({message: "Error fetching list of users", success: false, error})
  }
})

// get Doctors List
router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    if(doctors.length !== 0){
      return res.status(200).json({message: "Doctors fetched successfully", success: true, doctors})
    }else{
      return res.status(404).json({message: "No doctors found in the database", success: true, doctors: []})
    }
  } catch (error) {
    return res.status(500).json({message: "Error fetching list of doctors", success: false, error})
  }
})

// change doctor's status
router.post("/change-doctor-account-status", authMiddleware, async (req, res)=>{
  try {
    const {doctorId, status} = req.body;
    let doctor = await Doctor.findByIdAndUpdate(doctorId, {status});
    let userId = doctor.userId;
    let user = await User.findById(userId);
    // console.log(doctorId, status, userId);

    let unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "doctor-request-approved",
      message: `Your doctor account has been ${status}.`,
      onClickPath: "/notifications"
    })
    user.isDoctor = true;
    user = await user.save();
    
    return res.status(200).json({
      message: "Doctor's account approved successfully.",
      success: true,
      data: doctor,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error changing Doctor's status.",
      error: error.message
    })
  }
})


module.exports = router;