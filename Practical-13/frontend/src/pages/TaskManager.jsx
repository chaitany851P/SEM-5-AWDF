import React, { useState, useEffect } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStoredUser,
  logoutUser,
  generateAiDescription,
  suggestAiPriority
} from '../services/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import Auth from './Auth';

function TaskManager() {
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);

  // AI Generation state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState(null);


  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadTasks = async () => {
    if (!localStorage.getItem('token')) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend Task API');
      showToast(err.message || 'Error fetching tasks', 'error');
      if (err.message.includes('expired') || err.message.includes('unauthorized')) {
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadTasks();
    }
  }, [currentUser]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setTasks([]);
    showToast('Logged out successfully');
  };

  const handleAiGenerateDescription = async () => {
    if (!title.trim()) {
      showToast('Please type a task title first so AI can generate context', 'error');
      return;
    }
    setAiLoading(true);
    setAiNotice(null);
    try {
      const res = await generateAiDescription(title.trim());
      setDescription(res.description);
      setAiNotice({
        provider: res.provider,
        fallback: res.fallback,
        disclaimer: res.disclaimer
      });
      showToast(`AI Description generated via ${res.provider}!`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiSuggestPriority = async () => {
    if (!title.trim()) {
      showToast('Please type a task title first to analyze priority', 'error');
      return;
    }
    try {
      const res = await suggestAiPriority(title.trim());
      if (res.suggestedPriority) {
        setPriority(res.suggestedPriority);
        showToast(`AI suggested priority: ${res.suggestedPriority.toUpperCase()}`);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

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
      setTasks((prev) => [result.data, ...prev]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      showToast('Task created under your authenticated session!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task) => {
    const originalTasks = [...tasks];
    const newStatus = !task.completed;

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

  if (!currentUser) {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2>Protected Tasks Resource</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            This resource is protected by JWT Authentication middleware. Please log in or create an account to view and manage tasks.
          </p>
        </div>
        <Auth
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            showToast(`Welcome back, ${user.name}!`);
          }}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="section-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h2>JWT-Protected Task Manager</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Logged in as <strong>{currentUser.name}</strong> ({currentUser.email})
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            padding: '0.45rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          🚪 Sign Out
        </button>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleCreateTask} style={{ background: 'var(--bg-color)', padding: '1.25rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Create New Task (Authenticated)</h3>

        <div className="form-group">
          <label htmlFor="taskTitle">Task Title *</label>
          <input
            id="taskTitle"
            type="text"
            className="form-input"
            placeholder="e.g. Test JWT token expiry and middleware validation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <label htmlFor="taskDesc" style={{ margin: 0 }}>Description</label>
            <button
              type="button"
              onClick={handleAiGenerateDescription}
              disabled={aiLoading || submitting}
              style={{
                background: 'transparent',
                color: 'var(--primary-color)',
                border: '1px solid var(--primary-color)',
                borderRadius: '4px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {aiLoading ? '⏳ Generating AI Description...' : '✨ AI Generate Description'}
            </button>
          </div>
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

        {aiNotice && (
          <div style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid var(--primary-color)', borderRadius: '6px', padding: '0.6rem 0.9rem', marginBottom: '1rem', fontSize: '0.82rem' }}>
            <span><strong>{aiNotice.provider}:</strong> {aiNotice.disclaimer}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <label style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Priority</label>
              <button
                type="button"
                onClick={handleAiSuggestPriority}
                disabled={submitting}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-color)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ✨ AI Suggest
              </button>
            </div>
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
        <h3>Tasks ({tasks.length})</h3>
        <button type="button" onClick={loadTasks} className="theme-toggle-btn">
          🔄 Refresh
        </button>
      </div>

      {loading && <Spinner message="Validating JWT token and loading tasks..." />}

      {!loading && error && (
        <ErrorMessage
          message={`${error}. Verify Express backend is running with JWT secret.`}
          onRetry={loadTasks}
        />
      )}

      {!loading && !error && tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No tasks found. Create your first task above!
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
