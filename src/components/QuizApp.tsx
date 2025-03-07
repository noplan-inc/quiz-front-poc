import { sampleQuizzes } from "@/data/sampleQuizData";
import type { QuizProps } from "@/types/quiz";
import { useState, useEffect } from "react";
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
        console.log("Selecting quiz in QuizApp:", quizId);
        const selectedIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
        if (selectedIndex !== -1) {
            console.log(
                `Quiz found at index ${selectedIndex}, changing current index`
            );
            setCurrentQuizIndex(selectedIndex);
            setIsCompleted(false);
        } else {
            console.log(`Quiz with id ${quizId} not found`);
        }
    };

    // currentQuizIndexが変更されたら、ログを出力して確認
    useEffect(() => {
        console.log("Current quiz index changed:", currentQuizIndex);
        console.log("Current quiz:", quizzes[currentQuizIndex]);
    }, [currentQuizIndex, quizzes]);

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
