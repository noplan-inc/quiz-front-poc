import { sampleQuizzes } from "@/data/sampleQuizData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// クイズタイプの一覧
const quizTypes = [
    { type: "text", label: "テキストのみの問題" },
    { type: "image", label: "画像付きの問題" },
    { type: "video", label: "動画付きの問題" },
    { type: "audio", label: "音声付きの問題" },
    { type: "imageChoice", label: "選択肢が画像の問題" },
    { type: "multiAnswer", label: "複数回答可能な問題" },
    { type: "orderSelection", label: "順序選択問題" },
    { type: "characterOrder", label: "文字の順序選択問題" },
    { type: "numberInput", label: "数字入力問題" },
    { type: "combination", label: "組み合わせ選択問題" },
];

interface DebugModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectQuiz: (quizId: string) => void;
}

/**
 * デバッグモーダルコンポーネント
 * - クイズタイプを選択して直接特定のクイズに移動できる
 * - 各クイズタイプの問題一覧を表示
 */
const DebugModal: React.FC<DebugModalProps> = ({
    isOpen,
    onClose,
    onSelectQuiz,
}) => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [filteredQuizzes, setFilteredQuizzes] = useState(sampleQuizzes);

    // モーダル外のクリックを検知するための参照
    useEffect(() => {
        // ESCキーでモーダルを閉じる
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscKey);
        }

        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onClose]);

    // タイプが選択されたときのフィルタリング
    useEffect(() => {
        if (selectedType) {
            setFilteredQuizzes(
                sampleQuizzes.filter((quiz) => quiz.type === selectedType)
            );
        } else {
            setFilteredQuizzes(sampleQuizzes);
        }
    }, [selectedType]);

    // クイズが選択されたとき
    const handleQuizSelect = (quizId: string) => {
        console.log("Quiz selected:", quizId);
        onSelectQuiz(quizId);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold">デバッグモード</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="閉じる"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 border-b">
                    <h3 className="font-medium mb-2">クイズタイプを選択</h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setSelectedType(null)}
                            className={`px-3 py-1 rounded text-sm ${
                                selectedType === null
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            すべて
                        </button>
                        {quizTypes.map((type) => (
                            <button
                                type="button"
                                key={type.type}
                                onClick={() => setSelectedType(type.type)}
                                className={`px-3 py-1 rounded text-sm ${
                                    selectedType === type.type
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                    <h3 className="font-medium mb-3">
                        {selectedType
                            ? `${
                                  quizTypes.find((t) => t.type === selectedType)
                                      ?.label
                              }の一覧`
                            : "すべてのクイズ"}
                        （{filteredQuizzes.length}問）
                    </h3>
                    <div className="space-y-3">
                        {filteredQuizzes.map((quiz) => (
                            <button
                                key={quiz.id}
                                className="p-3 border rounded hover:bg-gray-50 cursor-pointer w-full text-left flex flex-col"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log(
                                        `Button clicked for quiz: ${quiz.id}`
                                    );
                                    handleQuizSelect(quiz.id);
                                }}
                                type="button"
                                data-testid={`quiz-item-${quiz.id}`}
                            >
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        ID: {quiz.id}
                                    </span>
                                    <span className="text-sm bg-gray-200 px-2 py-0.5 rounded">
                                        {quiz.type}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm line-clamp-2">
                                    {quiz.question}
                                </p>
                            </button>
                        ))}
                        {filteredQuizzes.length === 0 && (
                            <p className="text-gray-500 text-center py-8">
                                該当する問題がありません
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DebugModal;
