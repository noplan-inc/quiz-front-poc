import type { CharacterOrderQuizProps } from "@/types/quiz";
import { useState } from "react";

/**
 * 文字の順序選択問題を表示するコンポーネント
 * 個別の文字を並べ替えて正しい単語や文を完成させるクイズ
 */
export const CharacterOrderQuiz: React.FC<
    CharacterOrderQuizProps & { imageUrl?: string; imageAlt?: string }
> = ({ question, characters, correctAnswer, onAnswer, imageUrl, imageAlt }) => {
    // 利用可能な文字を管理（各文字にIDを付与）
    const [availableChars, setAvailableChars] = useState<
        Array<{ id: string; char: string }>
    >(() =>
        characters.map((char) => ({
            id: `available-${char}-${Math.random().toString(36).substr(2, 9)}`,
            char,
        }))
    );

    // 選択された文字を順に管理（各文字にユニークなIDを付与）
    const [selectedChars, setSelectedChars] = useState<
        Array<{ id: string; char: string }>
    >([]);

    // 回答済みかどうか
    const [isAnswered, setIsAnswered] = useState(false);

    // 正解かどうか
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // 文字を選択
    const selectChar = (id: string) => {
        if (isAnswered) return;

        // 選択する文字を取得
        const charObj = availableChars.find((item) => item.id === id);
        if (!charObj) return;

        // 選択された文字を追加
        setSelectedChars([...selectedChars, charObj]);

        // 利用可能な文字から削除
        const newAvailableChars = availableChars.filter(
            (item) => item.id !== id
        );
        setAvailableChars(newAvailableChars);
    };

    // 選択した文字を取り消す
    const deselectChar = (id: string) => {
        if (isAnswered) return;

        // 取り消す文字オブジェクトを取得
        const charObj = selectedChars.find((item) => item.id === id);
        if (!charObj) return;

        // 選択された文字から削除
        const newSelectedChars = selectedChars.filter((item) => item.id !== id);
        setSelectedChars(newSelectedChars);

        // 利用可能な文字に戻す
        setAvailableChars([...availableChars, charObj]);
    };

    // リセットボタン
    const resetSelection = () => {
        if (isAnswered) return;

        // 初期状態に戻す
        setAvailableChars(
            characters.map((char) => ({
                id: `available-${char}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                char,
            }))
        );
        setSelectedChars([]);
    };

    // 回答を確認
    const checkAnswer = () => {
        const userAnswer = selectedChars.map((item) => item.char).join("");
        const isAnswerCorrect = userAnswer === correctAnswer;

        setIsCorrect(isAnswerCorrect);
        setIsAnswered(true);

        // 回答を親コンポーネントに通知
        onAnswer(userAnswer);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            {/* 問題文 */}
            <h2 className="text-xl font-bold mb-4">{question}</h2>

            {/* 画像があれば表示 */}
            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={imageAlt || "問題の画像"}
                        className="max-w-full rounded"
                    />
                </div>
            )}

            {/* 現在の選択状態（ユーザーの回答） */}
            <div
                className="mb-6 p-4 border rounded bg-gray-50 min-h-16 flex items-center"
                data-testid="answer-area"
            >
                {selectedChars.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {selectedChars.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => deselectChar(item.id)}
                                disabled={isAnswered}
                                className={`
                                    px-3 py-2 border rounded font-bold text-lg 
                                    ${
                                        isAnswered
                                            ? isCorrect
                                                ? "bg-green-100 border-green-300"
                                                : "bg-red-100 border-red-300"
                                            : "bg-blue-100 border-blue-300 hover:bg-blue-200"
                                    }
                                `}
                            >
                                {item.char}
                            </button>
                        ))}
                    </div>
                ) : (
                    <span className="text-gray-500">
                        ここに文字を並べてください
                    </span>
                )}
            </div>

            {/* 利用可能な文字 */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                    利用可能な文字:
                </h3>
                <div className="flex flex-wrap gap-2">
                    {availableChars.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            data-testid={`char-${item.char}`}
                            onClick={() => selectChar(item.id)}
                            disabled={isAnswered}
                            className="px-4 py-2 border rounded font-bold text-lg bg-white hover:bg-gray-100"
                        >
                            {item.char}
                        </button>
                    ))}
                </div>
            </div>

            {/* 操作ボタン */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={resetSelection}
                    disabled={
                        isAnswered ||
                        availableChars.length === characters.length
                    }
                    className={`
                        px-4 py-2 rounded font-medium 
                        ${
                            isAnswered ||
                            availableChars.length === characters.length
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }
                    `}
                >
                    リセット
                </button>

                <button
                    type="button"
                    data-testid="submit-button"
                    onClick={checkAnswer}
                    disabled={
                        isAnswered ||
                        selectedChars.length === 0 ||
                        selectedChars.length !== characters.length
                    }
                    className={`
                        px-4 py-2 rounded font-medium 
                        ${
                            isAnswered ||
                            selectedChars.length === 0 ||
                            selectedChars.length !== characters.length
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }
                    `}
                >
                    確認
                </button>
            </div>

            {/* 回答後のフィードバック */}
            {isAnswered && (
                <div
                    className={`mt-4 p-3 rounded ${
                        isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {isCorrect
                        ? "正解です！正しく文字を並べることができました。"
                        : `不正解です。正解は「${correctAnswer}」です。`}
                </div>
            )}
        </div>
    );
};
