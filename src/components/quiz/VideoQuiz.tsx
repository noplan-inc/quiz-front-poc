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
        <div className="p-6 border rounded-lg shadow-sm">
            <h3
                className="text-xl font-semibold mb-4"
                data-testid="question-text"
            >
                {question}
            </h3>

            <div className="my-4">
                <video
                    src={videoUrl}
                    poster={poster}
                    controls
                    className="max-w-full h-auto rounded-lg mx-auto"
                    data-testid="question-video"
                >
                    <track kind="captions" src="" label="日本語" />
                    動画プレーヤーは現在のブラウザでサポートされていません。
                </video>
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

export default VideoQuiz;
