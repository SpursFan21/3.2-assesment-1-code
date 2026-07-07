const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL ?? "";

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>To-Do List</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 40px 20px; color: #1f2937; }
          .container { max-width: 700px; margin: 0 auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
          h1 { margin-top: 0; color: #1d4ed8; }
          .status { display: inline-block; background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-bottom: 20px; }
          li { margin: 12px 0; }
          .footer { margin-top: 28px; padding-top: 18px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <main class="container">
          <h1>AWS To-Do List</h1>
          <p class="status">Frontend service is running successfully</p>

          <h2>Tasks from Backend API</h2>
          <ul id="todo-list">
            <li>Loading tasks from backend...</li>
          </ul>

          <p class="footer">
            Backend API URL: ${BACKEND_URL}<br>
            This frontend is deployed as a separate containerised microservice behind an Application Load Balancer.
          </p>
        </main>

        <script>
          fetch("${BACKEND_URL}/api/todos")
            .then(response => response.json())
            .then(todos => {
              const list = document.getElementById("todo-list");
              list.innerHTML = "";
              todos.forEach(todo => {
                const item = document.createElement("li");
                item.textContent = todo.task;
                list.appendChild(item);
              });
            })
            .catch(error => {
              const list = document.getElementById("todo-list");
              list.innerHTML = "<li>Could not connect to backend API.</li>";
              console.error(error);
            });
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Frontend service listening on port ${PORT}`);
});