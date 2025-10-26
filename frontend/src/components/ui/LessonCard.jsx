import { Lock, CheckCircle, Circle } from "lucide-react";

const LessonCard = ({ lesson, status, score, onClick }) => {
  const statusIcons = {
    completed: <CheckCircle className="w-6 h-6 text-green-600" />,
    available: <Circle className="w-6 h-6 text-blue-600" />,
    locked: <Lock className="w-6 h-6 text-gray-400" />,
  };

  const statusColors = {
    completed: "border-green-500 bg-green-50",
    available: "border-blue-500 bg-blue-50 hover:shadow-lg cursor-pointer",
    locked: "border-gray-300 bg-gray-50 opacity-60",
  };

  return (
    <div
      onClick={
        status === "available" || status === "completed" ? onClick : undefined
      }
      className={`
        border-2 rounded-xl p-5 transition-all
        ${statusColors[status]}
        ${
          status === "available" || status === "completed"
            ? "transform hover:scale-102"
            : ""
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title in Ukrainian */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {lesson.title}
          </h3>

          {/* Title in English */}
          <p className="text-sm text-gray-600 mb-3">{lesson.titleEn}</p>

          {/* Score for completed lessons */}
          {status === "completed" && score && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-700 font-semibold">
                Завершено: {score.score}/{score.total}
              </span>
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor((score.score / score.total) * 3)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status text */}
          {status === "locked" && (
            <p className="text-sm text-gray-500">Заблоковано</p>
          )}

          {status === "available" && (
            <button className="mt-2 text-blue-600 font-semibold text-sm hover:text-blue-700">
              Почати урок →
            </button>
          )}
        </div>

        {/* Status Icon */}
        <div className="ml-4">{statusIcons[status]}</div>
      </div>
    </div>
  );
};

export default LessonCard;
