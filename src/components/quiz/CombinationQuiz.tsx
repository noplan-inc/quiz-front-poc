import type { CombinationPair, CombinationQuizProps } from "@/types/quiz";
import { useCallback, useEffect, useRef, useState } from "react";

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
    // 線を描画するためのref
    const leftItemsRef = useRef<{ [key: string]: HTMLButtonElement | null }>(
        {}
    );
    const rightItemsRef = useRef<{ [key: string]: HTMLButtonElement | null }>(
        {}
    );
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // テキストオーバーフローを検出するためのref
    const leftTextRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});
    const rightTextRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});
    // テキスト要素の親コンテナの参照
    const leftContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
        {}
    );
    const rightContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
        {}
    );

    // テキストがオーバーフローしているかどうかを検出するマップ
    const [textOverflow, setTextOverflow] = useState<{
        [key: string]: boolean;
    }>({});

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
     * 特定の左アイテムとペアになっている右アイテムのIDを取得
     */
    const getPairedRightId = (leftId: string) => {
        const combination = combinations.find(
            (combo) => combo.leftId === leftId
        );
        return combination ? combination.rightId : null;
    };

    /**
     * 特定の右アイテムとペアになっている左アイテムのIDを取得
     */
    const getPairedLeftId = (rightId: string) => {
        const combination = combinations.find(
            (combo) => combo.rightId === rightId
        );
        return combination ? combination.leftId : null;
    };

    /**
     * 組み合わせの順番を取得（1始まり）
     */
    const getCombinationIndex = (leftId: string, rightId: string) => {
        const index = combinations.findIndex(
            (combo) =>
                (combo.leftId === leftId && combo.rightId === rightId) ||
                (combo.rightId === rightId && combo.leftId === leftId)
        );
        return index !== -1 ? index + 1 : null;
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

    /**
     * 線を描画するための関数
     */
    const drawLines = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // キャンバスをクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 線のスタイル設定
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#3730a3"; // indigo-950の色に近い

        // 組み合わせごとに線を引く
        for (const combo of combinations) {
            const leftButton = leftItemsRef.current[combo.leftId];
            const rightButton = rightItemsRef.current[combo.rightId];

            if (leftButton && rightButton) {
                const leftRect = leftButton.getBoundingClientRect();
                const rightRect = rightButton.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                // 左右のボタンの中心点を計算
                const leftX = leftRect.right - canvasRect.left;
                const leftY =
                    leftRect.top + leftRect.height / 2 - canvasRect.top;
                const rightX = rightRect.left - canvasRect.left;
                const rightY =
                    rightRect.top + rightRect.height / 2 - canvasRect.top;

                // 線を描画
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
            }
        }
    }, [combinations]);

    // キャンバスのサイズを設定
    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const containerRect = canvas.parentElement?.getBoundingClientRect();
        if (containerRect) {
            canvas.width = containerRect.width;
            canvas.height = containerRect.height;
            drawLines();
        }
    }, [drawLines]);

    // テキストオーバーフローの確認
    const checkTextOverflow = useCallback(() => {
        const newTextOverflow: { [key: string]: boolean } = {};

        // 左側のテキスト
        for (const item of leftItems) {
            const textElement = leftTextRefs.current[item.id];
            const containerElement = leftContainerRefs.current[item.id];
            if (textElement && containerElement) {
                // 実際にDOM要素のサイズを比較して判定
                const isOverflow =
                    textElement.scrollWidth > containerElement.clientWidth;
                newTextOverflow[`left-${item.id}`] = isOverflow;

                // 強制的にアニメーションを適用（デバッグ用）
                // newTextOverflow[`left-${item.id}`] = true;
            }
        }

        // 右側のテキスト
        for (const item of rightItems) {
            const textElement = rightTextRefs.current[item.id];
            const containerElement = rightContainerRefs.current[item.id];
            if (textElement && containerElement) {
                // 実際にDOM要素のサイズを比較して判定
                const isOverflow =
                    textElement.scrollWidth > containerElement.clientWidth;
                newTextOverflow[`right-${item.id}`] = isOverflow;

                // 強制的にアニメーションを適用（デバッグ用）
                // newTextOverflow[`right-${item.id}`] = true;
            }
        }

        setTextOverflow(newTextOverflow);
    }, [leftItems, rightItems]);

    // 組み合わせが変わったら線を再描画
    useEffect(() => {
        updateCanvasSize();
    }, [updateCanvasSize]);

    // ウィンドウサイズが変わったら線を再描画とテキストオーバーフローの確認
    useEffect(() => {
        const handleResize = () => {
            updateCanvasSize();
            checkTextOverflow();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [updateCanvasSize, checkTextOverflow]);

    // 初回マウント時と関連データが変更されたらテキストオーバーフローの確認
    useEffect(() => {
        // 少し遅延させて要素の描画が完了した後にチェック
        const timer = setTimeout(() => {
            checkTextOverflow();
        }, 200);

        return () => clearTimeout(timer);
    }, [checkTextOverflow]); // leftItemsとrightItemsはcheckTextOverflowの依存配列に含まれている

    // 左側アイテムのrefを設定するコールバック
    const setLeftItemRef = useCallback(
        (id: string) => (el: HTMLButtonElement | null) => {
            leftItemsRef.current[id] = el;
        },
        []
    );

    // 右側アイテムのrefを設定するコールバック
    const setRightItemRef = useCallback(
        (id: string) => (el: HTMLButtonElement | null) => {
            rightItemsRef.current[id] = el;
        },
        []
    );

    // 左側テキストのrefを設定するコールバック
    const setLeftTextRef = useCallback(
        (id: string) => (el: HTMLSpanElement | null) => {
            leftTextRefs.current[id] = el;
        },
        []
    );

    // 右側テキストのrefを設定するコールバック
    const setRightTextRef = useCallback(
        (id: string) => (el: HTMLSpanElement | null) => {
            rightTextRefs.current[id] = el;
        },
        []
    );

    // 左側コンテナのrefを設定するコールバック
    const setLeftContainerRef = useCallback(
        (id: string) => (el: HTMLDivElement | null) => {
            leftContainerRefs.current[id] = el;
        },
        []
    );

    // 右側コンテナのrefを設定するコールバック
    const setRightContainerRef = useCallback(
        (id: string) => (el: HTMLDivElement | null) => {
            rightContainerRefs.current[id] = el;
        },
        []
    );

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

                    {/* 選択肢コンテナ */}
                    <div className="relative">
                        {/* 線を描画するキャンバス */}
                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        />

                        {/* 選択肢 - 常に横並びに、中央寄せ */}
                        <div className="flex flex-row justify-center gap-10">
                            {/* 左側の選択肢 */}
                            <div className="w-5/12 space-y-3">
                                {leftItems.map((item) => {
                                    const pairedRightId = getPairedRightId(
                                        item.id
                                    );
                                    const combinationNumber = pairedRightId
                                        ? getCombinationIndex(
                                              item.id,
                                              pairedRightId
                                          )
                                        : null;

                                    return (
                                        <button
                                            key={item.id}
                                            ref={setLeftItemRef(item.id)}
                                            data-testid={`left-${item.id}`}
                                            className={`w-full py-2 pl-3 pr-2 text-center rounded-md font-bold text-white bg-indigo-950 flex items-center transition-colors ${
                                                selectedLeftId === item.id
                                                    ? "bg-blue-800"
                                                    : ""
                                            } ${
                                                isCombined(item.id, true)
                                                    ? "opacity-80"
                                                    : "hover:opacity-90"
                                            } relative z-10`}
                                            onClick={() =>
                                                handleLeftItemClick(item.id)
                                            }
                                            onKeyDown={(e) =>
                                                handleLeftItemKeyDown(
                                                    e,
                                                    item.id
                                                )
                                            }
                                            aria-pressed={
                                                selectedLeftId === item.id
                                            }
                                            aria-label={`左側: ${item.text}`}
                                            type="button"
                                            disabled={
                                                isCombined(item.id, true) &&
                                                !isAnswered
                                            }
                                        >
                                            <div
                                                ref={setLeftContainerRef(
                                                    item.id
                                                )}
                                                className="flex-grow text-left overflow-hidden mr-1"
                                            >
                                                <span
                                                    ref={setLeftTextRef(
                                                        item.id
                                                    )}
                                                    className={`inline-block text-sm md:text-base whitespace-nowrap ${
                                                        textOverflow[
                                                            `left-${item.id}`
                                                        ]
                                                            ? "animate-marquee"
                                                            : ""
                                                    }`}
                                                >
                                                    {item.text}
                                                </span>
                                            </div>

                                            {/* 選択マーク - 右側に配置 */}
                                            <span
                                                className={`inline-block w-5 h-5 rounded-full border-2 border-white flex-shrink-0 flex items-center justify-center ${
                                                    isCombined(item.id, true)
                                                        ? "bg-white text-indigo-950 font-bold"
                                                        : ""
                                                }`}
                                            >
                                                {combinationNumber}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* 右側の選択肢 */}
                            <div className="w-5/12 space-y-3">
                                {rightItems.map((item) => {
                                    const pairedLeftId = getPairedLeftId(
                                        item.id
                                    );
                                    const combinationNumber = pairedLeftId
                                        ? getCombinationIndex(
                                              pairedLeftId,
                                              item.id
                                          )
                                        : null;

                                    return (
                                        <button
                                            key={item.id}
                                            ref={setRightItemRef(item.id)}
                                            data-testid={`right-${item.id}`}
                                            className={`w-full py-2 pl-2 pr-3 text-center rounded-md font-bold text-white bg-indigo-950 flex items-center transition-colors ${
                                                isCombined(item.id, false)
                                                    ? "opacity-80"
                                                    : "hover:opacity-90"
                                            } relative z-10`}
                                            onClick={() =>
                                                handleRightItemClick(item.id)
                                            }
                                            onKeyDown={(e) =>
                                                handleRightItemKeyDown(
                                                    e,
                                                    item.id
                                                )
                                            }
                                            aria-label={`右側: ${item.text}`}
                                            type="button"
                                            disabled={
                                                isCombined(item.id, false) &&
                                                !isAnswered
                                            }
                                        >
                                            {/* 選択マーク - 左側に配置 */}
                                            <span
                                                className={`inline-block w-5 h-5 rounded-full border-2 border-white flex-shrink-0 flex items-center justify-center ${
                                                    isCombined(item.id, false)
                                                        ? "bg-white text-indigo-950 font-bold"
                                                        : ""
                                                }`}
                                            >
                                                {combinationNumber}
                                            </span>

                                            <div
                                                ref={setRightContainerRef(
                                                    item.id
                                                )}
                                                className="flex-grow text-left overflow-hidden ml-1"
                                            >
                                                <span
                                                    ref={setRightTextRef(
                                                        item.id
                                                    )}
                                                    className={`inline-block text-sm md:text-base whitespace-nowrap ${
                                                        textOverflow[
                                                            `right-${item.id}`
                                                        ]
                                                            ? "animate-marquee"
                                                            : ""
                                                    }`}
                                                >
                                                    {item.text}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
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

            {/* マーキーアニメーション用のスタイル */}
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    10% { transform: translateX(0); }
                    40% { transform: translateX(calc(-50%)); }
                    60% { transform: translateX(calc(-50%)); }
                    100% { transform: translateX(0); }
                }
                
                .animate-marquee {
                    animation: marquee 4s ease-in-out infinite;
                    white-space: nowrap;
                    display: inline-block;
                    min-width: 100%;
                    padding-right: 1.5rem;
                }
                `}
            </style>
        </div>
    );
};
