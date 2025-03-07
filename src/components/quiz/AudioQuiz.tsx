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
        <div className="p-6 border rounded-lg shadow-sm">
            <h3
                className="text-xl font-semibold mb-4"
                data-testid="question-text"
            >
                {question}
            </h3>

            <div className="my-4">
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

            <ChoiceList
                choices={choices}
                selectedChoiceId={selectedChoiceId}
                isAnswered={isAnswered}
                getChoiceStatus={getChoiceStatus}
                onSelectChoice={onSelectChoice}
            />
        </div>
    );
};

export default AudioQuiz;
