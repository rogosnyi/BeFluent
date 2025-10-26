import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Trophy, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";
import { completeLesson } from "../services/api";
import Button from "../components/ui/Button";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { quizResults, currentLesson, refreshProgress } = useApp();
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    if (!quizResults || !currentLesson) {
      navigate("/lessons");
      return;
    }
    saveResults();
  }, []);

  const saveResults = async () => {
    try {
      await completeLesson(
        quizResults.lessonId,
        quizResults.score,
        quizResults.total
      );
      await refreshProgress();
    } catch (error) {
      console.error("Error saving results:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!quizResults || !currentLesson) {
    return null;
  }

  const percentage = Math.round((quizResults.score / quizResults.total) * 100);
  const xpEarned = quizResults.score * 10;
  const passed = percentage >= 60;

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  const getMessage = () => {
    if (percentage === 100) return "Ідеально! Ви справжній майстер!";
    if (percentage >= 80) return "Чудова робота!";
    if (percentage >= 60) return "Добре! Продовжуйте в тому ж дусі!";
    return "Непогано! Але можна краще!";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8 text-center shadow-lg">
        <div className="text-7xl mb-4">{getEmoji()}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {getMessage()}
        </h1>

        {/* Score */}
        <div className="my-8">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {quizResults.score}/{quizResults.total}
          </div>
          <div className="text-2xl text-gray-600">{percentage}% правильно</div>
        </div>

        {/* XP Earned */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-full border-2 border-yellow-300">
          <Zap className="w-6 h-6 text-yellow-600" />
          <span className="text-xl font-bold text-gray-900">
            +{xpEarned} XP заробленo!
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Прогрес уроку
        </h3>
        <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              passed
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-yellow-500 to-orange-600"
            }`}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📋 Детальні результати
        </h2>

        <div className="space-y-3">
          {currentLesson.quiz.map((question, index) => {
            const userAnswer = quizResults.answers[index];
            let isCorrect = false;

            if (question.type === "fill-blank") {
              isCorrect =
                userAnswer?.toLowerCase().trim() ===
                question.correctAnswer.toLowerCase().trim();
            } else {
              isCorrect = userAnswer === question.correct;
            }

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      Питання {index + 1}:{" "}
                      {isCorrect ? "Правильно" : "Неправильно"}
                    </div>
                    <div className="text-gray-700 mb-2">
                      {question.question}
                    </div>
                    {!isCorrect && (
                      <div className="space-y-1 text-sm">
                        <div className="text-red-700">
                          <strong>Ваша відповідь:</strong>{" "}
                          {question.type === "fill-blank"
                            ? userAnswer
                            : question.options[userAnswer]}
                        </div>
                        <div className="text-green-700">
                          <strong>Правильна відповідь:</strong>{" "}
                          {question.type === "fill-blank"
                            ? question.correctAnswer
                            : question.options[question.correct]}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Що далі?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() =>
              navigate("/chat", {
                state: {
                  lessonContext: currentLesson.titleEn,
                  mistakes: quizResults.mistakes,
                },
              })
            }
            variant="primary"
            size="lg"
            className="flex-1 sm:flex-none"
          >
            💬 Практикувати з AI
          </Button>
          <Button
            onClick={() => navigate("/lessons")}
            variant="secondary"
            size="lg"
            className="flex-1 sm:flex-none"
          >
            📚 До уроків
          </Button>
        </div>
      </div>

      {/* Motivational Message */}
      {!passed && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-sm text-gray-700">
            💡 <strong>Порада:</strong> Повторіть урок ще раз, щоб краще
            засвоїти матеріал. Практика - ключ до успіху!
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
