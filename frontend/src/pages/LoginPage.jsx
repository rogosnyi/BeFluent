import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Loader } from "lucide-react";
import { loginUser, createUser } from "../services/api";
import { useApp } from "../context/AppContext";
import Button from "../components/ui/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username.trim()) {
      setError("Будь ласка, введіть ім'я користувача");
      return;
    }

    if (username.length < 3) {
      setError("Ім'я користувача має містити принаймні 3 символи");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(username);
      console.log("Login response:", response);

      // Update context and localStorage
      login(username.toLowerCase());

      // Navigate to language selection
      navigate("/select-language");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message ||
          "Користувача не знайдено. Спробуйте створити новий акаунт."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!username.trim()) {
      setError("Будь ласка, введіть ім'я користувача");
      return;
    }

    if (username.length < 3) {
      setError("Ім'я користувача має містити принаймні 3 символи");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await createUser(username);
      console.log("Create user response:", response);

      // Update context and localStorage
      login(username.toLowerCase());

      // Navigate to language selection
      navigate("/select-language");
    } catch (err) {
      console.error("Create user error:", err);
      setError(
        err.message ||
          "Не вдалося створити користувача. Можливо, це ім'я вже зайняте."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <span className="text-5xl">🌍</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BeFluent
            </span>
          </h1>
          <p className="text-gray-600">Вивчайте мови з AI</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Вітаємо!
          </h2>

          {/* Username Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ім'я користувача
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введіть ваше ім'я..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
              disabled={loading}
              autoFocus
            />
            <p className="mt-2 text-xs text-gray-500">
              Мінімум 3 символи, без пробілів
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              disabled={loading || !username.trim()}
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Завантаження...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Увійти</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleCreateUser}
              disabled={loading || !username.trim()}
              variant="secondary"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Завантаження...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Створити користувача</span>
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-gray-700 text-center">
              💡 <strong>Підказка:</strong> Якщо у вас вже є акаунт - натисніть
              "Увійти". Якщо ви тут вперше - натисніть "Створити користувача"
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Продовжуючи, ви погоджуєтесь з нашими умовами використання
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
