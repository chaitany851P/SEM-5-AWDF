import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend Task API');
      showToast(err.message || 'Error fetching tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Task title is required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const result = await createTask({
        title: title.trim(),
        description: description.trim(),
        priority
      });
      // Synchronize state with backend
      setTasks((prev) => [result.data, ...prev]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      showToast('Task created and saved to MongoDB!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task) => {
    const originalTasks = [...tasks];
    const newStatus = !task.completed;

    // Optimistic / reactive update
    setTasks(tasks.map((t) => (t._id === task._id ? { ...t, completed: newStatus } : t)));

    try {
      await updateTask(task._id, { completed: newStatus });
      showToast(`Task marked as ${newStatus ? 'completed' : 'pending'}`);
    } catch (err) {
      setTasks(originalTasks);
      showToast(err.message, 'error');
    }
  };

  const handleDeleteTask = async (id, taskTitle) => {
    // Supplementary: Confirmation dialog
    const confirmed = window.confirm(`Are you sure you want to delete task "${taskTitle}"?`);
    if (!confirmed) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      showToast('Task deleted successfully');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="section-card">
      <h2>Full-Stack Task Manager (MongoDB + Express API)</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Live end-to-end integration between Vite React UI and Express backend with MongoDB database persistence.
      </p>

      {/* Task Creation Form */}
      <form onSubmit={handleCreateTask} style={{ background: 'var(--bg-color)', padding: '1.25rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Create New Task</h3>

        <div className="form-group">
          <label htmlFor="taskTitle">Task Title *</label>
          <input
            id="taskTitle"
            type="text"
            className="form-input"
            placeholder="e.g. Implement Dockerfile for deployment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="taskDesc">Description</label>
          <input
            id="taskDesc"
            type="text"
            className="form-input"
            placeholder="Detailed description of task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-input"
              style={{ padding: '0.6rem' }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <button
            type="submit"
            className="toggle-banner-btn"
            style={{ marginTop: '1.5rem', minWidth: '150px' }}
            disabled={submitting}
          >
            {submitting ? 'Saving...' : '➕ Add Task'}
          </button>
        </div>
      </form>

      {/* Task List / Async state feedback */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Tasks from MongoDB ({tasks.length})</h3>
        <button type="button" onClick={loadTasks} className="theme-toggle-btn">
          🔄 Refresh
        </button>
      </div>

      {loading && <Spinner message="Fetching tasks from Express backend (port 5000)..." />}

      {!loading && error && (
        <ErrorMessage
          message={`${error}. Ensure the Express backend is running on http://localhost:5000 and MongoDB is connected.`}
          onRetry={loadTasks}
        />
      )}

      {!loading && !error && tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No tasks found in MongoDB. Create your first task above!
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: '1px solid var(--border-color)',
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: task.completed ? 'rgba(16, 185, 129, 0.05)' : 'var(--card-bg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <h4
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                      fontSize: '1.05rem'
                    }}
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {task.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px',
                        backgroundColor:
                          task.priority === 'high' ? '#fee2e2' : task.priority === 'low' ? '#f3f4f6' : '#fef3c7',
                        color:
                          task.priority === 'high' ? '#991b1b' : task.priority === 'low' ? '#374151' : '#92400e',
                        fontWeight: 600
                      }}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteTask(task._id, task.title)}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default TaskManager;
