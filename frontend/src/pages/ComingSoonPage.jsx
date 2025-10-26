import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Bell, Mail } from "lucide-react";
import Button from "../components/ui/Button";

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || "Ця мова";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/select-language")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад до вибору мови</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-5xl">🚀</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language} незабаром!
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            Ми активно працюємо над додаванням цієї мови. Підпишіться на
            оновлення, щоб дізнатися першими про запуск!
          </p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Прогрес розробки</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Email Notification */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Bell className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Отримати сповіщення про запуск
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              />
              <Button variant="primary" size="md" className="whitespace-nowrap">
                <Mail className="w-4 h-4 inline mr-2" />
                Підписатись
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Ми не передаємо вашу електронну пошту третім особам
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Уроків готово</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">Q2 2025</div>
              <div className="text-sm text-gray-600">Очікуваний запуск</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">2.3K</div>
              <div className="text-sm text-gray-600">У списку очікування</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => navigate("/select-language")}
            >
              Обрати іншу мову
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => navigate("/pricing")}
            >
              Переглянути тарифи
            </Button>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-600 mt-6">
          💡 Поки що ви можете розпочати навчання з{" "}
          <strong>англійської мови</strong>
        </p>
      </div>
    </div>
  );
};

export default ComingSoonPage;
