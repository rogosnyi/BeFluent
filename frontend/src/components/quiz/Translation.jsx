const Translation = ({ question, options, selectedAnswer, onSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{question}</h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`
              w-full p-4 rounded-xl border-2 text-left transition-all
              ${
                selectedAnswer === index
                  ? "border-green-600 bg-green-50 shadow-md"
                  : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  selectedAnswer === index
                    ? "border-green-600 bg-green-600"
                    : "border-gray-400"
                }
              `}
              >
                {selectedAnswer === index && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-lg text-gray-800">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Translation;
