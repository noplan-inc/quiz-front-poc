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
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 border-t-0 rounded-b-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文と画像、選択肢 */}
                <div className="p-6">
                    <h3
                        className="text-xl font-bold mb-4 text-indigo-950"
                        data-testid="question-text"
                    >
                        {question}
                    </h3>

                    <div className="mb-4 flex justify-center">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="max-w-full h-auto object-contain rounded-md"
                            data-testid="question-image"
                        />
                    </div>

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

export default ImageQuiz;
