import type { Choice, TextQuizProps } from "@/types/quiz";
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
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 rounded-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文と選択肢 */}
                <div className="p-4">
                    <h3
                        className="text-xl font-bold mb-6 text-indigo-950"
                        data-testid="question-text"
                    >
                        {question}
                    </h3>

                    <div className="mt-4">
                        <ChoiceList
                            choices={choices}
                            selectedChoiceId={selectedChoiceId}
                            isAnswered={isAnswered}
                            getChoiceStatus={getChoiceStatus}
                            onSelectChoice={onSelectChoice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextQuiz;
