import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LanguageSelectionPage from "./pages/LanguageSelectionPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import LevelSelectionPage from "./pages/LevelSelectionPage";
import LessonsListPage from "./pages/LessonsListPage";
import LessonContentPage from "./pages/LessonContentPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import AIChatPage from "./pages/AIChatPage";
import PricingPage from "./pages/PricingPage";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public pages without header */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected pages without header */}
          <Route
            path="/select-language"
            element={
              <ProtectedRoute>
                <LanguageSelectionPage />
              </ProtectedRoute>
            }
          />

          {/* Protected pages with header */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/coming-soon" element={<ComingSoonPage />} />
                    <Route
                      path="/select-level"
                      element={<LevelSelectionPage />}
                    />
                    <Route path="/lessons" element={<LessonsListPage />} />
                    <Route path="/lesson/:id" element={<LessonContentPage />} />
                    <Route path="/quiz/:id" element={<QuizPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/chat" element={<AIChatPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/progress" element={<ProgressPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
