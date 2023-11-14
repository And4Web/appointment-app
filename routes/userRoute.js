const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

router.get("/test", (req, res) => {
  return res.send("This is the user test route.");
});

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .json({ message: "User already exists.", success: false });
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      const newUser = new User(req.body);
      await newUser.save();

      return res
        .status(200)
        .json({ message: "New User created successfully." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user.", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User doesn't exist.", success: false });
    }
    const ifPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!ifPasswordMatch) {
      return res
        .status(200)
        .json({ message: "Wrong Password, try again", success: false });
    } else {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .json({ message: "token generated", success: true, token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

//Protected route- get user info:
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const doctor = await Doctor.findOne({ userId: user._id });

    user.password = undefined;
    user.__v = undefined;
    user.updatedAt = undefined;

    loggedinUser = {
      ...user._doc,
      doctorId: user.isDoctor ? doctor._id : null,
    };

    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    } else {
      return res.status(200).json({ success: true, loggedinUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

// mark all notifications as seen:
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.body.userId;
      const user = await User.findById(userId);
      let unseenNotifications = user.unseenNotifications;
      let seenNotifications = user.seenNotifications;

      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];

      const updatedUser = await user.save();
      updatedUser.password = undefined;

      // console.log('updated user >>> ', updatedUser);

      return res
        .status(200)
        .json({
          success: true,
          message: "All notifications marked as seen.",
          data: updatedUser,
        });
    } catch (error) {
      console.log("Errors >>> ", error);
      return res
        .status(500)
        .json({
          message: "Error marking all notifications as seen.",
          success: false,
          error: error.message,
        });
    }
  }
);

// delete all notifications:
router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    user.seenNotifications = [];
    user.unseenNotifications = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    // console.log('updated user >>> ', updatedUser);

    return res
      .status(200)
      .json({
        success: true,
        message: "All notifications deleted.",
        data: updatedUser,
      });
  } catch (error) {
    console.log("Errors >>> ", error);
    return res
      .status(500)
      .json({
        message: "Error deleting all notifications.",
        success: false,
        error: error.message,
      });
  }
});

// get all approved doctors list:
router.get("/get-approved-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });

    if (!doctors) {
      return res.status(404).json({
        message: "no approved doctors found in database",
        success: true,
      });
    }
    return res.status(200).json({
      message: "list of all approved doctors.",
      success: true,
      doctors,
    });
  } catch (error) {
    console.log("error get-approved-doctors endpoint: ", error);
    return res.status(500).json({
      message: "error get-approved-doctors endpoint",
      success: false,
      error,
    });
  }
});

// book-appointment
router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    const appointmentRequest = req.body;
    const newAppointment = await new Appointment(appointmentRequest);
    await newAppointment.save();
    
    const doctor = await Doctor.findOne({_id: appointmentRequest.doctorInfo.doctorId})
    const doctorUser = await User.findOne({_id: doctor.userId})

    doctorUser.unseenNotifications.push({
      type: "New-Appointment-Request",
      message: `A new appointment request has been received from ${appointmentRequest.userInfo.name} on ${appointmentRequest.date} at ${appointmentRequest.time}.`,
      onClickPath: '/doctor/appointments'
    })
    
    await doctorUser.save();
    console.log(doctorUser.name) 

    return res.status(200).json({
      message: `Appointment Request sent.`,
      success: true,
      // appointmentId: newAppointment._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error booking appointment at this moment.",
      success: false,
      error,
    });
  }
});

module.exports = router;
