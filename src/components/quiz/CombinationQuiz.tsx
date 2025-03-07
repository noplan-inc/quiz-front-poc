import type {
    CombinationItem,
    CombinationPair,
    CombinationQuizProps,
} from "@/types/quiz";
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
    // 正解かどうか
    const [isCorrect, setIsCorrect] = useState(false);

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
     * アイテムに対応する組み合わせを取得
     * @param itemId アイテムID
     * @param isLeft 左側のアイテムかどうか
     * @returns 組み合わされたアイテムのID
     */
    const getCombinedItemId = (
        itemId: string,
        isLeft: boolean
    ): string | null => {
        if (isLeft) {
            const combo = combinations.find((combo) => combo.leftId === itemId);
            return combo ? combo.rightId : null;
        }

        const combo = combinations.find((combo) => combo.rightId === itemId);
        return combo ? combo.leftId : null;
    };

    /**
     * 現在の組み合わせから、アイテムの組み合わせが正解かどうかを確認
     * @param leftId 左アイテムID
     * @param rightId 右アイテムID
     * @returns 正解ならtrue、不正解ならfalse
     */
    const isCombinationCorrect = (leftId: string, rightId: string): boolean => {
        if (!isAnswered) return false;

        return correctCombinations.some(
            (combo) => combo.leftId === leftId && combo.rightId === rightId
        );
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
        const isAllCorrect = correctCombinations.every((correctCombo) => {
            return combinations.some(
                (userCombo) =>
                    userCombo.leftId === correctCombo.leftId &&
                    userCombo.rightId === correctCombo.rightId
            );
        });

        setIsCorrect(isAllCorrect);
        setIsAnswered(true);

        // 回答をコールバックで通知
        onAnswer(
            combinations.map((combo) => `${combo.leftId}-${combo.rightId}`)
        );
    };

    /**
     * アイテムのスタイルを取得
     * @param itemId アイテムID
     * @param isLeft 左側のアイテムかどうか
     * @returns スタイルのクラス名
     */
    const getItemStyles = (itemId: string, isLeft: boolean): string => {
        let styles = "p-3 border rounded cursor-pointer transition-colors my-2";

        if (isAnswered) {
            const combinedItemId = getCombinedItemId(itemId, isLeft);
            if (combinedItemId) {
                const isCorrect = isCombinationCorrect(
                    isLeft ? itemId : combinedItemId,
                    isLeft ? combinedItemId : itemId
                );
                styles += isCorrect
                    ? " bg-green-100 border-green-500"
                    : " bg-red-100 border-red-500";
            }
        } else {
            if (selectedLeftId === itemId) {
                styles += " bg-blue-200 border-blue-500";
            } else if (isCombined(itemId, isLeft)) {
                styles += " bg-gray-100 border-gray-500";
            } else {
                styles += " hover:bg-gray-50";
            }
        }

        return styles;
    };

    /**
     * 組み合わせ線を表示するための計算
     * @returns SVGパスの配列
     */
    const renderCombinationLines = () => {
        return combinations.map((combo) => {
            const leftElement = document.querySelector(
                `[data-testid="left-${combo.leftId}"]`
            );
            const rightElement = document.querySelector(
                `[data-testid="right-${combo.rightId}"]`
            );

            if (!leftElement || !rightElement) return null;

            const leftRect = leftElement.getBoundingClientRect();
            const rightRect = rightElement.getBoundingClientRect();

            const containerRect = document
                .querySelector(".combination-container")
                ?.getBoundingClientRect();
            if (!containerRect) return null;

            // 相対位置を計算
            const x1 = leftRect.right - containerRect.left;
            const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
            const x2 = rightRect.left - containerRect.left;
            const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

            const isCorrect = isCombinationCorrect(combo.leftId, combo.rightId);
            const color = !isAnswered ? "gray" : isCorrect ? "green" : "red";

            return (
                <line
                    key={`combination-${combo.leftId}-${combo.rightId}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth={2}
                />
            );
        });
    };

    const findLeftItemById = (id: string): CombinationItem | undefined => {
        return leftItems.find((item) => item.id === id);
    };

    const findRightItemById = (id: string): CombinationItem | undefined => {
        return rightItems.find((item) => item.id === id);
    };

    return (
        <div className="combination-quiz p-4" data-testid="combination-quiz">
            <h2 className="text-xl font-bold mb-4">{question}</h2>

            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={imageAlt || "問題の画像"}
                        className="max-w-full rounded shadow-md"
                    />
                </div>
            )}

            <div className="combination-container relative mt-4 flex justify-between">
                <div className="left-items w-5/12">
                    {leftItems.map((item) => (
                        <button
                            key={item.id}
                            data-testid={`left-${item.id}`}
                            className={getItemStyles(item.id, true)}
                            onClick={() => handleLeftItemClick(item.id)}
                            onKeyDown={(e) => handleLeftItemKeyDown(e, item.id)}
                            aria-pressed={selectedLeftId === item.id}
                            aria-label={`左側: ${item.text}`}
                            type="button"
                        >
                            {item.text}
                            {isCombined(item.id, true) && (
                                <span className="ml-2 text-gray-500">
                                    ↔{" "}
                                    {findRightItemById(
                                        getCombinedItemId(item.id, true) || ""
                                    )?.text || ""}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="right-items w-5/12">
                    {rightItems.map((item) => (
                        <button
                            key={item.id}
                            data-testid={`right-${item.id}`}
                            className={getItemStyles(item.id, false)}
                            onClick={() => handleRightItemClick(item.id)}
                            onKeyDown={(e) =>
                                handleRightItemKeyDown(e, item.id)
                            }
                            aria-label={`右側: ${item.text}`}
                            type="button"
                        >
                            {item.text}
                            {isCombined(item.id, false) && (
                                <span className="ml-2 text-gray-500">
                                    {findLeftItemById(
                                        getCombinedItemId(item.id, false) || ""
                                    )?.text || ""}{" "}
                                    ↔
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <svg
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: -1 }}
                    aria-hidden="true"
                    role="presentation"
                >
                    <title>組み合わせ線</title>
                    {renderCombinationLines()}
                </svg>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    data-testid="submit-button"
                    className={`px-4 py-2 rounded ${
                        isAnswered
                            ? isCorrect
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={checkAnswer}
                    disabled={isAnswered}
                >
                    {isAnswered ? (isCorrect ? "正解！" : "不正解") : "確認"}
                </button>

                {isAnswered && (
                    <div
                        className={`mt-4 p-3 rounded ${
                            isCorrect ? "bg-green-100" : "bg-red-100"
                        }`}
                    >
                        <p className="font-bold">
                            {isCorrect ? "正解です！" : "残念、不正解です。"}
                        </p>
                        {!isCorrect && (
                            <div className="mt-2">
                                <p>正解は：</p>
                                <ul className="list-disc pl-5 mt-1">
                                    {correctCombinations.map((combo) => {
                                        const leftItem = findLeftItemById(
                                            combo.leftId
                                        );
                                        const rightItem = findRightItemById(
                                            combo.rightId
                                        );
                                        return (
                                            <li
                                                key={`correct-${combo.leftId}-${combo.rightId}`}
                                            >
                                                {leftItem?.text || ""} ↔{" "}
                                                {rightItem?.text || ""}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
