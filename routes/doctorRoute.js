const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const moment = require('moment');

const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require('../models/appointmentModel');
// authMiddleware,

// get doctor profile by doctorId:
router.get("/profile/:doctorId", authMiddleware, async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      return res.status(200).json({
        message: `Hello, Dr. ${doctor.firstName} ${doctor.lastName}`,
        success: true,
        data: doctor,
      });
    }
  } catch (error) {
    console.log("Error doctor profile by userId: ", error);
    return res.status(500).json({
      message: "",
      success: false,
      error,
    });
  }
});

// update doctor profile
router.post("/update-doctor-account", authMiddleware, async (req, res) => {
  try {
    const values = req.body;
    // console.log("values from request: ", values.doctorTimings);
    let doctor = await Doctor.findOne({ userId: req.body.userId });
    await doctor.updateOne(values);
    doctor.timings = values.doctorTimings;
    await doctor.save();

    return res
      .status(200)
      .json({ message: "Doctor profile updated successfully.", success: true });
  } catch (error) {
    console.log("Error updating doctor account: ", error);
    return res.status(500).json({
      message: "Error updating doctor account.",
      success: false,
      error,
    });
  }
});

// get all doctors
router.get("/all", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    if (!doctors) {
      return res.status(404).json({
        message: "can not gt the List of all the doctors in the database.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "List of all the doctors in the database.",
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "can not gt the List of all the doctors in the database.",
      success: false,
      error,
    });
  }
});

// check availability
router.post("/check-availability", authMiddleware, async(req, res)=>{
  try {
    const request = req.body;
    const date = request.date;
    const fromTime = moment(request.time).subtract(1,'hours').toISOString();
    const toTime = moment(request.time).add(1,'hours').toISOString();
    const appointments = await Appointment.find({doctorId: request.doctorId, date, time: {$gte: fromTime, $lte: toTime}});

    if(appointments.length > 0){
      // console.log(appointments);
      return res.status(200).json({
        message: "No slots available.",
        success: false,
      })
    }else{
      return res.status(200).json({
        message: "Slot available.",
        success: true,
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "can not gt the List of all the doctors in the database.",
      success: false,
      error,
    });
  }
})

// approve the appointment request by user



module.exports = router;
