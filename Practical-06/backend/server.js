require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';

// Middleware
app.use(express.json());
app.use(cors());


// 1. Request Logging Middleware (Carried forward from Practical 4)
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB successfully at ${MONGO_URI}`))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Helper to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: `"${req.params.id}" is not a valid MongoDB ObjectId`
    });
  }
  next();
};

// --- CRUD Routes using Mongoose ---

// GET /tasks - Read all tasks from MongoDB
app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id - Read single task with 404 check (Supplementary Problem)
app.get('/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Task with id ${req.params.id} does not exist`
      });
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
});

// POST /tasks - Create task with schema validation
app.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    const task = await Task.create({
      title,
      description,
      completed,
      priority
    });
    res.status(201).json({
      success: true,
      message: 'Task created successfully in MongoDB',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id - Update task with schema validation
app.put('/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Task with id ${req.params.id} does not exist`
      });
    }
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - Delete task from MongoDB
app.delete('/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Task with id ${req.params.id} does not exist`
      });
    }
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    path: req.originalUrl
  });
});

// Global Centralized Error Handling Middleware (Handles Mongoose Validation errors cleanly)
app.use((err, req, res, next) => {
  console.error('[Error caught in pipeline]:', err.message);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      error: 'Validation Error',
      messages
    });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Malformed Identifier',
      message: `Invalid format for field ${err.path}`
    });
  }

  res.status(500).json({
    error: 'Server Error',
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
