import React, { useState } from "react";
import "./App.css";

// component Todo
function Todo({ todo, index, removeTodo, completeTodo }) {
  return (
    <div className="todo">
      <div style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.text}
      </div>
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>{" "}
        <button onClick={() => removeTodo(index)}> X </button>
      </div>
    </div>
  );
}

// component TodoForm
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      alert("Please input your todo");
      return;
    }

    // 'value' is passed to addTodo, and will be read as 'userInputValue' for better understanding
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add todo"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

// our main App component
function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Lunch Meeting",
      isCompleted: false
    },
    {
      text: "Study react.js",
      isCompleted: false
    },
    {
      text: "Soccer game at 8pm",
      isCompleted: false
    }
  ]);

  // 'userInputValue' is the 'value' from the input field
  const addTodo = userInputValue => {
    const newTodos = [...todos, { text: userInputValue }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
