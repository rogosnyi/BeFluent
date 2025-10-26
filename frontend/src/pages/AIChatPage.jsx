import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Bot, User, Loader } from "lucide-react";
import { sendChatMessage } from "../services/api";
import Button from "../components/ui/Button";

const AIChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  const MAX_MESSAGES = 10;
  const lessonContext = location.state?.lessonContext || "English basics";
  const mistakes = location.state?.mistakes || [];

  // Build better initial greeting with full context
  const buildGreeting = () => {
    if (mistakes.length === 0) {
      return `Вітаю! Чудова робота з уроком "${lessonContext}". Давай трохи попрактикуємось! Спробуй представитись англійською мовою.`;
    }

    // Show first mistake as example
    const firstMistake = mistakes[0];
    return `Вітаю! Я помітив, що ти мав трохи труднощів. Наприклад, у питанні "${firstMistake.question}" правильна відповідь "${firstMistake.correctAnswer}". Давай разом розберемо ці моменти! Спробуй використати це слово/фразу в реченні.`;
  };

  useEffect(() => {
    // Initial AI greeting with full context
    setMessages([
      {
        role: "ai",
        content: buildGreeting(),
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (messageCount >= MAX_MESSAGES) {
      alert(
        "Ви досягли ліміту повідомлень для цієї сесії. Поверніться до уроків!"
      );
      return;
    }

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setMessageCount((prev) => prev + 1);

    try {
      // Send full mistake objects, not just correct answers
      const response = await sendChatMessage(
        input,
        lessonContext,
        mistakes // Send complete mistake objects with question, userAnswer, and correctAnswer
      );

      const aiMessage = {
        role: "ai",
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "ai",
        content: "Вибачте, сталася помилка. Спробуйте ще раз.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/lessons")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Завершити</span>
        </button>

        <div className="text-sm text-gray-600">
          {messageCount}/{MAX_MESSAGES} повідомлень
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          💬 Практикуйте з AI асистентом
        </h1>
        <p className="text-gray-600">
          Практикуйте англійську в реальному діалозі
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === "ai"
                      ? "bg-gradient-to-br from-blue-500 to-blue-700"
                      : "bg-gradient-to-br from-green-500 to-green-700"
                  }`}
                >
                  {message.role === "ai" ? (
                    <Bot className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "ai"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "ai" ? "text-gray-500" : "text-blue-100"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("uk-UA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin text-gray-600" />
                    <span className="text-sm text-gray-600">AI друкує...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
          <div className="flex items-end space-x-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишіть повідомлення англійською..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
              rows="2"
              disabled={loading || messageCount >= MAX_MESSAGES}
            />
            <button
              onClick={handleSend}
              disabled={
                !input.trim() || loading || messageCount >= MAX_MESSAGES
              }
              className={`p-3 rounded-xl transition-all ${
                input.trim() && !loading && messageCount < MAX_MESSAGES
                  ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          {messageCount >= MAX_MESSAGES && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700 text-center">
                ⚠️ Ви досягли ліміту повідомлень. Поверніться до уроків!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-4 text-center text-sm text-gray-500">
        💡 AI допоможе вам з виправленнями та порадами
      </div>
    </div>
  );
};

export default AIChatPage;
