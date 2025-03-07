import type { NumberInputQuizProps } from "@/types/quiz";
import { useState } from "react";

/**
 * 数字入力問題を表示するコンポーネント
 * ユーザーが数値を入力して回答するクイズタイプ
 */
export const NumberInputQuiz: React.FC<
    NumberInputQuizProps & { imageUrl?: string; imageAlt?: string }
> = ({ question, correctAnswer, maxDigits, onAnswer, imageUrl, imageAlt }) => {
    // 入力された数値
    const [inputValue, setInputValue] = useState<string>("");

    // 回答済みかどうか
    const [isAnswered, setIsAnswered] = useState(false);

    // 正解かどうか
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // 数字をタップして追加
    const handleNumberClick = (num: number) => {
        if (isAnswered) return;

        // 既存の桁数制限を超えないように確認
        if (inputValue.length < maxDigits) {
            setInputValue((prev) => prev + num.toString());
        }
    };

    // 最後の数字を削除
    const handleBackspace = () => {
        if (isAnswered) return;
        setInputValue((prev) => prev.slice(0, -1));
    };

    // 回答を確認
    const checkAnswer = () => {
        if (!inputValue || isAnswered) return;

        const userAnswer = Number.parseInt(inputValue, 10);
        const isAnswerCorrect = userAnswer === correctAnswer;

        setIsCorrect(isAnswerCorrect);
        setIsAnswered(true);

        // 回答を親コンポーネントに通知
        onAnswer(inputValue);
    };

    return (
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 border-t-0 rounded-b-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文と画像 */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-indigo-950 mb-4">
                        {question}
                    </h2>

                    {/* 画像があれば表示 */}
                    {imageUrl && (
                        <div className="mb-6">
                            <img
                                src={imageUrl}
                                alt={imageAlt || "問題の画像"}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                    )}

                    {/* 入力表示エリア */}
                    <div className="flex justify-between space-x-2 mb-6">
                        <div
                            className="flex-1 bg-gray-100 p-3 rounded-md text-center text-2xl font-bold"
                            data-testid="number-input-display"
                        >
                            {inputValue || "\u00A0"}
                        </div>
                        <button
                            type="button"
                            onClick={handleBackspace}
                            disabled={isAnswered || !inputValue.length}
                            className="px-4 py-2 rounded-md bg-indigo-950 text-white font-bold disabled:opacity-50"
                        >
                            削除
                        </button>
                    </div>

                    {/* 数字キーパッド */}
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => handleNumberClick(num)}
                                disabled={
                                    isAnswered || inputValue.length >= maxDigits
                                }
                                className={`
                                    py-4 text-xl font-bold rounded-md bg-indigo-950 text-white
                                    ${num === 0 ? "col-span-3" : ""}
                                    ${
                                        isAnswered ||
                                        inputValue.length >= maxDigits
                                            ? "opacity-50"
                                            : "hover:opacity-90"
                                    }
                                `}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 確認ボタン（回答前に表示） */}
            {!isAnswered && inputValue && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        data-testid="submit-button"
                        onClick={checkAnswer}
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        確認
                    </button>
                </div>
            )}

            {/* 回答結果のフィードバック */}
            {isAnswered && (
                <div className="mt-4 p-3 rounded bg-gray-100">
                    {isCorrect
                        ? "正解です！"
                        : `不正解です。正解は「${correctAnswer}」です。`}
                </div>
            )}
        </div>
    );
};
