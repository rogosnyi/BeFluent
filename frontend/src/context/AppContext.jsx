import { createContext, useContext, useState, useEffect } from "react";
import { getProgress } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [progress, setProgress] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load progress when username changes
  useEffect(() => {
    if (username) {
      loadProgress();
    } else {
      setProgress(null);
      setLoading(false);
    }
  }, [username]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const data = await getProgress();
      setProgress(data);
      setSelectedLevel(data.currentLevel || "A1");
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setProgress(null);
    setSelectedLevel("A1");
    setCurrentLesson(null);
    setQuizResults(null);
  };

  const value = {
    username,
    login,
    logout,
    selectedLevel,
    setSelectedLevel,
    progress,
    setProgress,
    currentLesson,
    setCurrentLesson,
    quizResults,
    setQuizResults,
    loading,
    refreshProgress: loadProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
