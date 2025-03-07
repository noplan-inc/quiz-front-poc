import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface QuizFooterProps {
    elapsedTime: number;
    answered: boolean;
    onNext: () => void;
}

/**
 * クイズのフッターコンポーネント
 *
 * タイマーと「次へ」ボタンを含む、画面下部に固定されるフッター
 */
const QuizFooter: React.FC<QuizFooterProps> = ({
    elapsedTime,
    answered,
    onNext,
}) => {
    // コンポーネントがマウントされた時にログを出力
    useEffect(() => {
        console.log("QuizFooterコンポーネントがマウントされました");

        // アンマウント時のログ
        return () => {
            console.log("QuizFooterコンポーネントがアンマウントされました");
        };
    }, []);

    // 経過時間の表示形式
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white z-10">
            <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
                {/* タイマー */}
                <div className="bg-gray-200 rounded-full py-2 px-6 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-label="タイマー"
                    >
                        <title>タイマーアイコン</title>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="font-mono font-bold">
                        {formatTime(elapsedTime)}
                    </span>
                </div>

                {/* 次へボタン - アニメーション付き */}
                <div className="min-w-[120px] flex justify-end">
                    <AnimatePresence>
                        {answered && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                onClick={onNext}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-md transition-colors"
                                type="button"
                            >
                                つぎへ
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default QuizFooter;
