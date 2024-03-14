const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    director:{
      type: String,
      required: true,
    }, 
    genre:{
      type: String,
      required: true,
    }, 
    releaseYear:{
      type: String,
      required: true,
    },
    isCompletedTask: { // Update field name to match the frontend code
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
