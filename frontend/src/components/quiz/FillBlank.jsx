import { useState } from "react";

const FillBlank = ({ question, userAnswer, onAnswer }) => {
  const [inputValue, setInputValue] = useState(userAnswer || "");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onAnswer(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{question}</h2>

      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ваша відповідь:
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Введіть відповідь..."
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          autoFocus
        />
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          💡 <strong>Підказка:</strong> Введіть одне слово англійською мовою
        </p>
      </div>
    </div>
  );
};

export default FillBlank;
