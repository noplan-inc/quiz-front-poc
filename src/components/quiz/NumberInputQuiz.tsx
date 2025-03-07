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

    // 入力値の変更を処理
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAnswered) return;

        const value = e.target.value;
        // 数字以外の入力を許可しない
        if (/^\d*$/.test(value) && value.length <= maxDigits) {
            setInputValue(value);
        }
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

    // Enterキーでも回答を確定できるようにする
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAnswered && inputValue) {
            checkAnswer();
        }
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

            {/* 入力フォーム */}
            <div className="mb-6">
                <label
                    htmlFor="number-input"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    答えを入力してください:
                </label>
                <div className="flex space-x-2">
                    <input
                        id="number-input"
                        data-testid="number-input"
                        type="number"
                        min="0"
                        max={10 ** maxDigits - 1}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isAnswered}
                        className={`
                            w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                            ${
                                isAnswered
                                    ? isCorrect
                                        ? "border-green-300 focus:ring-green-500"
                                        : "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }
                        `}
                        aria-label="数値を入力"
                        aria-describedby="number-input-description"
                        placeholder={`${maxDigits}桁以内の数字`}
                    />
                    <button
                        type="button"
                        data-testid="submit-button"
                        onClick={checkAnswer}
                        disabled={isAnswered || !inputValue}
                        className={`
                            px-4 py-2 rounded font-medium 
                            ${
                                isAnswered || !inputValue
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                            }
                        `}
                        aria-disabled={isAnswered || !inputValue}
                    >
                        確認
                    </button>
                </div>
                <p
                    id="number-input-description"
                    className="mt-1 text-sm text-gray-600"
                >
                    {maxDigits}桁以内の数字を入力してください
                </p>
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
                        ? "正解です！"
                        : `不正解です。正解は「${correctAnswer}」です。`}
                </div>
            )}
        </div>
    );
};
