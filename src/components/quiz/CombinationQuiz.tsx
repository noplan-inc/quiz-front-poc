import type { CombinationPair, CombinationQuizProps } from "@/types/quiz";
import { useState } from "react";

/**
 * 組み合わせ選択問題コンポーネント
 *
 * 左右のアイテムを組み合わせ、正しい組み合わせを選択する問題です。
 *
 * @param props CombinationQuizProps - 問題の情報や回答処理関数などを含むプロップス
 */
export const CombinationQuiz: React.FC<
    CombinationQuizProps & { imageUrl?: string; imageAlt?: string }
> = ({
    question,
    leftItems,
    rightItems,
    correctCombinations,
    onAnswer,
    imageUrl,
    imageAlt,
}) => {
    // 現在の選択中のアイテム
    const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
    // 現在の組み合わせ
    const [combinations, setCombinations] = useState<CombinationPair[]>([]);
    // 回答済みかどうか
    const [isAnswered, setIsAnswered] = useState(false);

    /**
     * 左側のアイテムをクリックしたときの処理
     * @param itemId 選択されたアイテムのID
     */
    const handleLeftItemClick = (itemId: string) => {
        if (isAnswered) return;

        // 同じアイテムをクリックした場合は選択解除
        if (selectedLeftId === itemId) {
            setSelectedLeftId(null);
            return;
        }

        setSelectedLeftId(itemId);
    };

    /**
     * 左側のアイテムでキーボード操作したときの処理
     */
    const handleLeftItemKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        itemId: string
    ) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleLeftItemClick(itemId);
        }
    };

    /**
     * 右側のアイテムをクリックしたときの処理
     * @param itemId 選択されたアイテムのID
     */
    const handleRightItemClick = (itemId: string) => {
        if (isAnswered || !selectedLeftId) return;

        // 既存の組み合わせから左アイテムの組み合わせを削除
        const filteredCombinations = combinations.filter(
            (combo) => combo.leftId !== selectedLeftId
        );

        // 新しい組み合わせを追加
        const newCombination: CombinationPair = {
            leftId: selectedLeftId,
            rightId: itemId,
        };

        setCombinations([...filteredCombinations, newCombination]);
        setSelectedLeftId(null); // 選択をリセット
    };

    /**
     * 右側のアイテムでキーボード操作したときの処理
     */
    const handleRightItemKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        itemId: string
    ) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRightItemClick(itemId);
        }
    };

    /**
     * 現在の組み合わせ状態からアイテムが既に組み合わされているかを確認
     * @param itemId アイテムID
     * @param isLeft 左側のアイテムかどうか
     * @returns 組み合わされていればtrue、そうでなければfalse
     */
    const isCombined = (itemId: string, isLeft: boolean) => {
        if (isLeft) {
            return combinations.some((combo) => combo.leftId === itemId);
        }

        return combinations.some((combo) => combo.rightId === itemId);
    };

    /**
     * 回答を確認する
     */
    const checkAnswer = () => {
        if (isAnswered) return;

        // すべての左アイテムが組み合わされているか確認
        const allItemsCombined = leftItems.every((item) =>
            isCombined(item.id, true)
        );

        if (!allItemsCombined) {
            alert("すべての項目を組み合わせてください");
            return;
        }

        // 正解かどうかを判定
        correctCombinations.every((correctCombo) => {
            return combinations.some(
                (userCombo) =>
                    userCombo.leftId === correctCombo.leftId &&
                    userCombo.rightId === correctCombo.rightId
            );
        });

        setIsAnswered(true);

        // 回答をコールバックで通知
        onAnswer(
            combinations.map((combo) => `${combo.leftId}-${combo.rightId}`)
        );
    };

    return (
        <div className="w-full" data-testid="combination-quiz">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 border-t-0 rounded-b-lg bg-white overflow-hidden flex flex-col">
                {/* 問題文と画像 */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-indigo-950 mb-4">
                        {question}
                    </h2>

                    {imageUrl && (
                        <div className="mb-6">
                            <img
                                src={imageUrl}
                                alt={imageAlt || "問題の画像"}
                                className="w-full rounded-md shadow-sm"
                            />
                        </div>
                    )}

                    {/* 選択肢 */}
                    <div className="flex justify-between gap-4">
                        {/* 左側の選択肢 */}
                        <div className="w-1/2 space-y-3">
                            {leftItems.map((item) => (
                                <button
                                    key={item.id}
                                    data-testid={`left-${item.id}`}
                                    className={`w-full py-3 px-4 text-center rounded-md font-bold text-white bg-indigo-950 flex items-center transition-colors ${
                                        selectedLeftId === item.id
                                            ? "bg-blue-800"
                                            : ""
                                    } ${
                                        isCombined(item.id, true)
                                            ? "opacity-80"
                                            : "hover:opacity-90"
                                    }`}
                                    onClick={() => handleLeftItemClick(item.id)}
                                    onKeyDown={(e) =>
                                        handleLeftItemKeyDown(e, item.id)
                                    }
                                    aria-pressed={selectedLeftId === item.id}
                                    aria-label={`左側: ${item.text}`}
                                    type="button"
                                    disabled={
                                        isCombined(item.id, true) && !isAnswered
                                    }
                                >
                                    {/* 選択マーク */}
                                    <span
                                        className={`inline-block w-6 h-6 rounded-full border-2 border-white mr-3 flex-shrink-0 ${
                                            isCombined(item.id, true)
                                                ? "bg-white"
                                                : ""
                                        }`}
                                    />

                                    <span className="flex-grow text-left">
                                        {item.text}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* 右側の選択肢 */}
                        <div className="w-1/2 space-y-3">
                            {rightItems.map((item) => (
                                <button
                                    key={item.id}
                                    data-testid={`right-${item.id}`}
                                    className={`w-full py-3 px-4 text-center rounded-md font-bold text-white bg-indigo-950 flex items-center transition-colors ${
                                        isCombined(item.id, false)
                                            ? "opacity-80"
                                            : "hover:opacity-90"
                                    }`}
                                    onClick={() =>
                                        handleRightItemClick(item.id)
                                    }
                                    onKeyDown={(e) =>
                                        handleRightItemKeyDown(e, item.id)
                                    }
                                    aria-label={`右側: ${item.text}`}
                                    type="button"
                                    disabled={
                                        isCombined(item.id, false) &&
                                        !isAnswered
                                    }
                                >
                                    {/* 選択マーク */}
                                    <span
                                        className={`inline-block w-6 h-6 rounded-full border-2 border-white mr-3 flex-shrink-0 ${
                                            isCombined(item.id, false)
                                                ? "bg-white"
                                                : ""
                                        }`}
                                    />

                                    <span className="flex-grow text-left">
                                        {item.text}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {!isAnswered && combinations.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        data-testid="submit-button"
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                        onClick={checkAnswer}
                        disabled={isAnswered}
                    >
                        確認
                    </button>
                </div>
            )}

            {isAnswered && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        つぎへ
                    </button>
                </div>
            )}
        </div>
    );
};
