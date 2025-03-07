import { sampleQuizzes } from "@/data/sampleQuizData";
import type { QuizProps } from "@/types/quiz";
import { useState } from "react";
import QuizComplete from "./QuizComplete";
import SingleQuizView from "./SingleQuizView";

const QuizApp: React.FC = () => {
    const [quizzes] = useState<QuizProps[]>(sampleQuizzes);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleQuizComplete = () => {
        setIsCompleted(true);
    };

    const handleRestart = () => {
        setIsCompleted(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {!isCompleted ? (
                <SingleQuizView
                    quizzes={quizzes}
                    onComplete={handleQuizComplete}
                />
            ) : (
                <QuizComplete onRestart={handleRestart} />
            )}
        </div>
    );
};

export default QuizApp;
