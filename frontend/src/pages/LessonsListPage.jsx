import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getLessonsByLevel } from "../services/api";
import LessonCard from "../components/ui/LessonCard";

const LessonsListPage = () => {
  const navigate = useNavigate();
  const { selectedLevel, progress } = useApp();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessons();
  }, [selectedLevel]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const data = await getLessonsByLevel(selectedLevel);
      setLessons(data);
    } catch (error) {
      console.error("Error loading lessons:", error);
      alert("Помилка завантаження уроків");
    } finally {
      setLoading(false);
    }
  };

  const getLessonStatus = (lesson, index) => {
    if (!progress) return "locked";

    const isCompleted = progress.completedLessons.some(
      (cl) => cl.lessonId === lesson.id
    );

    if (isCompleted) return "completed";

    // First lesson is always available
    if (index === 0) return "available";

    // Check if previous lesson is completed
    const prevLesson = lessons[index - 1];
    const isPrevCompleted = progress.completedLessons.some(
      (cl) => cl.lessonId === prevLesson?.id
    );

    return isPrevCompleted ? "available" : "locked";
  };

  const getLessonScore = (lessonId) => {
    if (!progress) return null;
    const completed = progress.completedLessons.find(
      (cl) => cl.lessonId === lessonId
    );
    return completed
      ? { score: completed.score, total: completed.totalQuestions }
      : null;
  };

  const handleLessonClick = (lesson) => {
    navigate(`/lesson/${lesson.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження уроків...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/select-level")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад до рівнів</span>
        </button>

        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
          Рівень: {selectedLevel}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Уроки для рівня {selectedLevel}
      </h1>
      <p className="text-gray-600 mb-8">
        {lessons.length} {lessons.length === 1 ? "урок" : "уроків"} доступно
      </p>

      {/* Progress Stats */}
      {progress && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {
                progress.completedLessons.filter((cl) =>
                  lessons.some((l) => l.id === cl.lessonId)
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Завершено</div>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {progress.totalXP}
            </div>
            <div className="text-sm text-gray-600">XP зароблено</div>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {progress.streak}
            </div>
            <div className="text-sm text-gray-600">Днів підряд</div>
          </div>
        </div>
      )}

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-lg">
              Уроки для цього рівня ще не додані
            </p>
          </div>
        ) : (
          <>
            {lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                status={getLessonStatus(lesson, index)}
                score={getLessonScore(lesson.id)}
                onClick={() => handleLessonClick(lesson)}
              />
            ))}

            {/* More Lessons Coming Soon */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-dashed border-purple-300 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Більше уроків незабаром!
              </h3>
              <p className="text-gray-600 mb-4">
                Ми активно працюємо над додаванням нових уроків для рівня{" "}
                {selectedLevel}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>📚</span>
                <span>Нові уроки додаються щотижня</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonsListPage;
