import React, { useState } from 'react';
import { addTodo } from '../API/api'; // Import the addTodo function

const TodoInput = ({ setTodos }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try{
        const addedTodo = await addTodo(newTodo); // Call the API to add the todo
        setTodos((prevTodos) => [...prevTodos, addedTodo]); // Update the Todo list in the parent
        console.log('New todo added:', addedTodo);
        setNewTodo(''); // Clear the input field after submission
      }catch(error){
        console.error('Error adding todo:', error);}
    }
  };

  return (
    <div>
      <input
        id='new-todo'
        name='new-todo'
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoInput;
