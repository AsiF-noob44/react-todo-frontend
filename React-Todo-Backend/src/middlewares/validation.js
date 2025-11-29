import mongoose from "mongoose";

// Middleware to validate MongoDB ObjectId
export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid todo ID format",
    });
  }
  next();
};

// Middleware to validate todo input
export const validateTodoInput = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Both title and description are required",
    });
  }

  if (title.trim().length === 0 || description.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Title and description cannot be empty",
    });
  }

  next();
};
