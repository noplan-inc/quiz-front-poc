import { sampleQuizzes } from "@/data/sampleQuizData";
import type { QuizProps } from "@/types/quiz";
import { useState } from "react";
import QuizComplete from "./QuizComplete";
import SingleQuizView from "./SingleQuizView";
import DebugManager from "./debug/DebugManager";

const QuizApp: React.FC = () => {
    const [quizzes] = useState<QuizProps[]>(sampleQuizzes);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

    const handleQuizComplete = () => {
        setIsCompleted(true);
    };

    const handleRestart = () => {
        setIsCompleted(false);
        setCurrentQuizIndex(0);
    };

    const handleSelectQuiz = (quizId: string) => {
        const selectedIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
        if (selectedIndex !== -1) {
            setCurrentQuizIndex(selectedIndex);
            setIsCompleted(false);
        }
    };

    const quizzesToShow = quizzes.slice(currentQuizIndex);

    return (
        <div className="min-h-screen bg-gray-50">
            <DebugManager onSelectQuiz={handleSelectQuiz} />

            {!isCompleted ? (
                <SingleQuizView
                    quizzes={quizzesToShow}
                    onComplete={handleQuizComplete}
                />
            ) : (
                <QuizComplete onRestart={handleRestart} />
            )}
        </div>
    );
};

export default QuizApp;
