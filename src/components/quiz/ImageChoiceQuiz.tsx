import { useState } from "react";
import type { ImageChoiceQuizProps } from "@/types/quiz";

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
        <div className="w-full max-w-2xl mx-auto">
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">{question}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {choices.map((choice) => (
                    <div
                        key={choice.id}
                        onClick={() => handleChoiceClick(choice.id)}
                        onKeyDown={(e) => handleKeyDown(e, choice.id)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={selectedId === choice.id}
                        className={`cursor-pointer p-2 rounded-md border-2 transition-all ${
                            selectedId === choice.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                        }`}
                        data-testid={
                            selectedId === choice.id
                                ? "image-choice-selected"
                                : "image-choice"
                        }
                    >
                        <img
                            src={choice.imageUrl}
                            alt={choice.imageAlt || `選択肢 ${choice.id}`}
                            className="w-full h-auto object-contain max-h-48"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
