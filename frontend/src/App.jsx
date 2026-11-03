// The whole UI: one component that talks to the backend with fetch().
import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]); // list from the server
  const [text, setText] = useState(""); // what's typed in the input

  // 1. On first load, GET the todos from the backend
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  // 2. Add: POST the new text, then append the saved todo to state
  async function addTodo(e) {
    e.preventDefault(); // stop the form from reloading the page
    if (!text.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const todo = await res.json();
    setTodos((prev) => [...prev, todo]);
    setText("");
  }

  // 3. Toggle: PATCH, then swap in the updated todo
  async function toggleTodo(id) {
    const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  // 4. Delete: DELETE, then drop it from state
  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main>
      <h1>Predo</h1>

      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button>Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.done ? "done" : ""}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
