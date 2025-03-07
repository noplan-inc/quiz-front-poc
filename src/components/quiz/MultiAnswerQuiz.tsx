import type { MultiAnswerQuizProps } from "@/types/quiz";
import { useState } from "react";

/**
 * 複数選択クイズコンポーネント
 * 複数の選択肢から正解をすべて選ぶ問題
 */
export const MultiAnswerQuiz: React.FC<
    MultiAnswerQuizProps & { imageUrl?: string; imageAlt?: string }
> = ({ question, choices, onAnswer, imageUrl, imageAlt }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isAnswered, setIsAnswered] = useState(false);

    // 選択肢の選択・解除
    const handleChoiceClick = (choiceId: string) => {
        if (isAnswered) return;

        setSelectedIds((prev) => {
            if (prev.includes(choiceId)) {
                return prev.filter((id) => id !== choiceId);
            }
            return [...prev, choiceId];
        });
    };

    // キーボード操作対応
    const handleKeyDown = (e: React.KeyboardEvent, choiceId: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleChoiceClick(choiceId);
        }
    };

    // 回答を確定
    const handleSubmit = () => {
        if (selectedIds.length > 0) {
            setIsAnswered(true);
            onAnswer(selectedIds);
        }
    };

    return (
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 rounded-lg bg-white overflow-hidden flex flex-col">
                {/* ヘッダー部分 */}
                <div className="bg-red-600 p-3 text-white text-center font-bold">
                    第8問
                </div>

                {/* 問題文と画像 */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-indigo-950 mb-4">
                        {question}
                    </h2>

                    {/* 画像があれば表示 */}
                    {imageUrl && (
                        <div className="mb-6">
                            <img
                                src={imageUrl}
                                alt={imageAlt || "問題の画像"}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                    )}

                    {/* 選択肢 */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {choices.map((choice) => (
                            <div key={choice.id} className="flex">
                                <label
                                    className="flex items-center w-full p-3 rounded-md bg-indigo-950 text-white cursor-pointer"
                                    data-testid={
                                        selectedIds.includes(choice.id)
                                            ? "choice-selected"
                                            : "choice"
                                    }
                                >
                                    <div className="flex items-center w-full">
                                        <div className="mr-2 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-white rounded">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4"
                                                checked={selectedIds.includes(
                                                    choice.id
                                                )}
                                                onChange={() =>
                                                    handleChoiceClick(choice.id)
                                                }
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e, choice.id)
                                                }
                                            />
                                        </div>
                                        <span className="flex-1 text-center font-bold">
                                            {choice.text}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 「つぎへ」ボタン（回答後に表示） */}
            {isAnswered && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        つぎへ
                    </button>
                </div>
            )}

            {/* 確認ボタン（回答前に表示） */}
            {!isAnswered && selectedIds.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedIds.length === 0}
                        type="button"
                        data-testid="submit-button"
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        確認
                    </button>
                </div>
            )}
        </div>
    );
};
