const LanguageCard = ({
  language,
  nativeName,
  flag,
  learners,
  color,
  onClick,
  comingSoon = false,
}) => {
  const colorClasses = {
    blue: "from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700",
    red: "from-red-400 to-red-600 hover:from-red-500 hover:to-red-700",
    orange:
      "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
    green:
      "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700",
    purple:
      "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700",
    yellow:
      "from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700",
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-gradient-to-br ${colorClasses[color]}
        rounded-3xl p-8
        shadow-lg hover:shadow-2xl
        transition-all transform hover:scale-105
        text-white text-left w-full
        ${comingSoon ? "opacity-90" : ""}
      `}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          Незабаром
        </div>
      )}

      {/* Flag Emoji */}
      <div className="text-6xl mb-4">{flag}</div>

      {/* Language Name */}
      <div className="text-3xl font-bold mb-2">{language}</div>

      {/* Native Name */}
      <div className="text-xl opacity-90 mb-4">{nativeName}</div>

      {/* Stats */}
      <div className="flex items-center space-x-2 text-sm opacity-80">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        <span>{learners} учнів</span>
      </div>

      {/* Decorative Circle */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full"></div>
    </button>
  );
};

export default LanguageCard;
