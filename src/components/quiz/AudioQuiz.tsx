import type { AudioQuizProps, Choice } from "@/types/quiz";
import ChoiceList, { type ChoiceStatus } from "./ChoiceList";

interface AudioQuizComponentProps extends AudioQuizProps {
    selectedChoiceId: string | null;
    isAnswered: boolean;
    getChoiceStatus: (choice: Choice) => ChoiceStatus;
    onSelectChoice: (choiceId: string) => void;
}

const AudioQuiz: React.FC<AudioQuizComponentProps> = ({
    question,
    choices,
    audioUrl,
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

            <div className="my-2 flex-shrink-0">
                <audio
                    src={audioUrl}
                    controls
                    className="w-full"
                    data-testid="question-audio"
                >
                    <track kind="captions" src="" label="日本語" />
                    音声プレーヤーは現在のブラウザでサポートされていません。
                </audio>
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

export default AudioQuiz;
