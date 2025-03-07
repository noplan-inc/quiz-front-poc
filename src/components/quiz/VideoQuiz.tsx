import type { Choice, VideoQuizProps } from "@/types/quiz";
import ChoiceList, { type ChoiceStatus } from "./ChoiceList";

interface VideoQuizComponentProps extends VideoQuizProps {
    selectedChoiceId: string | null;
    isAnswered: boolean;
    getChoiceStatus: (choice: Choice) => ChoiceStatus;
    onSelectChoice: (choiceId: string) => void;
}

const VideoQuiz: React.FC<VideoQuizComponentProps> = ({
    question,
    choices,
    videoUrl,
    poster,
    selectedChoiceId,
    isAnswered,
    getChoiceStatus,
    onSelectChoice,
}) => {
    return (
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 border-t-0 rounded-b-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文と動画、選択肢 */}
                <div className="p-6">
                    <h3
                        className="text-xl font-bold mb-4 text-indigo-950"
                        data-testid="question-text"
                    >
                        {question}
                    </h3>

                    <div className="mb-4 flex justify-center">
                        <video
                            src={videoUrl}
                            poster={poster}
                            controls
                            className="max-w-full h-auto object-contain rounded-md"
                            data-testid="question-video"
                        >
                            <track kind="captions" src="" label="日本語" />
                            動画プレーヤーは現在のブラウザでサポートされていません。
                        </video>
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

export default VideoQuiz;
