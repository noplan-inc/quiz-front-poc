import type { Choice, QuizProps } from "@/types/quiz";
import { useState } from "react";
import AudioQuiz from "./AudioQuiz";
import type { ChoiceStatus } from "./ChoiceList";
import ImageQuiz from "./ImageQuiz";
import TextQuiz from "./TextQuiz";
import VideoQuiz from "./VideoQuiz";

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
    const getChoiceStatus = (choice: Choice): ChoiceStatus => {
        if (!isAnswered) return "default";
        if (choice.isCorrect) return "correct";
        if (choice.id === selectedChoiceId && !choice.isCorrect)
            return "incorrect";
        return "default";
    };

    // 共通のPropsを作成（onSelectChoiceとgetChoiceStatusはすべてのコンポーネントで共有）
    const commonProps = {
        selectedChoiceId,
        isAnswered,
        getChoiceStatus,
        onSelectChoice: handleAnswerSelection,
    };

    // 問題タイプに応じたコンポーネントを返す
    switch (props.type) {
        case "text":
            return <TextQuiz {...props} {...commonProps} />;
        case "image":
            return <ImageQuiz {...props} {...commonProps} />;
        case "video":
            return <VideoQuiz {...props} {...commonProps} />;
        case "audio":
            return <AudioQuiz {...props} {...commonProps} />;
        default:
            return null;
    }
};
