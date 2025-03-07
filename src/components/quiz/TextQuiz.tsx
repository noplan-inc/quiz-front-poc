import type { TextQuizProps, Choice } from "@/types/quiz";
import ChoiceList, { type ChoiceStatus } from "./ChoiceList";

interface TextQuizComponentProps extends TextQuizProps {
    selectedChoiceId: string | null;
    isAnswered: boolean;
    getChoiceStatus: (choice: Choice) => ChoiceStatus;
    onSelectChoice: (choiceId: string) => void;
}

const TextQuiz: React.FC<TextQuizComponentProps> = ({
    question,
    choices,
    selectedChoiceId,
    isAnswered,
    getChoiceStatus,
    onSelectChoice,
}) => {
    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white max-h-[60vh] overflow-hidden flex flex-col">
            <h3
                className="text-xl font-semibold mb-4 max-h-[20vh] overflow-auto"
                data-testid="question-text"
            >
                {question}
            </h3>

            <div className="flex-grow overflow-auto mt-2">
                <ChoiceList
                    choices={choices}
                    selectedChoiceId={selectedChoiceId}
                    isAnswered={isAnswered}
                    getChoiceStatus={getChoiceStatus}
                    onSelectChoice={onSelectChoice}
                />
            </div>
        </div>
    );
};

export default TextQuiz;
