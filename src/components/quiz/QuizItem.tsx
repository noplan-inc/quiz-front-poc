import type { Choice, QuizProps } from "@/types/quiz";
import { useState } from "react";
import AudioQuiz from "./AudioQuiz";
import { CharacterOrderQuiz } from "./CharacterOrderQuiz";
import type { ChoiceStatus } from "./ChoiceList";
import { ImageChoiceQuiz } from "./ImageChoiceQuiz";
import ImageQuiz from "./ImageQuiz";
import { MultiAnswerQuiz } from "./MultiAnswerQuiz";
import { NumberInputQuiz } from "./NumberInputQuiz";
import { OrderSelectionQuiz } from "./OrderSelectionQuiz";
import TextQuiz from "./TextQuiz";
import VideoQuiz from "./VideoQuiz";

/**
 * 問題タイプに応じたコンポーネントを表示するラッパーコンポーネント
 *
 * 【現在サポートされているクイズタイプ】
 * - text: テキストのみの問題
 * - image: 画像付きの問題
 * - video: 動画付きの問題
 * - audio: 音声付きの問題
 * - imageChoice: 選択肢が画像の問題
 * - multiAnswer: 複数回答可能な問題
 * - orderSelection: 順序選択問題
 * - characterOrder: 文字の順序選択問題
 * - numberInput: 数字入力問題
 *
 * 【未実装のクイズタイプ】
 * - combination: 組み合わせ選択問題
 *
 * 注意: 未実装のクイズタイプを使用すると「未対応の問題タイプです」エラーが表示されます。
 * sampleQuizData.ts のデータでは、必ず現在サポートされているタイプのみを使用してください。
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

        case "orderSelection":
            return <OrderSelectionQuiz {...props} />;

        case "characterOrder":
            return <CharacterOrderQuiz {...props} />;

        case "numberInput":
            return <NumberInputQuiz {...props} />;

        // 未実装のクイズタイプ - 今後実装する予定のものをコメントとして残す
        // case "combination":
        //   return <CombinationQuiz {...props} />;

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
