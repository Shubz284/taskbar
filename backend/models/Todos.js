const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, //for faster queries per user
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Todo', todosSchema)