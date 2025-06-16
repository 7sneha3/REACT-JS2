import React, { useState } from "react";
import { useTodos } from "./useTodos";
import "./TodoApp.css"; 

const TodoApp = () => {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    setFilter,
    filter,
    setSortBy,
    sortBy,
  } = useTodos();

  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!taskInput.trim()) {
      setError("Task cannot be empty");
      return;
    }
    addTodo(taskInput.trim());
    setTaskInput("");
    setError("");
  };

  return (
    <div className="todo-container">
      <h1>Your Daily Planner</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="controls">
        <div>
          <label>Filter: </label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Sort: </label>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="date">By Date</option>
            <option value="name">By Name</option>
          </select>
        </div>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty">No tasks!</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? "done" : ""}`}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span className="checkmark"></span>
              </label>
              <span className="task-text">{todo.task}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
