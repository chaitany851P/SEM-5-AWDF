const BASE_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ================= AUTH API =================

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || (data.messages && data.messages.join(', ')) || 'Registration failed');
  }
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || (data.messages && data.messages.join(', ')) || 'Login failed');
  }
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ================= PROTECTED TASK API =================

export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (response.status === 401) {
    logoutUser();
    throw new Error('Session expired or unauthorized. Please log in.');
  }
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch tasks');
  }
  return data;
};

export const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData)
  });
  const data = await response.json();
  if (response.status === 401) {
    logoutUser();
    throw new Error('Session expired. Please log in.');
  }
  if (!response.ok) {
    throw new Error(data.message || (data.messages && data.messages.join(', ')) || 'Failed to create task');
  }
  return data;
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await response.json();
  if (response.status === 401) {
    logoutUser();
    throw new Error('Session expired. Please log in.');
  }
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update task');
  }
  return data;
};

export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (response.status === 401) {
    logoutUser();
    throw new Error('Session expired. Please log in.');
  }
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }
  return data;
};

// ================= AI API METHODS =================

export const generateAiDescription = async (title) => {
  const response = await fetch(`${BASE_URL}/api/ai/generate-description`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to generate AI description');
  }
  return data;
};

export const suggestAiPriority = async (title) => {
  const response = await fetch(`${BASE_URL}/api/ai/suggest-priority`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to suggest priority');
  }
  return data;
};

