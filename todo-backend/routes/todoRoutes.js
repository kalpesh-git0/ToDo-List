const express = require('express');
const Todo = require('../models/Todo'); // Import Todo model

const router = express.Router();

// POST route to create a new Todo
router.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed || false, // Default to false if not provided
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo); // Send the created Todo back to the client
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send an error message if there's an issue
    }
});

// Example GET route to fetch all Todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos); // Return all Todos from the database
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle errors
    }
});

module.exports = router;
