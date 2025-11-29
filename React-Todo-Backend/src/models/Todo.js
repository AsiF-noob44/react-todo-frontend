import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [100, "Title too long (max 100 characters)"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [1, "Description cannot be empty"],
      maxlength: [500, "Description too long (max 500 characters)"],
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
