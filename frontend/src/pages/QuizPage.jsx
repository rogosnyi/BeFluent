import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import MultipleChoice from "../components/quiz/MultipleChoice";
import Translation from "../components/quiz/Translation";
import FillBlank from "../components/quiz/FillBlank";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLesson, setQuizResults } = useApp();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!currentLesson || currentLesson.id !== id) {
      navigate(`/lesson/${id}`);
    }
  }, [currentLesson, id, navigate]);

  if (!currentLesson) {
    return null;
  }

  const questions = currentLesson.quiz;
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null && question.type !== "fill-blank") {
      alert("Будь ласка, оберіть відповідь");
      return;
    }

    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate results
      calculateResults(newAnswers);
    } else {
      // Next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
    }
  };

  const calculateResults = (finalAnswers) => {
    let score = 0;
    const mistakes = [];

    questions.forEach((q, index) => {
      const userAnswer = finalAnswers[index];
      let isCorrect = false;

      if (q.type === "fill-blank") {
        isCorrect =
          userAnswer?.toLowerCase().trim() ===
          q.correctAnswer.toLowerCase().trim();
      } else {
        isCorrect = userAnswer === q.correct;
      }

      if (isCorrect) {
        score++;
      } else {
        mistakes.push({
          question: q.question,
          userAnswer:
            q.type === "fill-blank" ? userAnswer : q.options[userAnswer],
          correctAnswer:
            q.type === "fill-blank" ? q.correctAnswer : q.options[q.correct],
        });
      }
    });

    setQuizResults({
      lessonId: id,
      score,
      total: questions.length,
      mistakes,
      answers: finalAnswers,
    });

    navigate("/results");
  };

  const handleBack = () => {
    if (window.confirm("Ви впевнені? Ваш прогрес буде втрачено.")) {
      navigate(`/lesson/${id}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Вийти</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar current={currentQuestion + 1} total={questions.length} />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6 shadow-sm">
        {question.type === "multiple-choice" && (
          <MultipleChoice
            question={question.question}
            options={question.options}
            selectedAnswer={selectedAnswer}
            onSelect={handleAnswer}
          />
        )}

        {question.type === "translation" && (
          <Translation
            question={question.question}
            options={question.options}
            selectedAnswer={selectedAnswer}
            onSelect={handleAnswer}
          />
        )}

        {question.type === "fill-blank" && (
          <FillBlank
            question={question.question}
            userAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg" className="min-w-[200px]">
          {isLastQuestion ? "Завершити тест ✓" : "Далі →"}
        </Button>
      </div>

      {/* Question counter */}
      <div className="text-center mt-6 text-sm text-gray-500">
        Питання {currentQuestion + 1} з {questions.length}
      </div>
    </div>
  );
};

export default QuizPage;
