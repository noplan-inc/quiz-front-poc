import { Choice } from "@/types/quiz";

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
        <div className="space-y-4 mt-4">
            {choices.map((choice) => {
                const status = getChoiceStatus(choice);

                let statusClass = "";
                if (status === "correct") {
                    statusClass = "border-green-500 bg-green-100";
                } else if (status === "incorrect") {
                    statusClass = "border-red-500 bg-red-100";
                } else if (choice.id === selectedChoiceId) {
                    statusClass = "border-blue-500 bg-blue-100";
                }

                return (
                    <button
                        key={choice.id}
                        className={`w-full p-4 border-2 rounded-lg text-left ${
                            isAnswered
                                ? "cursor-default"
                                : "hover:bg-gray-100 cursor-pointer"
                        } ${statusClass}`}
                        onClick={() => onSelectChoice(choice.id)}
                        disabled={isAnswered}
                        data-testid={`choice-${choice.id}`}
                        aria-disabled={isAnswered}
                    >
                        {choice.text}
                        {isAnswered && choice.isCorrect && (
                            <span className="ml-2 text-green-600">✓</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ChoiceList;
