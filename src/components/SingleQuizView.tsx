import type { QuizProps } from "@/types/quiz";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QuizItem } from "./quiz";
import QuizFooter from "./QuizFooter";

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
    const [elapsedTime, setElapsedTime] = useState(0);

    // 現在表示中のクイズ
    const currentQuiz = quizzes[currentQuizIndex];

    // タイマーの設定
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 経過時間の表示形式
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

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
    const handleAnswer = (_choiceId: string | string[]) => {
        setAnswered(true);
    };

    // 次へボタンのハンドラー
    const handleNext = () => {
        if (answered) {
            goToNextQuiz();
        }
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
        <div className="min-h-screen flex items-center justify-center bg-white pb-16">
            {/* ストライプの背景パターン */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-red-50 bg-stripes bg-stripes-pink opacity-30" />

            <div className="w-full max-w-2xl mx-auto p-4 relative">
                {/* クイズ全体のコンテナ（ヘッダー + 本体） */}
                <div className="w-full quiz-container">
                    {/* クイズ表示エリア（ヘッダー + 本体をアニメーションで一緒に動かす） */}
                    <div className="relative">
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
                                className="w-full"
                            >
                                {/* 問題番号表示（アニメーション内に移動） */}
                                <div className="bg-red-600 text-white font-bold py-3 px-4 text-center rounded-t-lg border-4 border-red-600 border-b-0">
                                    第{currentQuizIndex + 1}問
                                </div>

                                {/* クイズ本体 */}
                                <QuizItem
                                    {...currentQuiz}
                                    onAnswer={handleAnswer}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* フッターコンポーネント */}
            <QuizFooter
                elapsedTime={elapsedTime}
                answered={answered}
                onNext={handleNext}
            />
        </div>
    );
};

export default SingleQuizView;
