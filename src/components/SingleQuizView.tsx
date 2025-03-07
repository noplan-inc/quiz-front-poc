import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizProps } from "@/types/quiz";
import { QuizItem } from "./quiz";

interface SingleQuizViewProps {
    quizzes: QuizProps[];
    onComplete?: () => void;
}

const SingleQuizView: React.FC<SingleQuizViewProps> = ({
    quizzes,
    onComplete,
}) => {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1: 前へ, 0: 初期, 1: 次へ
    const [answered, setAnswered] = useState(false);

    // 現在表示中のクイズ
    const currentQuiz = quizzes[currentQuizIndex];

    // 次の問題へ
    const goToNextQuiz = () => {
        if (currentQuizIndex < quizzes.length - 1) {
            setDirection(1);
            setTimeout(() => {
                setCurrentQuizIndex(currentQuizIndex + 1);
                setAnswered(false);
            }, 500);
        } else {
            // 全問終了時
            if (onComplete) {
                onComplete();
            }
        }
    };

    // 回答処理
    const handleAnswer = (choiceId: string) => {
        setAnswered(true);

        // 回答から1秒後に次の問題へ
        setTimeout(() => {
            goToNextQuiz();
        }, 1000);
    };

    // アニメーションのバリアント
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-2xl mx-auto">
                {/* 進捗インジケーター */}
                <div className="mb-6 px-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                            問題 {currentQuizIndex + 1}/{quizzes.length}
                        </span>
                        <div className="w-full mx-4 bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{
                                    width: `${
                                        ((currentQuizIndex + 1) /
                                            quizzes.length) *
                                        100
                                    }%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* クイズ表示エリア */}
                <div className="relative h-[70vh] flex items-center justify-center">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentQuizIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                },
                                opacity: { duration: 0.2 },
                            }}
                            className="absolute w-full px-4"
                        >
                            <QuizItem
                                {...currentQuiz}
                                onAnswer={handleAnswer}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SingleQuizView;
