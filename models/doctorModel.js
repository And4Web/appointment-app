const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      requried: true
    },
    feePerConsultation: {
      type: Number,
      required: true,
    },
    timings: {
      type: Array,
      required: true
    },
    status: {
      type: String,
      default: "pending"
    }
  },
  {
    timestamps: true,
  }
);

const DoctorModel = mongoose.model("Doctors", DoctorSchema);

module.exports = DoctorModel;
