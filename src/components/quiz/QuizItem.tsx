import type { Choice, QuizProps } from "@/types/quiz";
import { useState } from "react";
import AudioQuiz from "./AudioQuiz";
import type { ChoiceStatus } from "./ChoiceList";
import { ImageChoiceQuiz } from "./ImageChoiceQuiz";
import ImageQuiz from "./ImageQuiz";
import { MultiAnswerQuiz } from "./MultiAnswerQuiz";
import TextQuiz from "./TextQuiz";
import VideoQuiz from "./VideoQuiz";

/**
 * 問題タイプに応じたコンポーネントを表示するラッパーコンポーネント
 */
const QuizItem: React.FC<QuizProps> = (props) => {
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

        case "imageChoice":
            return <ImageChoiceQuiz {...props} />;

        case "multiAnswer":
            return <MultiAnswerQuiz {...props} />;

        // 他のクイズタイプが実装されたら、ここに追加
        // case "orderSelection":
        //   return <OrderSelectionQuiz {...props} />;
        // case "characterOrder":
        //   return <CharacterOrderQuiz {...props} />;
        // case "combination":
        //   return <CombinationQuiz {...props} />;
        // case "numberInput":
        //   return <NumberInputQuiz {...props} />;

        default:
            // 未対応の種類の問題
            return (
                <div className="py-4">
                    <p className="text-red-500">
                        未対応の問題タイプです: {props.type}
                    </p>
                </div>
            );
    }
};

export default QuizItem;
