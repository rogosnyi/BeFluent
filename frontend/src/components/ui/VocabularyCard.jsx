const VocabularyCard = ({ word }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">{word.en}</div>
          <div className="text-base text-gray-700">{word.ua}</div>
        </div>
        <div className="ml-2 text-2xl">💬</div>
      </div>
      {word.example && (
        <div className="mt-2 pt-2 border-t border-blue-200">
          <p className="text-sm text-gray-600 italic">"{word.example}"</p>
        </div>
      )}
    </div>
  );
};

export default VocabularyCard;
