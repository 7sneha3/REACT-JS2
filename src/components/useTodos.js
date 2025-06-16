import { useState, useEffect } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodo = {
      id: Date.now(),
      task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getFilteredTodos = () => {
    let result = [...todos];
    if (filter === "active") result = result.filter((todo) => !todo.completed);
    if (filter === "completed") result = result.filter((todo) => todo.completed);

    if (sortBy === "name") {
      result.sort((a, b) => a.task.localeCompare(b.task));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  };

  return {
    todos: getFilteredTodos(),
    addTodo,
    deleteTodo,
    toggleComplete,
    setFilter,
    filter,
    setSortBy,
    sortBy
  };
};
