import React, { useState } from 'react';

const TodoInput = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Add a new task"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoInput;