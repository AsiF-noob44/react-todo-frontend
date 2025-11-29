import express from "express";
const router = express.Router();
import Todo from "../models/todo.js";
import {
  validateObjectId,
  validateTodoInput,
} from "../middlewares/validation.js";

// Get All Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
      error: err.message,
    });
  }
});

// Create a New Todo
router.post("/", validateTodoInput, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = new Todo({
      title: title.trim(),
      description: description.trim(),
    });

    const savedTodo = await newTodo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: savedTodo,
    });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create todo",
      error: err.message,
    });
  }
});

// Update an Existing Todo
router.put("/:id", validateObjectId, validateTodoInput, async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: err.message,
    });
  }
});

// Delete a Todo
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: err.message,
    });
  }
});

// Get Single Todo by ID
router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todo",
      error: err.message,
    });
  }
});

export default router;
