import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getLessonById } from "../services/api";
import VocabularyCard from "../components/ui/VocabularyCard";
import Button from "../components/ui/Button";

const LessonContentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentLesson } = useApp();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      const data = await getLessonById(id);
      setLesson(data);
      setCurrentLesson(data);
    } catch (error) {
      console.error("Error loading lesson:", error);
      alert("Помилка завантаження уроку");
      navigate("/lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження уроку...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Урок не знайдено</p>
        <Button onClick={() => navigate("/lessons")} className="mt-4">
          Назад до уроків
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/lessons")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад до уроків</span>
        </button>

        <Button onClick={handleStartQuiz} size="md">
          Розпочати тест 📝
        </Button>
      </div>

      {/* Lesson Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {lesson.title}
        </h1>
        <p className="text-xl text-gray-600">{lesson.titleEn}</p>
      </div>

      {/* Vocabulary Section */}
      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">📚 Словник</h2>
            <span className="text-sm text-gray-500">
              ({lesson.vocabulary.length} слів)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((word, index) => (
              <VocabularyCard key={index} word={word} />
            ))}
          </div>
        </div>
      )}

      {/* Lesson Content */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          {lesson.content.split("\n").map((line, index) => {
            // Handle headers
            if (line.startsWith("# ")) {
              return (
                <h1
                  key={index}
                  className="text-3xl font-bold text-gray-900 mt-6 mb-4"
                >
                  {line.replace("# ", "")}
                </h1>
              );
            }
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold text-gray-800 mt-5 mb-3"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="text-xl font-bold text-gray-800 mt-4 mb-2"
                >
                  {line.replace("### ", "")}
                </h3>
              );
            }

            // Handle bold text **text**
            if (line.includes("**")) {
              const parts = line.split("**");
              return (
                <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                  {parts.map((part, i) =>
                    i % 2 === 0 ? (
                      part
                    ) : (
                      <strong key={i} className="font-bold text-gray-900">
                        {part}
                      </strong>
                    )
                  )}
                </p>
              );
            }

            // Handle bullet points
            if (line.trim().startsWith("- ")) {
              return (
                <li key={index} className="text-gray-700 mb-2 ml-6">
                  {line.replace("- ", "")}
                </li>
              );
            }

            // Regular paragraphs
            if (line.trim()) {
              return (
                <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                  {line}
                </p>
              );
            }

            // Empty lines
            return <br key={index} />;
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Готові перевірити свої знання? 🎯
        </h3>
        <p className="text-gray-600 mb-6">
          Пройдіть тест з {lesson.quiz.length} питань, щоб закріпити матеріал
        </p>
        <Button onClick={handleStartQuiz} size="lg">
          Розпочати тест
        </Button>
      </div>
    </div>
  );
};

export default LessonContentPage;
