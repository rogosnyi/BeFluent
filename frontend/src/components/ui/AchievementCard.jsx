import { Lock } from "lucide-react";

const AchievementCard = ({
  title,
  description,
  icon,
  unlocked,
  progress,
  requirement,
}) => {
  return (
    <div
      className={`
      relative rounded-xl p-4 border-2 transition-all
      ${
        unlocked
          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-lg"
          : "bg-gray-50 border-gray-300 opacity-60"
      }
    `}
    >
      {/* Lock Icon for Locked Achievements */}
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}

      {/* Icon */}
      <div className={`text-5xl mb-2 ${unlocked ? "" : "grayscale"}`}>
        {icon}
      </div>

      {/* Title */}
      <h4
        className={`font-bold text-lg mb-1 ${
          unlocked ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {title}
      </h4>

      {/* Description */}
      <p
        className={`text-sm mb-2 ${
          unlocked ? "text-gray-700" : "text-gray-500"
        }`}
      >
        {description}
      </p>

      {/* Progress Bar (for locked achievements) */}
      {!unlocked && progress !== undefined && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Прогрес</span>
            <span>
              {progress}/{requirement}
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${Math.min((progress / requirement) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Unlocked Badge */}
      {unlocked && (
        <div className="mt-2 inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
          ✓ Отримано
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
