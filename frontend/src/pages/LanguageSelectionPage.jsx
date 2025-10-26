import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LanguageCard from "../components/ui/LanguageCard";

const LanguageSelectionPage = () => {
  const navigate = useNavigate();

  const languages = [
    {
      language: "English",
      nativeName: "English",
      flag: "🇬🇧",
      learners: "2.5K",
      color: "blue",
      available: true,
    },
    {
      language: "Deutsch",
      nativeName: "Німецька",
      flag: "🇩🇪",
      learners: "1.2K",
      color: "red",
      available: false,
    },
    {
      language: "Español",
      nativeName: "Іспанська",
      flag: "🇪🇸",
      learners: "1.8K",
      color: "orange",
      available: false,
    },
    {
      language: "Français",
      nativeName: "Французька",
      flag: "🇫🇷",
      learners: "950",
      color: "purple",
      available: false,
    },
    {
      language: "Polski",
      nativeName: "Польська",
      flag: "🇵🇱",
      learners: "780",
      color: "red",
      available: false,
    },
    {
      language: "中文",
      nativeName: "Китайська",
      flag: "🇨🇳",
      learners: "1.5K",
      color: "yellow",
      available: false,
    },
  ];

  const handleLanguageSelect = (lang) => {
    if (lang.available) {
      navigate("/select-level");
    } else {
      navigate("/coming-soon", { state: { language: lang.language } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🌍</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Яку мову ви хочете вивчати?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Оберіть мову та розпочніть свою подорож до вільного володіння
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.language}
              {...lang}
              onClick={() => handleLanguageSelect(lang)}
              comingSoon={!lang.available}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Мов доступно</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Уроків</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">AI Підтримка</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ✨ Нові мови додаються щомісяця
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;
