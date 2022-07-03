const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: false,
      required: true,
    },
    description: {
      type: String,
      trime: false,
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Todo", todoSchema)
