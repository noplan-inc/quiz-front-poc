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

    // 全ての選択をリセット（削除ボタン）
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

                    {/* 入力エリア（選択された文字を表示） */}
                    <div className="flex justify-between mb-6">
                        <div
                            className="flex-1 flex items-center bg-gray-200 rounded-md min-h-16 p-2"
                            data-testid="answer-area"
                        >
                            <div className="flex flex-wrap gap-2">
                                {selectedChars.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className="px-2 py-1 text-lg font-medium cursor-pointer hover:bg-gray-300 rounded"
                                        onClick={() =>
                                            !isAnswered && deselectChar(item.id)
                                        }
                                        disabled={isAnswered}
                                        aria-label={`選択した文字「${item.char}」を削除`}
                                    >
                                        {item.char}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 削除ボタン */}
                        <button
                            type="button"
                            onClick={resetSelection}
                            disabled={
                                isAnswered ||
                                availableChars.length === characters.length
                            }
                            className="ml-2 px-4 py-2 rounded-md font-bold bg-indigo-950 text-white h-full"
                        >
                            削除
                        </button>
                    </div>

                    {/* 利用可能な文字（選択肢） */}
                    <div className="grid grid-cols-3 gap-4">
                        {availableChars.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                data-testid={`char-${item.char}`}
                                onClick={() => selectChar(item.id)}
                                disabled={isAnswered}
                                className="py-3 rounded-md font-bold text-xl bg-indigo-950 text-white hover:opacity-90"
                            >
                                {item.char}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 確認ボタン（回答前に表示） */}
            {!isAnswered && selectedChars.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        data-testid="submit-button"
                        onClick={checkAnswer}
                        disabled={
                            selectedChars.length === 0 ||
                            selectedChars.length !== characters.length
                        }
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
