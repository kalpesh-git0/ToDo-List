import React from 'react';

const TodoCard = ({ todo, onToggleComplete, onDelete }) => {
    return (
        <div className="todo-card">
            <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
            </h3>
            <p>{todo.description}</p>
            <button onClick={() => onToggleComplete(todo.id)}>
                {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
};

export default TodoCard;