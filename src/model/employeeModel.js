const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },

    LastName: {
      type: String,
      required: true,
      trim: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    Photo: {
      type: String,
      required: true,
      trim: true,
    },

    MobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    City: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employee", employeeSchema);
