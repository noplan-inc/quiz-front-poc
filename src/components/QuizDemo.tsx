import { sampleQuizzes } from "@/data/sampleQuizData";
import { useState } from "react";
import { QuizItem } from "./quiz";

const QuizDemo = () => {
  const [, setSelectedAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (quizId: string, choiceId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizId]: choiceId,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">問題形式デモ</h1>

      <div className="space-y-8">
        {sampleQuizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <QuizItem {...quiz} onAnswer={(choiceId) => handleAnswer(quiz.id, choiceId)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDemo;
