import { useState } from "react";
import type { MultiAnswerQuizProps } from "@/types/quiz";

export const MultiAnswerQuiz: React.FC<MultiAnswerQuizProps> = ({
    question,
    choices,
    onAnswer,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleChoiceClick = (choiceId: string) => {
        setSelectedIds((prev) => {
            if (prev.includes(choiceId)) {
                return prev.filter((id) => id !== choiceId);
            }
            return [...prev, choiceId];
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent, choiceId: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleChoiceClick(choiceId);
        }
    };

    const handleSubmit = () => {
        if (selectedIds.length > 0) {
            onAnswer(selectedIds);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">{question}</h3>
                <p className="text-sm text-gray-600 mb-4">※複数選択可能です</p>
            </div>

            <div className="space-y-3 mb-6">
                {choices.map((choice) => (
                    <label
                        key={choice.id}
                        className={`p-3 rounded-md border-2 transition-all cursor-pointer block ${
                            selectedIds.includes(choice.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                        }`}
                        data-testid={
                            selectedIds.includes(choice.id)
                                ? "choice-selected"
                                : "choice"
                        }
                    >
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={selectedIds.includes(choice.id)}
                                onChange={() => handleChoiceClick(choice.id)}
                                onKeyDown={(e) => handleKeyDown(e, choice.id)}
                            />
                            <div
                                className={`w-5 h-5 mr-3 border-2 rounded flex items-center justify-center ${
                                    selectedIds.includes(choice.id)
                                        ? "border-blue-500 bg-blue-500"
                                        : "border-gray-300"
                                }`}
                            >
                                {selectedIds.includes(choice.id) && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                    >
                                        <title>選択済み</title>
                                        <path
                                            fillRule="evenodd"
                                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span>{choice.text}</span>
                        </div>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={selectedIds.length === 0}
                type="button"
                className={`px-4 py-2 rounded-md ${
                    selectedIds.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
                回答する
            </button>
        </div>
    );
};
