const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Body parsing middleware
app.use(express.json());

// 1. Global Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[LOG] ${req.method} ${req.url} - ${timestamp}`);
  next();
});

// 2. Supplementary: Content-Type validation middleware for write operations
app.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Invalid Header',
        message: 'Content-Type must be application/json'
      });
    }
  }
  next();
});

// Temporary In-Memory Storage
let tasks = [
  {
    id: 1,
    title: 'Set up Vite + React project',
    description: 'Practical 1 component architecture and props flow',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Configure React Router v6',
    description: 'Practical 2 multi-route navigation with useState',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Implement GitHub REST API fetch',
    description: 'Practical 3 asynchronous state lifecycle with Spinner and Error handling',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 4;

// Middleware for ID format validation
const validateTaskId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format', message: 'Task ID must be an integer' });
  }
  req.taskId = id;
  next();
};

// --- CRUD Routes ---

// GET /tasks - Read all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /tasks/:id - Read single task
app.get('/tasks/:id', validateTaskId, (req, res) => {
  const task = tasks.find((t) => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({ error: 'Not Found', message: `Task with id ${req.taskId} not found` });
  }
  res.status(200).json({ success: true, data: task });
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Field "title" is required and cannot be empty'
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: Boolean(completed),
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', validateTaskId, (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Task with id ${req.taskId} not found` });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Validation Error', message: 'Title cannot be empty string' });
    }
    tasks[taskIndex].title = title.trim();
  }

  if (description !== undefined) {
    tasks[taskIndex].description = description.trim();
  }

  if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: tasks[taskIndex]
  });
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', validateTaskId, (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Task with id ${req.taskId} not found` });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: deletedTask
  });
});

// Test route to deliberately test the Global Error Handler
app.get('/simulate-error', (req, res, next) => {
  next(new Error('Simulated backend error for evaluating Global Error Middleware'));
});

// 404 Handler for undefined routes (Supplementary Problem)
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    path: req.originalUrl,
    method: req.method
  });
});

// 5. Global Error Handling Middleware (Must be defined last)
app.use((err, req, res, next) => {
  console.error('[Global Error Handler Caught]:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
