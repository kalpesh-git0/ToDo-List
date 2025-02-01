const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // To load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON data in requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define Todo Schema and Model
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
const Todo = mongoose.model("Todo", todoSchema);

// API Routes

// GET route to fetch all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos); // Return all todos in JSON format
  } catch (err) {
    res.status(500).send("Error fetching todos: " + err.message);
  }
});

// POST route to create a new todo
app.post("/todos", async (req, res) => {
  const { text } = req.body; // Get the text of the new todo from the request body
  if (!text) {
    return res.status(400).json({ message: "Text is required to create a todo" });
  }
  try {
    const newTodo = new Todo({
      text,
      completed: false, // By default, a new todo is not completed
    });
    await newTodo.save(); // Save the new todo to the database
    res.status(201).json(newTodo); // Send the created todo back to the client
  } catch (err) {
    res.status(500).send("Error creating todo: " + err.message);
  }
});

// DELETE route to remove a todo by ID
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params; // Get the todo ID from the URL params
  try {
    const todo = await Todo.findByIdAndDelete(id); // Find and delete the todo by ID
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).send("Error deleting todo: " + err.message);
  }
});

// PUT route to update the completion status of a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params; // Get the todo ID from the URL params
  const { completed } = req.body; // Get the completed status from the request body

  if (completed === undefined) {
    return res.status(400).json({ message: "Completed status is required" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true }); // Update the todo
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo); // Send the updated todo back to the client
  } catch (err) {
    res.status(500).send("Error updating todo: " + err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
