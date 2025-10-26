import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>

      <div className="text-center py-20">
        <div className="text-6xl mb-4">⚙️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Налаштування акаунту
        </h1>
        <p className="text-gray-600 mb-8">
          Ця сторінка в розробці. Тут ви зможете налаштувати свій профіль та
          параметри навчання.
        </p>
        <button
          onClick={() => navigate("/lessons")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Повернутися до уроків
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
