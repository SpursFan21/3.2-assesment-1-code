const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: "Build backend Docker image", completed: false },
  { id: 2, task: "Push backend image to Amazon ECR", completed: false },
  { id: 3, task: "Run backend API as an ECS service", completed: false }
];

app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running successfully",
    service: "todo-backend",
    endpoints: ["/health", "/todos", "/api/todos"]
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "todo-backend"
  });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = app;