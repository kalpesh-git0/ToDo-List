import axios from 'axios';

const API_URL = "http://localhost:5000"; // Make sure to update this URL for production if needed

// Function to get all todos
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Function to add a new todo
export const addTodo = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, { text });
    getTodos(); // Refresh the todos list
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Function to delete a todo
export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Function to update the completion status of a todo
export const updateTodo = async (id, completed) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
