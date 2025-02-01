const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, // Ensures that text must be provided for a Todo
    },
    completed: {
        type: Boolean,
        default: false, // By default, a Todo is not completed
    },
});

// Create and export the Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
