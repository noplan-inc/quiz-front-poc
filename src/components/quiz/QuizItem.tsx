import { useState } from "react";
import { Choice, QuizProps } from "@/types/quiz";
import TextQuiz from "./TextQuiz";
import ImageQuiz from "./ImageQuiz";
import VideoQuiz from "./VideoQuiz";
import AudioQuiz from "./AudioQuiz";

/**
 * 問題タイプに応じたコンポーネントを表示するラッパーコンポーネント
 */
export const QuizItem: React.FC<QuizProps> = (props) => {
    const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(
        null
    );
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerSelection = (choiceId: string) => {
        if (isAnswered) return;

        setSelectedChoiceId(choiceId);
        setIsAnswered(true);
        props.onAnswer(choiceId);
    };

    // 選択された選択肢が正解かどうかを判定
    const getChoiceStatus = (choice: Choice) => {
        if (!isAnswered) return "default";
        if (choice.isCorrect) return "correct";
        if (choice.id === selectedChoiceId && !choice.isCorrect)
            return "incorrect";
        return "default";
    };

    // 共通のPropsを作成
    const commonProps = {
        ...props,
        selectedChoiceId,
        isAnswered,
        getChoiceStatus,
        onSelectChoice: handleAnswerSelection,
    };

    // 問題タイプに応じたコンポーネントを返す
    switch (props.type) {
        case "text":
            return <TextQuiz {...commonProps} />;
        case "image":
            return <ImageQuiz {...commonProps} />;
        case "video":
            return <VideoQuiz {...commonProps} />;
        case "audio":
            return <AudioQuiz {...commonProps} />;
        default:
            return null;
    }
};
