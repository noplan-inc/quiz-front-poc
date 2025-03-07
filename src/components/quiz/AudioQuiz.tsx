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
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 border-t-0 rounded-b-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文と音声、選択肢 */}
                <div className="p-6">
                    <h3
                        className="text-xl font-bold mb-4 text-indigo-950"
                        data-testid="question-text"
                    >
                        {question}
                    </h3>

                    <div className="mb-4">
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

export default AudioQuiz;
