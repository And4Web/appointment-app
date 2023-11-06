const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
// authMiddleware,


// get doctor profile by userId:
router.get("/profile/:userId", authMiddleware, async (req, res)=>{
  try {
    const doctorId = req.params.userId;
    const doctor = await Doctor.findById(doctorId);
  if(doctor){
    return res.status(200).json({
      message: `Hello, Dr. ${doctor.firstName} ${doctor.lastName}`,
      success: true,
      data: doctor
    });
  }
  } catch (error) {
    console.log("Error doctor profile by userId: ", error)
    return res.status(500).json({
    message: "",
    success: false,
    error
   }) 
  }
})

module.exports = router;