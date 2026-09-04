import React, { useState, useEffect, useMemo } from "react";
import '../styles/App.css';

const TodoList = React.memo(function TodoList({ todos }) {
  console.log("TodoList rendered");
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
});

const App = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `Todos: ${todos.length}`;
  }, [todos]);

  const todoCount = useMemo(() => {
    return todos.length;
  }, [todos]);

  const handleAddTodo = () => {
    setTodos([...todos, "New todo"]);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSubmit = () => {
    if (input.trim().length > 5) {
      setTodos([...todos, input]);
      setInput("");
      setError("");
    } else {
      setError("Task must be more than 5 characters");
    }
  };

  return (
    <div className="app">
      <div className="todo-section">
        <button onClick={handleAddTodo}>Add Todo</button>
        <TodoList todos={todos} />
        <p>Total todos: {todoCount}</p>
      </div>

      <div className="counter-section">
        <button onClick={handleIncrement}>Increment</button>
        <span> {count}</span>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task (more than 5 chars)"
        />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default App;
