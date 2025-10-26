import { useNavigate } from "react-router-dom";
import {
  Check,
  Sparkles,
  Crown,
  Zap,
  MessageSquare,
  BookOpen,
  Users,
  Video,
  Award,
  ArrowLeft,
} from "lucide-react";
import Button from "../components/ui/Button";

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "назавжди",
      description: "Для початківців та тих, хто хоче спробувати",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      color: "blue",
      features: [
        { text: "Доступ до уроків рівня A1", included: true },
        { text: "5 AI повідомлень на день", included: true },
        { text: "Базові вправи та тести", included: true },
        { text: "Відстеження прогресу", included: true },
        { text: "Доступ до уроків A2-C1", included: false },
        { text: "Безлімітні AI діалоги", included: false },
        { text: "Персональний репетитор", included: false },
        { text: "Сертифікат про закінчення", included: false },
      ],
      buttonText: "Поточний план",
      buttonVariant: "secondary",
      popular: false,
    },
    {
      name: "Plus",
      price: "4.99",
      period: "на місяць",
      description: "Для серйозних учнів",
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      color: "green",
      features: [
        { text: "Всі уроки (A1-C1)", included: true },
        { text: "Безлімітні AI діалоги", included: true },
        { text: "Просунуті вправи", included: true },
        { text: "Детальна аналітика прогресу", included: true },
        { text: "Офлайн доступ до уроків", included: true },
        { text: "Щотижневі звіти", included: true },
        { text: "Персональний репетитор", included: false },
        { text: "Сертифікат про закінчення", included: true },
      ],
      buttonText: "Оновити до Plus",
      buttonVariant: "success",
      popular: true,
    },
    {
      name: "Pro",
      price: "14.99",
      period: "на місяць",
      description: "Максимальний результат з підтримкою репетитора",
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      color: "purple",
      features: [
        { text: "Всі переваги Plus", included: true },
        { text: "Персональний репетитор онлайн", included: true },
        { text: "2 відеодзвінки на тиждень (30 хв)", included: true },
        { text: "Індивідуальний план навчання", included: true },
        { text: "Пріоритетна підтримка 24/7", included: true },
        { text: "Підготовка до IELTS/TOEFL", included: true },
        { text: "Групові розмовні клуби", included: true },
        { text: "Офіційний сертифікат", included: true },
      ],
      buttonText: "Оновити до Pro",
      buttonVariant: "primary",
      popular: false,
    },
  ];

  const colorClasses = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-blue-700",
      badge: "bg-blue-600",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-50",
      gradient: "from-green-500 to-green-700",
      badge: "bg-green-600",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-50",
      gradient: "from-purple-500 to-purple-700",
      badge: "bg-purple-600",
    },
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Оберіть свій план навчання
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Інвестуйте у своє майбутнє. Вивчайте англійську з найкращими
          інструментами та підтримкою.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
              relative bg-white rounded-2xl shadow-lg transition-all hover:shadow-2xl
              ${
                plan.popular
                  ? `border-4 ${
                      colorClasses[plan.color].border
                    } transform scale-105`
                  : "border-2 border-gray-200"
              }
            `}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div
                  className={`${
                    colorClasses[plan.color].badge
                  } text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Найпопулярніший</span>
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Icon & Name */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${
                    colorClasses[plan.color].gradient
                  } ${colorClasses[plan.color].bg}`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 mt-0.5 ${
                        feature.included ? "text-green-600" : "text-gray-300"
                      }`}
                    >
                      <Check className="w-5 h-5" />
                    </div>
                    <span
                      className={
                        feature.included
                          ? "text-gray-700"
                          : "text-gray-400 line-through"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                variant={plan.buttonVariant}
                size="lg"
                className="w-full"
                disabled={plan.name === "Free"}
              >
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ / Additional Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Чому BeFluent?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                AI Асистент 24/7
              </h3>
              <p className="text-sm text-gray-600">
                Практикуйте розмовну англійську з AI в будь-який час доби
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Професійні репетитори
              </h3>
              <p className="text-sm text-gray-600">
                Досвідчені викладачі з сертифікатами TESOL/CELTA
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Офіційні сертифікати
              </h3>
              <p className="text-sm text-gray-600">
                Отримайте визнаний сертифікат після завершення курсу
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          💰 <strong>Гарантія повернення коштів</strong> протягом 14 днів. Без
          питань.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
