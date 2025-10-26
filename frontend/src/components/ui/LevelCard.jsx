// const LevelCard = ({ level, title, description, color, icon, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         relative overflow-hidden
//         bg-white rounded-2xl p-6
//         border-2 border-gray-200
//         hover:border-${color}-500 hover:shadow-xl
//         transition-all transform hover:scale-105
//         text-left w-full
//       `}
//     >
//       {/* Icon/Emoji */}
//       <div className="text-5xl mb-3">{icon}</div>

//       {/* Level */}
//       <div className={`text-3xl font-bold text-${color}-600 mb-2`}>{level}</div>

//       {/* Title */}
//       <div className="text-lg font-semibold text-gray-800 mb-1">{title}</div>

//       {/* Description */}
//       <div className="text-sm text-gray-600">{description}</div>

//       {/* Decorative gradient */}
//       <div
//         className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${color}-400 to-${color}-600 opacity-10 rounded-bl-full`}
//       ></div>
//     </button>
//   );
// };

// export default LevelCard;

const LevelCard = ({ level, title, description, color, icon, onClick }) => {
  const colorClasses = {
    green: "hover:border-green-500 text-green-600",
    yellow: "hover:border-yellow-500 text-yellow-600",
    orange: "hover:border-orange-500 text-orange-600",
    red: "hover:border-red-500 text-red-600",
    purple: "hover:border-purple-500 text-purple-600",
  };

  const bgGradients = {
    green: "from-green-400 to-green-600",
    yellow: "from-yellow-400 to-yellow-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    purple: "from-purple-400 to-purple-600",
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white rounded-2xl p-6 
        border-2 border-gray-200
        ${colorClasses[color]}
        hover:shadow-xl
        transition-all transform hover:scale-105
        text-left w-full
      `}
    >
      {/* Icon/Emoji */}
      <div className="text-5xl mb-3">{icon}</div>

      {/* Level */}
      <div className="text-3xl font-bold mb-2">{level}</div>

      {/* Title */}
      <div className="text-lg font-semibold text-gray-800 mb-1">{title}</div>

      {/* Description */}
      <div className="text-sm text-gray-600">{description}</div>

      {/* Decorative gradient */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${bgGradients[color]} opacity-10 rounded-bl-full`}
      ></div>
    </button>
  );
};

export default LevelCard;
