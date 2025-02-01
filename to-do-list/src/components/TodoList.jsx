import React, { useEffect, useState ,useId} from 'react';
import { getTodos, deleteTodo, updateTodo } from '../API/api'; // Import the API functions



const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const id = useId();

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos(); // Fetch todos
      setTodos(todosData); // Update state with todos data
    };
    fetchTodos();
  }, []);

  // Handle delete todo
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id); // Call the delete API
    setTodos(todos.filter((todo) => todo._id !== id)); // Update state after deletion
  };

  // Handle toggle completion (mark as completed or incomplete)
  const handleToggleCompletion = async (id, completed) => {
    const updatedTodo = await updateTodo(id, !completed); // Toggle completion status
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo))); // Update the state
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              id={todo._id}
              name='completed'
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompletion(todo._id, todo.completed)} // Toggle completion
            />
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
