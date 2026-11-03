// Predo backend: a tiny Express server that stores todos in a JSON file.
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, "todos.json");

// --- "Database" helpers: read/write the whole list from a JSON file ---
function readTodos() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveTodos(todos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
}

// Lets us read JSON request bodies as req.body
app.use(express.json());

// --- API routes ---

// List all todos
app.get("/api/todos", (req, res) => {
  res.json(readTodos());
});

// Add a todo: body is { text: "Buy milk" }
app.post("/api/todos", (req, res) => {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });

  const todos = readTodos();
  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  saveTodos(todos);
  res.status(201).json(todo);
});

// Toggle done / not done
app.patch("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "not found" });

  todo.done = !todo.done;
  saveTodos(todos);
  res.json(todo);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const todos = readTodos().filter((t) => t.id !== Number(req.params.id));
  saveTodos(todos);
  res.status(204).end();
});

// --- In production, also serve the built React app from this same server ---
const FRONTEND_DIST = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(FRONTEND_DIST));

app.listen(PORT, () => {
  console.log(`Predo backend running on http://localhost:${PORT}`);
});
