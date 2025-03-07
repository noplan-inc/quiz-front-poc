import type { Choice, ImageQuizProps } from "@/types/quiz";
import ChoiceList, { type ChoiceStatus } from "./ChoiceList";

interface ImageQuizComponentProps extends ImageQuizProps {
    selectedChoiceId: string | null;
    isAnswered: boolean;
    getChoiceStatus: (choice: Choice) => ChoiceStatus;
    onSelectChoice: (choiceId: string) => void;
}

const ImageQuiz: React.FC<ImageQuizComponentProps> = ({
    question,
    choices,
    imageUrl,
    imageAlt = "問題の画像",
    selectedChoiceId,
    isAnswered,
    getChoiceStatus,
    onSelectChoice,
}) => {
    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white max-h-[60vh] overflow-hidden flex flex-col">
            <h3
                className="text-xl font-semibold mb-2 max-h-[15vh] overflow-auto"
                data-testid="question-text"
            >
                {question}
            </h3>

            <div className="my-2 flex justify-center flex-shrink-0 max-h-[20vh]">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    data-testid="question-image"
                />
            </div>

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

export default ImageQuiz;
