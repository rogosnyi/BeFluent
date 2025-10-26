import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { updateLevel } from "../services/api";
import LevelCard from "../components/ui/LevelCard";

const LevelSelectionPage = () => {
  const navigate = useNavigate();
  const { setSelectedLevel, refreshProgress } = useApp();

  const levels = [
    {
      level: "A1",
      title: "Початковий",
      description: "Базові фрази та вирази",
      color: "green",
      icon: "🟢",
    },
    {
      level: "A2",
      title: "Елементарний",
      description: "Прості повсякденні теми",
      color: "yellow",
      icon: "🟡",
    },
    {
      level: "B1",
      title: "Середній",
      description: "Робота, навчання, подорожі",
      color: "orange",
      icon: "🟠",
    },
    {
      level: "B2",
      title: "Вище середнього",
      description: "Складні абстрактні теми",
      color: "red",
      icon: "🔴",
    },
    {
      level: "C1",
      title: "Просунутий",
      description: "Вільне володіння мовою",
      color: "purple",
      icon: "🟣",
    },
  ];

  const handleLevelSelect = async (level) => {
    try {
      await updateLevel(level);
      setSelectedLevel(level);
      await refreshProgress();
      navigate("/lessons");
    } catch (error) {
      console.error("Error selecting level:", error);
      alert("Помилка при виборі рівня. Спробуйте ще раз.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/select-language")}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Оберіть свій рівень англійської
        </h1>
        <p className="text-lg text-gray-600">
          Виберіть рівень, який найкраще відповідає вашим знанням
        </p>
      </div>

      {/* Level Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((levelData) => (
          <LevelCard
            key={levelData.level}
            {...levelData}
            onClick={() => handleLevelSelect(levelData.level)}
          />
        ))}
      </div>

      {/* Info Text */}
      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-700 text-center">
          💡 <strong>Порада:</strong> Не впевнені у своєму рівні? Почніть з
          A1-A2 та поступово переходьте до складніших уроків.
        </p>
      </div>
    </div>
  );
};

export default LevelSelectionPage;
