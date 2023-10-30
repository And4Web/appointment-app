const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    doctorId: {
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
      type: string,
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
    }
  },
  {
    timestamps: true,
  }
);

const DoctorModel = mongoose.model("Doctors", DoctorSchema);

module.exports = DoctorModel;
