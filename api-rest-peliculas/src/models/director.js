const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Director", DirectorSchema);