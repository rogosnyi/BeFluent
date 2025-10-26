import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Award,
  Flame,
  BookOpen,
  Clock,
  Target,
  Star,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import AchievementCard from "../components/ui/AchievementCard";

const ProgressPage = () => {
  const navigate = useNavigate();
  const { progress } = useApp();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (progress) {
      calculateStats();
    }
  }, [progress]);

  const calculateStats = () => {
    const totalLessons = progress.completedLessons.length;
    const totalXP = progress.totalXP;
    const currentStreak = progress.streak;

    // Calculate level based on XP
    const level = Math.floor(totalXP / 100) + 1;
    const xpForNextLevel = level * 100;
    const xpProgress = totalXP % 100;

    // Calculate average score
    const avgScore =
      totalLessons > 0
        ? progress.completedLessons.reduce(
            (sum, lesson) => sum + (lesson.score / lesson.totalQuestions) * 100,
            0
          ) / totalLessons
        : 0;

    // Estimate study time (10 min per lesson + 5 min per quiz)
    const studyTime = totalLessons * 15;

    // Find highest streak (for now, same as current)
    // const highestStreak = Math.max(currentStreak, 7); // Mock data

    // Get highest streak from database
    const highestStreak = progress.highestStreak || 0;

    // Recent activity (last 5 lessons)
    const recentActivity = progress.completedLessons.slice(-5).reverse();

    setStats({
      totalLessons,
      totalXP,
      currentStreak,
      highestStreak,
      level,
      xpForNextLevel,
      xpProgress,
      avgScore,
      studyTime,
      recentActivity,
    });
  };

  // Achievements data
  const achievements = [
    {
      id: 1,
      title: "Перші кроки",
      description: "Завершіть перший урок",
      icon: "🎯",
      unlocked: progress?.completedLessons.length >= 1,
      progress: progress?.completedLessons.length || 0,
      requirement: 1,
    },
    {
      id: 2,
      title: "Вогонь!",
      description: "Досягніть 3-денної серії",
      icon: "🔥",
      unlocked: progress?.streak >= 3,
      progress: progress?.streak || 0,
      requirement: 3,
    },
    {
      id: 3,
      title: "Учень",
      description: "Завершіть 5 уроків",
      icon: "📚",
      unlocked: progress?.completedLessons.length >= 5,
      progress: progress?.completedLessons.length || 0,
      requirement: 5,
    },
    {
      id: 4,
      title: "Перфекціоніст",
      description: "Здайте тест на 100%",
      icon: "⭐",
      unlocked: progress?.completedLessons.some(
        (l) => l.score === l.totalQuestions
      ),
      progress:
        progress?.completedLessons.filter((l) => l.score === l.totalQuestions)
          .length || 0,
      requirement: 1,
    },
    {
      id: 5,
      title: "Марафонець",
      description: "Досягніть 7-денної серії",
      icon: "🏃",
      unlocked: progress?.streak >= 7,
      progress: progress?.streak || 0,
      requirement: 7,
    },
    {
      id: 6,
      title: "Майстер",
      description: "Завершіть 10 уроків",
      icon: "👑",
      unlocked: progress?.completedLessons.length >= 10,
      progress: progress?.completedLessons.length || 0,
      requirement: 10,
    },
  ];

  if (!progress || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження прогресу...</p>
        </div>
      </div>
    );
  }

  const getLevelTitle = (level) => {
    if (level < 3) return "Новачок";
    if (level < 5) return "Учень";
    if (level < 8) return "Студент";
    if (level < 12) return "Майстер";
    return "Експерт";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Мій прогрес</h1>
        <p className="text-gray-600">
          Відстежуйте свої досягнення та статистику навчання
        </p>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm opacity-90 mb-1">Ваш рівень</div>
            <div className="text-5xl font-bold mb-2">Рівень {stats.level}</div>
            <div className="text-xl opacity-90">
              {getLevelTitle(stats.level)}
            </div>
          </div>
          <div className="text-7xl">
            {stats.level < 3
              ? "🌱"
              : stats.level < 5
              ? "🌿"
              : stats.level < 8
              ? "🌳"
              : stats.level < 12
              ? "🏆"
              : "👑"}
          </div>
        </div>

        {/* XP Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Прогрес до рівня {stats.level + 1}</span>
            <span>
              {stats.xpProgress} / {stats.xpForNextLevel} XP
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{
                width: `${(stats.xpProgress / stats.xpForNextLevel) * 100}%`,
              }}
            />
          </div>
          <div className="text-sm mt-2 opacity-90">
            Ще {stats.xpForNextLevel - stats.xpProgress} XP до наступного рівня
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Lessons */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalLessons}
          </div>
          <div className="text-gray-600">Уроків завершено</div>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
            <Zap className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.currentStreak} 🔥
          </div>
          <div className="text-gray-600">Поточна серія</div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {Math.round(stats.avgScore)}%
          </div>
          <div className="text-gray-600">Середній результат</div>
        </div>

        {/* Study Time */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.studyTime}
          </div>
          <div className="text-gray-600">Хвилин навчання</div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="w-8 h-8 text-yellow-600" />
          <h2 className="text-3xl font-bold text-gray-900">Досягнення</h2>
          <span className="text-gray-600">
            ({achievements.filter((a) => a.unlocked).length}/
            {achievements.length})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} {...achievement} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
          <Clock className="w-7 h-7 text-blue-600" />
          <span>Остання активність</span>
        </h2>

        {stats.recentActivity.length > 0 ? (
          <div className="space-y-3">
            {stats.recentActivity.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    📖
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {lesson.lessonId}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(lesson.completedAt).toLocaleDateString(
                        "uk-UA",
                        {
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {lesson.score}/{lesson.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600">
                      {Math.round((lesson.score / lesson.totalQuestions) * 100)}
                      %
                    </div>
                  </div>
                  <div className="text-2xl">
                    {lesson.score === lesson.totalQuestions
                      ? "🏆"
                      : lesson.score / lesson.totalQuestions >= 0.8
                      ? "⭐"
                      : "✓"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Ще немає завершених уроків
          </div>
        )}
      </div>

      {/* Highest Streak Card */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🏆 Найкраща серія
            </h3>
            <p className="text-gray-600">
              Ваш рекорд послідовних днів навчання
            </p>
          </div>
          <div className="text-6xl font-bold text-orange-600">
            {stats.highestStreak}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
