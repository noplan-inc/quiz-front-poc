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
        <div className="p-6 border rounded-lg shadow-sm bg-white max-h-[60vh] overflow-hidden flex flex-col">
            <h3
                className="text-xl font-semibold mb-2 max-h-[15vh] overflow-auto"
                data-testid="question-text"
            >
                {question}
            </h3>

            <div className="my-2 flex justify-center flex-shrink-0 max-h-[20vh]">
                <video
                    src={videoUrl}
                    poster={poster}
                    controls
                    className="max-w-full max-h-full object-contain rounded-lg"
                    data-testid="question-video"
                >
                    <track kind="captions" src="" label="日本語" />
                    動画プレーヤーは現在のブラウザでサポートされていません。
                </video>
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

export default VideoQuiz;
