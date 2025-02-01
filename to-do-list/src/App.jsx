import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import  TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("Pending");

  // Add new todo
  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit a todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Filter function
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true;
  });

  return (
    <div>
      <Header />
      <TodoInput addTodo={addTodo} />

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} editTodo={editTodo} />
    </div>
  );
}

export default App;
