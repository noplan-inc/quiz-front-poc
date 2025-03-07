import type { Choice } from "@/types/quiz";

export type ChoiceStatus = "default" | "correct" | "incorrect";

interface ChoiceListProps {
    choices: Choice[];
    selectedChoiceId: string | null;
    isAnswered: boolean;
    getChoiceStatus: (choice: Choice) => ChoiceStatus;
    onSelectChoice: (choiceId: string) => void;
}

const ChoiceList: React.FC<ChoiceListProps> = ({
    choices,
    selectedChoiceId,
    isAnswered,
    getChoiceStatus,
    onSelectChoice,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {choices.map((choice) => {
                const status = getChoiceStatus(choice);

                let statusClass = "";
                if (status === "correct") {
                    statusClass = "bg-green-600 border-green-700 text-white";
                } else if (status === "incorrect") {
                    statusClass = "bg-red-600 border-red-700 text-white";
                } else if (choice.id === selectedChoiceId) {
                    statusClass = "bg-blue-600 border-blue-700 text-white";
                }

                return (
                    <button
                        key={choice.id}
                        className={`w-full py-4 px-6 text-center rounded-md font-bold text-white bg-indigo-950 hover:bg-indigo-900 transition-colors border-4 border-indigo-700 ${
                            isAnswered
                                ? "cursor-default opacity-90"
                                : "cursor-pointer"
                        } ${statusClass}`}
                        onClick={() => onSelectChoice(choice.id)}
                        disabled={isAnswered}
                        data-testid={`choice-${choice.id}`}
                        aria-disabled={isAnswered}
                        type="button"
                    >
                        {choice.text}
                        {isAnswered && choice.isCorrect && (
                            <span className="ml-2">✓</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ChoiceList;
