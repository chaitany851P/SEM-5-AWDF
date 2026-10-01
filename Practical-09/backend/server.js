require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./models/Task');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');
const {
  validateRegisterInput,
  validateLoginInput,
  validateTaskInput
} = require('./middleware/validation');
const cache = require('./utils/cache');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb_caching';
const JWT_SECRET = process.env.JWT_SECRET || 'caching_secret_key_2026';

// Middleware
app.use(express.json());
app.use(cors());

// Global Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[LOG] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB successfully at ${MONGO_URI}`))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Helper for ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: `"${req.params.id}" is not a valid MongoDB ObjectId`
    });
  }
  next();
};

// ================= AUTHENTICATION ROUTES =================

app.post('/api/auth/register', validateRegisterInput, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Conflict', message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/login', validateLoginInput, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
});

// ================= CACHE STATS & MONITORING =================

// GET /api/cache-stats - Inspect live cache hit/miss metrics (Supplementary Problem)
app.get('/api/cache-stats', (req, res) => {
  res.status(200).json({
    success: true,
    stats: cache.getStats()
  });
});

// POST /api/cache/flush - Debug trigger to clear cache manually
app.post('/api/cache/flush', (req, res) => {
  cache.flush();
  res.status(200).json({ success: true, message: 'All in-memory cache keys cleared' });
});

// ================= CACHED TASK CRUD ROUTES =================

// GET /tasks - Read tasks with in-memory caching
app.get('/tasks', authMiddleware, async (req, res, next) => {
  const startTime = Date.now();
  const cacheKey = 'all_tasks';
  const bypassCache = req.query.noCache === 'true';

  try {
    if (!bypassCache) {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        const responseTimeMs = Date.now() - startTime;
        res.setHeader('X-Cache', 'HIT');
        return res.status(200).json({
          success: true,
          source: 'cache-hit',
          responseTimeMs,
          count: cachedData.length,
          data: cachedData
        });
      }
    }

    // Cache Miss -> Query Database
    res.setHeader('X-Cache', 'MISS');
    const tasks = await Task.find().sort({ createdAt: -1 });

    // Store in node-cache (default TTL 60 seconds)
    cache.set(cacheKey, tasks);

    const responseTimeMs = Date.now() - startTime;
    res.status(200).json({
      success: true,
      source: bypassCache ? 'cache-bypassed' : 'database-miss',
      responseTimeMs,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id - Read single task with individual cache key (Supplementary Problem)
app.get('/tasks/:id', authMiddleware, validateObjectId, async (req, res, next) => {
  const cacheKey = `task_${req.params.id}`;
  try {
    const cachedTask = cache.get(cacheKey);
    if (cachedTask) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({ success: true, source: 'cache-hit', data: cachedTask });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Not Found', message: 'Task not found' });
    }

    cache.set(cacheKey, task);
    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({ success: true, source: 'database-miss', data: task });
  } catch (err) {
    next(err);
  }
});

// POST /tasks - Create task + INVALIDATE CACHE
app.post('/tasks', authMiddleware, validateTaskInput, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    const task = await Task.create({ title, description, completed, priority });

    // Cache Invalidation
    cache.del('all_tasks');
    console.log('[Cache Invalidation] Cleared key "all_tasks" after task creation');

    res.status(201).json({
      success: true,
      message: 'Task created successfully; cache invalidated',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id - Update task + INVALIDATE CACHE
app.put('/tasks/:id', authMiddleware, validateObjectId, async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Not Found', message: 'Task not found' });
    }

    // Cache Invalidation
    cache.del('all_tasks');
    cache.del(`task_${req.params.id}`);
    console.log(`[Cache Invalidation] Cleared "all_tasks" and "task_${req.params.id}" after update`);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully; cache invalidated',
      data: updatedTask
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - Delete task + INVALIDATE CACHE
app.delete('/tasks/:id', authMiddleware, validateObjectId, async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Not Found', message: 'Task not found' });
    }

    // Cache Invalidation
    cache.del('all_tasks');
    cache.del(`task_${req.params.id}`);
    console.log(`[Cache Invalidation] Cleared "all_tasks" and "task_${req.params.id}" after delete`);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully; cache invalidated',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route Not Found', path: req.originalUrl });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error Caught]:', err.message);
  res.status(500).json({ error: 'Server Error', message: err.message || 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Practical 9 Caching Backend running on port ${PORT}`);
});

module.exports = app;
