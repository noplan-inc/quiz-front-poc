import type { ImageChoiceQuizProps } from "@/types/quiz";
import { useState } from "react";

export const ImageChoiceQuiz: React.FC<ImageChoiceQuizProps> = ({
    question,
    choices,
    onAnswer,
}) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleChoiceClick = (choiceId: string) => {
        setSelectedId(choiceId);
        onAnswer(choiceId);
    };

    const handleKeyDown = (e: React.KeyboardEvent, choiceId: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleChoiceClick(choiceId);
        }
    };

    return (
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 rounded-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文 */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-indigo-950 mb-6">
                        {question}
                    </h3>

                    {/* 選択肢グリッド */}
                    <div className="grid grid-cols-2 gap-4">
                        {choices.map((choice) => (
                            <button
                                key={choice.id}
                                onClick={() => handleChoiceClick(choice.id)}
                                onKeyDown={(e) => handleKeyDown(e, choice.id)}
                                aria-pressed={selectedId === choice.id}
                                className={`p-2 rounded-lg overflow-hidden bg-indigo-950 transition-all ${
                                    selectedId === choice.id
                                        ? "ring-4 ring-blue-500"
                                        : "hover:opacity-90"
                                }`}
                                data-testid={
                                    selectedId === choice.id
                                        ? "image-choice-selected"
                                        : "image-choice"
                                }
                                type="button"
                            >
                                <div className="aspect-square overflow-hidden flex items-center justify-center">
                                    <img
                                        src={choice.imageUrl}
                                        alt={
                                            choice.imageAlt ||
                                            `選択肢 ${choice.id}`
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
