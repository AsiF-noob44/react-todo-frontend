import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./src/routes/todos.js";

dotenv.config();
const app = express();

// Update CORS to allow your Netlify domain
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-app-name.netlify.app", // Add after deploying frontend
    ],
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running!" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/todos", todoRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
