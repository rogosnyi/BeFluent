const API_URL = "http://localhost:5000/api";

// Helper to get username from localStorage
const getUsername = () => {
  return localStorage.getItem("username");
};

// Users
export const checkUsername = async (username) => {
  const response = await fetch(`${API_URL}/users/check/${username}`);
  if (!response.ok) throw new Error("Failed to check username");
  return response.json();
};

export const createUser = async (username) => {
  const response = await fetch(`${API_URL}/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create user");
  }
  return response.json();
};

export const loginUser = async (username) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to login");
  }
  return response.json();
};

// Lessons
export const getLessonsByLevel = async (level) => {
  const response = await fetch(`${API_URL}/lessons/level/${level}`);
  if (!response.ok) throw new Error("Failed to fetch lessons");
  return response.json();
};

export const getLessonById = async (id) => {
  const response = await fetch(`${API_URL}/lessons/${id}`);
  if (!response.ok) throw new Error("Failed to fetch lesson");
  return response.json();
};

// Progress
export const getProgress = async () => {
  const username = getUsername();
  if (!username) throw new Error("No user logged in");

  const response = await fetch(`${API_URL}/progress?userId=${username}`);
  if (!response.ok) throw new Error("Failed to fetch progress");
  return response.json();
};

export const updateLevel = async (level) => {
  const username = getUsername();
  if (!username) throw new Error("No user logged in");

  const response = await fetch(`${API_URL}/progress/level`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: username, level }),
  });
  if (!response.ok) throw new Error("Failed to update level");
  return response.json();
};

export const completeLesson = async (lessonId, score, totalQuestions) => {
  const username = getUsername();
  if (!username) throw new Error("No user logged in");

  const response = await fetch(`${API_URL}/progress/complete-lesson`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: username, lessonId, score, totalQuestions }),
  });
  if (!response.ok) throw new Error("Failed to complete lesson");
  return response.json();
};

// AI Chat
export const sendChatMessage = async (message, lessonContext, mistakes) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, lessonContext, mistakes }),
  });
  if (!response.ok) throw new Error("Failed to send message");
  return response.json();
};
