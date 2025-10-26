import { Link } from "react-router-dom";
import {
  MessageSquare,
  TrendingUp,
  Sparkles,
  Globe,
  BookOpen,
  Zap,
  Check,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Вивчайте 6 мов",
      description:
        "Англійська, німецька, іспанська, французька, польська та китайська",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Асистент 24/7",
      description: "Практикуйте розмовну мову з AI після кожного уроку",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Відстежуйте прогрес",
      description: "Бачте свої досягнення та рівень володіння мовою",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Структуровані уроки",
      description: "Від початкового до просунутого рівня (A1-C1)",
    },
  ];

  const benefits = [
    "Інтерактивні вправи та тести",
    "Практика з AI в реальному часі",
    "Персоналізований план навчання",
    "Доступ з будь-якого пристрою",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          {/* Main Content */}
          <div className="text-center mb-16">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <span className="text-5xl">🌍</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BeFluent
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-3xl text-gray-700 font-semibold mb-4">
              Вивчайте мови з AI
            </p>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Інтерактивна платформа для вивчення іноземних мов з персональним
              AI асистентом, структурованими уроками та відстеженням прогресу
            </p>

            {/* CTA Button */}
            <Link
              to="/select-language"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-2xl hover:shadow-blue-500/50"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Почати навчання безкоштовно
            </Link>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Безкоштовно назавжди</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Без реклами</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>AI підтримка</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-white rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/2 mt-2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/6"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 h-10 bg-blue-100 rounded-lg"></div>
                      <div className="flex-1 h-10 bg-blue-500 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-xl">
                  ⭐
                </div>
              </div>

              {/* Right Side - Content */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Чому обирають BeFluent?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Ми поєднуємо традиційні методи навчання з найновішими AI
                  технологіями, щоб зробити вивчення мов ефективним та цікавим.
                </p>

                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/select-language"
                  className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  Розпочати зараз →
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                6
              </div>
              <div className="text-gray-600 text-lg">Мов для вивчення</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-gray-600 text-lg">Уроків та вправ</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-lg">AI підтримка</div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Готові почати вашу мовну подорож?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Приєднуйтесь до тисяч учнів, які вже вивчають мови з BeFluent
              </p>
              <Link
                to="/select-language"
                className="inline-block px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
              >
                Почати безкоштовно
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 BeFluent. Всі права захищені.</p>
            <p className="text-sm">Вивчайте мови легко та ефективно з AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
